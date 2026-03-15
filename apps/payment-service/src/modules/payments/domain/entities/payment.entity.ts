import { PaymentMethod, PaymentStatus } from '@modix/pkgs/contracts';

export class PaymentEntity {
  constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly paymentMethod: PaymentMethod,
    public readonly amount: number,
    public readonly processedByUserId: string,
    public readonly status: PaymentStatus,
    public readonly createdAt: string = new Date().toISOString(),
    public readonly paymentReference?: string
  ) {}
}
