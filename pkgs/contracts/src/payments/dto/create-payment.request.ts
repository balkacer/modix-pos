import { PaymentMethod } from '../enums/payment-method.enum';

export interface CreatePaymentRequestDto {
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  amount: number;
  processedByUserId: string;
}
