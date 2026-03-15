import { ApiProperty } from '@nestjs/swagger';
import {
  ConsumptionType,
  UpdateDraftOrderItemDto,
  UpdateDraftOrderRequestDto
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

class UpdateDraftOrderItemPayloadDto implements UpdateDraftOrderItemDto {
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

export class UpdateDraftOrderDto implements UpdateDraftOrderRequestDto {
  @ApiProperty({ enum: ConsumptionType })
  @IsEnum(ConsumptionType)
  consumptionType!: ConsumptionType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [UpdateDraftOrderItemPayloadDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateDraftOrderItemPayloadDto)
  items!: UpdateDraftOrderItemPayloadDto[];
}
