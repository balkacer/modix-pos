import { useMemo, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBranchesByBusinessId } from '../api/get-branches-by-business-id';
import { getBusinesses } from '../api/get-businesses';
import { getCashRegistersByBranchId } from '../api/get-cash-registers-by-branch-id';
import { getOpenCashShiftByCashRegisterId } from '../api/get-open-cash-shift-by-cash-register-id';
import { openCashShift } from '../api/open-cash-shift';
import { closeCashShift } from '../api/close-cash-shift';
import { useShiftStore } from '../store/shift.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { usePermission } from '../../auth/hooks/use-permission';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { AppSelect } from '../../../shared/ui/primitives/app-select';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';

export function ShiftOpenForm() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const setActiveShift = useShiftStore((state) => state.setActiveShift);

  const canCloseShift = usePermission('business.shift.close');

  const [businessId, setBusinessId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [cashRegisterId, setCashRegisterId] = useState('');
  const [openingAmount, setOpeningAmount] = useState('5000');
  const [conflictDetected, setConflictDetected] = useState(false);
  const [replaceShiftDialogOpen, setReplaceShiftDialogOpen] = useState(false);

  const businessesQuery = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses
  });

  const branchesQuery = useQuery({
    queryKey: ['branches', businessId],
    queryFn: () => getBranchesByBusinessId(businessId),
    enabled: Boolean(businessId)
  });

  const cashRegistersQuery = useQuery({
    queryKey: ['cash-registers', branchId],
    queryFn: () => getCashRegistersByBranchId(branchId),
    enabled: Boolean(branchId)
  });

  const conflictingShiftQuery = useQuery({
    queryKey: ['open-cash-shift-by-register', cashRegisterId, conflictDetected],
    queryFn: () => getOpenCashShiftByCashRegisterId(cashRegisterId),
    enabled: Boolean(cashRegisterId) && conflictDetected,
    retry: false
  });

  const openShiftMutation = useMutation({
    mutationFn: openCashShift,
    onSuccess: (data) => {
      setConflictDetected(false);
      setActiveShift(data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setConflictDetected(true);
      }
    }
  });

  const closeExistingShiftMutation = useMutation({
    mutationFn: ({
      cashShiftId,
      closingAmount,
      closedByUserId
    }: {
      cashShiftId: string;
      closingAmount: number;
      closedByUserId: string;
    }) =>
      closeCashShift(cashShiftId, {
        closingAmount,
        closedByUserId
      }),
    onSuccess: () => {
      setReplaceShiftDialogOpen(false);
      setConflictDetected(false);

      if (!user || !businessId || !branchId || !cashRegisterId) {
        return;
      }

      openShiftMutation.mutate({
        businessId,
        branchId,
        cashRegisterId,
        openedByUserId: user.id,
        openingAmount: Number(openingAmount)
      });
    }
  });

  const selectedBusiness = useMemo(
    () => businessesQuery.data?.find((item) => item.id === businessId) ?? null,
    [businessesQuery.data, businessId]
  );

  const selectedBranch = useMemo(
    () => branchesQuery.data?.find((item) => item.id === branchId) ?? null,
    [branchesQuery.data, branchId]
  );

  if (activeShift) {
    return (
      <AppCard title="Open Shift" subtitle="A shift is already active for this session">
        <p>
          <strong>Shift:</strong> {activeShift.id}
        </p>
        <p>
          <strong>Cash register:</strong> {activeShift.cashRegisterId}
        </p>
      </AppCard>
    );
  }

  const handleOpenShift = (): void => {
    if (!user || !businessId || !branchId || !cashRegisterId) {
      return;
    }

    setConflictDetected(false);

    openShiftMutation.mutate({
      businessId,
      branchId,
      cashRegisterId,
      openedByUserId: user.id,
      openingAmount: Number(openingAmount)
    });
  };

  const handleCloseExistingAndOpenNew = (): void => {
    if (!user || !conflictingShiftQuery.data) {
      return;
    }

    closeExistingShiftMutation.mutate({
      cashShiftId: conflictingShiftQuery.data.id,
      closingAmount: 0,
      closedByUserId: user.id
    });
  };

  return (
    <>
      <AppCard title="Open Shift" subtitle="Select your operating context before selling">
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
          <AppSelect
            id="businessId"
            label="Business"
            value={businessId}
            onChange={(event) => {
              setBusinessId(event.target.value);
              setBranchId('');
              setCashRegisterId('');
              setConflictDetected(false);
            }}
          >
            <option value="">Select business</option>
            {businessesQuery.data?.map((business) => (
              <option key={business.id} value={business.id}>
                {business.name}
              </option>
            ))}
          </AppSelect>

          <AppSelect
            id="branchId"
            label="Branch"
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);
              setCashRegisterId('');
              setConflictDetected(false);
            }}
            disabled={!businessId}
          >
            <option value="">Select branch</option>
            {branchesQuery.data?.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </AppSelect>

          <AppSelect
            id="cashRegisterId"
            label="Cash register"
            value={cashRegisterId}
            onChange={(event) => {
              setCashRegisterId(event.target.value);
              setConflictDetected(false);
            }}
            disabled={!branchId}
          >
            <option value="">Select cash register</option>
            {cashRegistersQuery.data?.map((cashRegister) => (
              <option key={cashRegister.id} value={cashRegister.id}>
                {cashRegister.name}
              </option>
            ))}
          </AppSelect>

          <AppInput
            id="openingAmount"
            label="Opening amount"
            type="number"
            min="0"
            value={openingAmount}
            onChange={(event) => setOpeningAmount(event.target.value)}
          />

          <AppButton
            type="button"
            onClick={handleOpenShift}
            disabled={
              !user ||
              !businessId ||
              !branchId ||
              !cashRegisterId ||
              openShiftMutation.isPending
            }
          >
            {openShiftMutation.isPending ? 'Opening shift...' : 'Open shift'}
          </AppButton>

          {conflictDetected ? (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                display: 'grid',
                gap: 10
              }}
            >
              <strong>This cash register already has an open shift.</strong>

              {conflictingShiftQuery.data ? (
                <>
                  <div>
                    <div>
                      <strong>Shift:</strong> {conflictingShiftQuery.data.id}
                    </div>
                    <div>
                      <strong>Opened by:</strong>{' '}
                      {conflictingShiftQuery.data.openedByUserId}
                    </div>
                  </div>

                  {canCloseShift ? (
                    <AppButton
                      type="button"
                      variant="danger"
                      onClick={() => setReplaceShiftDialogOpen(true)}
                      disabled={closeExistingShiftMutation.isPending}
                    >
                      {closeExistingShiftMutation.isPending
                        ? 'Closing existing shift...'
                        : 'Close existing shift and open new one'}
                    </AppButton>
                  ) : (
                    <div>
                      You do not have permission to close the existing shift. Please
                      select another register or contact an administrator.
                    </div>
                  )}
                </>
              ) : conflictingShiftQuery.isPending ? (
                <div>Loading current shift details...</div>
              ) : (
                <div>Could not load details for the current open shift.</div>
              )}
            </div>
          ) : null}

          {openShiftMutation.isError && !conflictDetected ? (
            <p style={{ color: 'crimson' }}>Could not open shift.</p>
          ) : null}
        </div>
      </AppCard>
      <ConfirmDialog
        open={replaceShiftDialogOpen}
        title="Replace existing open shift?"
        description="This cash register already has an open shift. Continuing will close the existing shift and open a new one for the current user."
        confirmLabel="Replace shift"
        cancelLabel="Keep current shift"
        confirmVariant="danger"
        isLoading={closeExistingShiftMutation.isPending}
        onConfirm={handleCloseExistingAndOpenNew}
        onCancel={() => setReplaceShiftDialogOpen(false)}
      >
        {conflictingShiftQuery.data ? (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: '#f9fafb',
              border: '1px solid #e5e7eb'
            }}
          >
            <div>
              <strong>Current shift:</strong> {conflictingShiftQuery.data.id}
            </div>
            <div>
              <strong>Opened by user:</strong> {conflictingShiftQuery.data.openedByUserId}
            </div>
            <div>
              <strong>Register:</strong> {conflictingShiftQuery.data.cashRegisterId}
            </div>
          </div>
        ) : null}
      </ConfirmDialog>
    </>
  );
}
