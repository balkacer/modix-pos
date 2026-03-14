import { ApiProperty } from '@nestjs/swagger';
import { CreatePaymentRequestDto, PaymentMethod } from '@modix/pkgs/contracts';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentDto implements CreatePaymentRequestDto {
  @ApiProperty()
  @IsString()
  orderId!: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentReference?: string;

  @ApiProperty({ example: 300 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty()
  @IsString()
  processedByUserId!: string;
}