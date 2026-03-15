import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export interface PaymentResponseDto {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  amount: number;
  status: PaymentStatus;
  processedByUserId: string;
  createdAt: string;
}
