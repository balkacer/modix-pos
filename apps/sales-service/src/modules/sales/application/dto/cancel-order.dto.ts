import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CancelOrderRequestDto } from '@modix/pkgs/contracts';

export class CancelOrderDto implements CancelOrderRequestDto {
  @ApiProperty()
  @IsString()
  cancellationReason!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationNote?: string;
}
