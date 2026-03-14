import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus, UpdateOrderStatusRequestDto } from '@modix/pkgs/contracts';

export class UpdateOrderStatusDto implements UpdateOrderStatusRequestDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}