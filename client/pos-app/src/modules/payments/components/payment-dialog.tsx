import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { AppSelect } from '../../../shared/ui/primitives/app-select';
import { useAuthStore } from '../../auth/store/auth.store';
import { updateOrderStatus } from '../../sales/api/update-order-status';
import { markOrderPaid } from '../../sales/api/mark-order-paid';
import { useSalesStore } from '../../sales/store/sales.store';
import { createPayment } from '../api/create-payment';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentDialog({ open, onClose }: PaymentDialogProps) {
  const user = useAuthStore((state) => state.user);
  const activeOrder = useSalesStore((state) => state.activeOrder);
  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [paymentReference, setPaymentReference] = useState('');

  const paymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: async (payment) => {
      if (!activeOrder) {
        return;
      }

      if (payment.status === PaymentStatus.APPROVED) {
        const updatedOrder = await markOrderPaid(activeOrder.id, {
          paymentId: payment.id,
          paymentMethod: payment.paymentMethod,
          paymentReference: payment.paymentReference
        });

        setActiveOrder(updatedOrder);
        onClose();
        return;
      }

      const rejectedOrder = await updateOrderStatus(activeOrder.id, OrderStatus.REJECTED);
      setActiveOrder(rejectedOrder);
      onClose();
    }
  });

  if (!activeOrder || activeOrder.status !== OrderStatus.PENDING_PAYMENT) {
    return null;
  }

  const handlePay = (): void => {
    if (!user) {
      return;
    }

    paymentMutation.mutate({
      orderId: activeOrder.id,
      paymentMethod,
      paymentReference: paymentReference || undefined,
      amount: activeOrder.total,
      processedByUserId: user.id
    });
  };

  return (
    <ConfirmDialog
      open={open}
      title="Process payment"
      description={`Complete payment for order ${activeOrder.orderNumber}`}
      confirmLabel="Process payment"
      cancelLabel="Cancel"
      confirmVariant="primary"
      isLoading={paymentMutation.isPending}
      onConfirm={handlePay}
      onCancel={onClose}
    >
      <div style={{ display: 'grid', gap: tokens.spacing.md }}>
        <div
          style={{
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            background: tokens.colors.surfaceAlt,
            border: `1px solid ${tokens.colors.border}`
          }}
        >
          <strong>Total:</strong> RD$ {activeOrder.total.toFixed(2)}
        </div>

        <AppSelect
          id="paymentMethod"
          label="Payment method"
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
        >
          <option value={PaymentMethod.CASH}>Cash</option>
          <option value={PaymentMethod.CARD}>Card</option>
          <option value={PaymentMethod.TRANSFER}>Transfer</option>
          <option value={PaymentMethod.PLATFORM}>Platform</option>
          <option value={PaymentMethod.OTHER}>Other (fail test)</option>
        </AppSelect>

        <AppInput
          id="paymentReference"
          label="Reference"
          type="text"
          value={paymentReference}
          onChange={(event) => setPaymentReference(event.target.value)}
        />
      </div>
    </ConfirmDialog>
  );
}