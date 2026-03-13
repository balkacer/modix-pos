export enum OrderStatus {
  DRAFT = 'draft',
  PENDING_PAYMENT = 'pending_payment',
  PAID = 'paid',
  REJECTED = 'rejected',
  PACKING = 'packing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  TRANSFER = 'transfer',
  PLATFORM = 'platform',
  OTHER = 'other'
}