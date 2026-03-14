import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@modix/pkgs/contracts';
import { createPayment } from '../api/create-payment';
import { updateOrderStatus } from '../../sales/api/update-order-status';
import { markOrderPaid } from '../../sales/api/mark-order-paid';
import { useSalesStore } from '../../sales/store/sales.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { AppSelect } from '../../../shared/ui/primitives/app-select';

export function PaymentPanel() {
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
        return;
      }

      const rejectedOrder = await updateOrderStatus(activeOrder.id, OrderStatus.REJECTED);
      setActiveOrder(rejectedOrder);
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
    <AppCard title="Payment" subtitle="Process payment for the active order">
      <div style={{ display: 'grid', gap: 12 }}>
        <p>
          <strong>Order:</strong> {activeOrder.orderNumber}
        </p>
        <p>
          <strong>Total:</strong> RD$ {activeOrder.total.toFixed(2)}
        </p>

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

        <AppButton
          type="button"
          onClick={handlePay}
          disabled={paymentMutation.isPending}
          fullWidth
        >
          {paymentMutation.isPending ? 'Processing payment...' : 'Process payment'}
        </AppButton>

        {paymentMutation.isError ? (
          <p style={{ color: 'crimson' }}>Could not process payment.</p>
        ) : null}
      </div>
    </AppCard>
  );
}