import { ApiProperty } from '@nestjs/swagger';
import { MarkOrderPaidRequestDto, PaymentMethod } from '@modix/pkgs/contracts';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class MarkOrderPaidDto implements MarkOrderPaidRequestDto {
  @ApiProperty()
  @IsString()
  paymentId!: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentReference?: string;
}
