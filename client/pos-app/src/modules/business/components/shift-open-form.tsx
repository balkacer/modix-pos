import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBranchesByBusinessId } from '../api/get-branches-by-business-id';
import { getBusinesses } from '../api/get-businesses';
import { getCashRegistersByBranchId } from '../api/get-cash-registers-by-branch-id';
import { openCashShift } from '../api/open-cash-shift';
import { useShiftStore } from '../store/shift.store';
import { useAuthStore } from '../../auth/store/auth.store';

export function ShiftOpenForm() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const setActiveShift = useShiftStore((state) => state.setActiveShift);

  const [businessId, setBusinessId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [cashRegisterId, setCashRegisterId] = useState('');
  const [openingAmount, setOpeningAmount] = useState('5000');

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

  const openShiftMutation = useMutation({
    mutationFn: openCashShift,
    onSuccess: (data) => {
      setActiveShift(data);
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

  const handleOpenShift = (): void => {
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
  };

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Open Shift</h2>

      {activeShift ? (
        <div
          style={{
            padding: 16,
            border: '1px solid #ddd',
            borderRadius: 12,
            background: '#fafafa'
          }}
        >
          <p>
            <strong>Active shift:</strong> {activeShift.id}
          </p>
          <p>
            <strong>Business:</strong> {selectedBusiness?.name ?? activeShift.businessId}
          </p>
          <p>
            <strong>Branch:</strong> {selectedBranch?.name ?? activeShift.branchId}
          </p>
          <p>
            <strong>Cash register:</strong> {activeShift.cashRegisterId}
          </p>
          <p>
            <strong>Opening amount:</strong> {activeShift.openingAmount}
          </p>
          <p style={{ color: 'green' }}>Shift opened successfully</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
          <div>
            <label htmlFor="businessId">Business</label>
            <select
              id="businessId"
              value={businessId}
              onChange={(event) => {
                setBusinessId(event.target.value);
                setBranchId('');
                setCashRegisterId('');
              }}
              style={{ width: '100%', padding: 10 }}
            >
              <option value="">Select business</option>
              {businessesQuery.data?.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="branchId">Branch</label>
            <select
              id="branchId"
              value={branchId}
              onChange={(event) => {
                setBranchId(event.target.value);
                setCashRegisterId('');
              }}
              style={{ width: '100%', padding: 10 }}
              disabled={!businessId}
            >
              <option value="">Select branch</option>
              {branchesQuery.data?.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cashRegisterId">Cash Register</label>
            <select
              id="cashRegisterId"
              value={cashRegisterId}
              onChange={(event) => setCashRegisterId(event.target.value)}
              style={{ width: '100%', padding: 10 }}
              disabled={!branchId}
            >
              <option value="">Select cash register</option>
              {cashRegistersQuery.data?.map((cashRegister) => (
                <option key={cashRegister.id} value={cashRegister.id}>
                  {cashRegister.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="openingAmount">Opening Amount</label>
            <input
              id="openingAmount"
              type="number"
              min="0"
              value={openingAmount}
              onChange={(event) => setOpeningAmount(event.target.value)}
              style={{ width: '100%', padding: 10 }}
            />
          </div>

          <button
            onClick={handleOpenShift}
            disabled={
              !user ||
              !businessId ||
              !branchId ||
              !cashRegisterId ||
              openShiftMutation.isPending
            }
            style={{ padding: 10 }}
          >
            {openShiftMutation.isPending ? 'Opening shift...' : 'Open shift'}
          </button>

          {openShiftMutation.isError ? (
            <p style={{ color: 'crimson' }}>Could not open shift.</p>
          ) : null}
        </div>
      )}
    </section>
  );
}