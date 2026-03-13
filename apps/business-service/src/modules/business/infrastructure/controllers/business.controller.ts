import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BranchResponseDto,
  BusinessResponseDto,
  CashRegisterResponseDto,
  CashShiftResponseDto
} from '@modix/pkgs/contracts';
import { CloseCashShiftDto } from '../../application/dto/close-cash-shift.dto';
import { OpenCashShiftDto } from '../../application/dto/open-cash-shift.dto';
import { CloseCashShiftUseCase } from '../../application/use-cases/close-cash-shift.use-case';
import { GetBranchesByBusinessUseCase } from '../../application/use-cases/get-branches-by-business.use-case';
import { GetBusinessesUseCase } from '../../application/use-cases/get-businesses.use-case';
import { GetCashRegistersByBranchUseCase } from '../../application/use-cases/get-cash-registers-by-branch.use-case';
import { GetOpenCashShiftsUseCase } from '../../application/use-cases/get-open-cash-shifts.use-case';
import { OpenCashShiftUseCase } from '../../application/use-cases/open-cash-shift.use-case';

@ApiTags('Business')
@Controller()
export class BusinessController {
  constructor(
    private readonly getBusinessesUseCase: GetBusinessesUseCase,
    private readonly getBranchesByBusinessUseCase: GetBranchesByBusinessUseCase,
    private readonly getCashRegistersByBranchUseCase: GetCashRegistersByBranchUseCase,
    private readonly getOpenCashShiftsUseCase: GetOpenCashShiftsUseCase,
    private readonly openCashShiftUseCase: OpenCashShiftUseCase,
    private readonly closeCashShiftUseCase: CloseCashShiftUseCase
  ) {}

  @Get('businesses')
  @ApiOkResponse()
  getBusinesses(): BusinessResponseDto[] {
    return this.getBusinessesUseCase.execute();
  }

  @Get('businesses/:businessId/branches')
  @ApiOkResponse()
  getBranchesByBusiness(@Param('businessId') businessId: string): BranchResponseDto[] {
    return this.getBranchesByBusinessUseCase.execute(businessId);
  }

  @Get('branches/:branchId/cash-registers')
  @ApiOkResponse()
  getCashRegistersByBranch(@Param('branchId') branchId: string): CashRegisterResponseDto[] {
    return this.getCashRegistersByBranchUseCase.execute(branchId);
  }

  @Get('cash-shifts/open')
  @ApiOkResponse()
  getOpenCashShifts(): CashShiftResponseDto[] {
    return this.getOpenCashShiftsUseCase.execute();
  }

  @Post('cash-shifts/open')
  @ApiOkResponse()
  openCashShift(@Body() payload: OpenCashShiftDto): CashShiftResponseDto {
    return this.openCashShiftUseCase.execute(payload);
  }

  @Patch('cash-shifts/:cashShiftId/close')
  @ApiOkResponse()
  closeCashShift(
    @Param('cashShiftId') cashShiftId: string,
    @Body() payload: CloseCashShiftDto
  ): CashShiftResponseDto {
    return this.closeCashShiftUseCase.execute(cashShiftId, payload);
  }
}