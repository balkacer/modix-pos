import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { CloseCashShiftRequestDto } from '@modix/pkgs/contracts';

export class CloseCashShiftDto implements CloseCashShiftRequestDto {
  @ApiProperty()
  @IsString()
  closedByUserId!: string;

  @ApiProperty({ example: 7200 })
  @IsNumber()
  @Min(0)
  closingAmount!: number;
}
