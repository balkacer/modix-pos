import { ApiProperty } from '@nestjs/swagger';
import { CancelOrderRequestDto } from '@modix/pkgs/contracts';
import { IsOptional, IsString } from 'class-validator';

export class CancelOrderDto implements CancelOrderRequestDto {
  @ApiProperty()
  @IsString()
  cancellationReason!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationNote?: string;
}