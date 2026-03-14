import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePaymentRequestDto,
  PaymentMethod,
  PaymentResponseDto,
  PaymentStatus
} from '@modix/pkgs/contracts';

@Injectable()
export class MockPaymentsRepository {
  private readonly payments: PaymentResponseDto[] = [];

  getPayments(): PaymentResponseDto[] {
    return this.payments;
  }

  getPaymentById(paymentId: string): PaymentResponseDto {
    const payment = this.payments.find((item) => item.id === paymentId);

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  getPaymentsByOrderId(orderId: string): PaymentResponseDto[] {
    return this.payments.filter((payment) => payment.orderId === orderId);
  }

  createPayment(payload: CreatePaymentRequestDto): PaymentResponseDto {
    const status =
      payload.paymentMethod === PaymentMethod.OTHER
        ? PaymentStatus.FAILED
        : PaymentStatus.APPROVED;

    const payment: PaymentResponseDto = {
      id: `pay_${String(this.payments.length + 1).padStart(3, '0')}`,
      orderId: payload.orderId,
      paymentMethod: payload.paymentMethod,
      paymentReference: payload.paymentReference,
      amount: payload.amount,
      status,
      processedByUserId: payload.processedByUserId,
      createdAt: new Date().toISOString()
    };

    this.payments.push(payment);

    return payment;
  }
}