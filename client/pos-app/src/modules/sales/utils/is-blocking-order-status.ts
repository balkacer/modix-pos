import { OrderStatus } from '@modix/pkgs/contracts';

const BLOCKING_ORDER_STATUSES: OrderStatus[] = [
  OrderStatus.DRAFT,
  OrderStatus.PENDING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.PACKING,
  OrderStatus.READY
];

export const isBlockingOrderStatus = (status: OrderStatus): boolean => {
  return BLOCKING_ORDER_STATUSES.includes(status);
};
