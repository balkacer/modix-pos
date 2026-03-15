import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { OpenCashShiftRequestDto } from '@modix/pkgs/contracts';

export class OpenCashShiftDto implements OpenCashShiftRequestDto {
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
  openedByUserId!: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0)
  openingAmount!: number;
}
