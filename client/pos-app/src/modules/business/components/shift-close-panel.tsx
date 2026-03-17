import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { closeCashShift } from '../api/close-cash-shift';
import { useShiftStore } from '../store/shift.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { useSalesStore } from '../../sales/store/sales.store';
import { usePermission } from '../../auth/hooks/use-permission';
import { AccessDenied } from '../../../shared/ui/feedback/access-denied';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';
import { WorkspaceSection } from '../../../shared/ui/patterns/workspace-section';

export function ShiftClosePanel() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const clearActiveShift = useShiftStore((state) => state.clearActiveShift);

  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);

  const canCloseShift = usePermission('business.shift.close');

  const [closingAmount, setClosingAmount] = useState('');
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);


  const closeShiftMutation = useMutation({
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
      clearActiveOrder();
      clearActiveShift();
      setEditingDraftOrderId(null);
      setClosingAmount('');
      setCloseDialogOpen(false);
    }
  });

  if (!user || !activeShift) {
    return null;
  }

  if (!canCloseShift) {
    return (
      <AccessDenied
        title="Close Shift"
        subtitle="Shift closing is restricted for your current role"
        description="Your user role does not allow closing shifts."
      />
    );
  }

  const confirmCloseShift = (): void => {
    closeShiftMutation.mutate({
      cashShiftId: activeShift.id,
      closingAmount: Number(closingAmount),
      closedByUserId: user.id
    });
  };

  return (
    <>
      <WorkspaceSection
        title="Close Shift"
        subtitle="Close the active register shift when operations are complete"
      />
      <ConfirmDialog
        open={closeDialogOpen}
        title="Close active shift?"
        description="This will close the current register shift for this operator."
        confirmLabel="Close shift"
        cancelLabel="Keep shift open"
        confirmVariant="danger"
        isLoading={closeShiftMutation.isPending}
        onConfirm={confirmCloseShift}
        onCancel={() => setCloseDialogOpen(false)}
      >
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            background: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}
        >
          <div>
            <strong>Shift:</strong> {activeShift.id}
          </div>
          <div>
            <strong>Closing amount:</strong> RD$ {Number(closingAmount || 0).toFixed(2)}
          </div>
        </div>
      </ConfirmDialog>
    </>
  );
}
