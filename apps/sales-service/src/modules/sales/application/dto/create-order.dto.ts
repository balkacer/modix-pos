import { ApiProperty } from '@nestjs/swagger';
import {
  CreateOrderRequestDto,
  CreateOrderRequestItemDto,
  ConsumptionType,
  OrderSource
} from '@modix/pkgs/contracts';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto implements CreateOrderRequestItemDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty()
  @IsString()
  productCodeSnapshot!: string;

  @ApiProperty()
  @IsString()
  productNameSnapshot!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  unitPriceSnapshot!: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  subtotal!: number;
}

export class CreateOrderDto implements CreateOrderRequestDto {
  @ApiProperty()
  @IsString()
  businessId!: string;

  @ApiProperty()
  @IsString()
  branchId!: string;

  @ApiProperty()
  @IsString()
  cashRegisterId!: string;

  @ApiProperty()
  @IsString()
  cashShiftId!: string;

  @ApiProperty()
  @IsString()
  createdByUserId!: string;

  @ApiProperty({ enum: ConsumptionType })
  @IsEnum(ConsumptionType)
  consumptionType!: ConsumptionType;

  @ApiProperty({ enum: OrderSource })
  @IsEnum(OrderSource)
  source!: OrderSource;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  externalReference?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
