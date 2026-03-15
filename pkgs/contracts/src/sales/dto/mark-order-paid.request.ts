import { PaymentMethod } from '../../payments/enums/payment-method.enum';

export interface MarkOrderPaidRequestDto {
  paymentId: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
}
