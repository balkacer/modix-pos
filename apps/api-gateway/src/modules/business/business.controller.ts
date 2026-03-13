import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BranchResponseDto,
  BusinessResponseDto,
  CashRegisterResponseDto,
  CashShiftResponseDto
} from '@modix/pkgs/contracts';
import { CloseCashShiftDto } from './dto/close-cash-shift.dto';
import { OpenCashShiftDto } from './dto/open-cash-shift.dto';
import { BusinessService } from './business.service';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('businesses')
  @ApiOkResponse()
  async getBusinesses(): Promise<BusinessResponseDto[]> {
    return this.businessService.getBusinesses();
  }

  @Get('businesses/:businessId/branches')
  @ApiOkResponse()
  async getBranchesByBusinessId(
    @Param('businessId') businessId: string
  ): Promise<BranchResponseDto[]> {
    return this.businessService.getBranchesByBusinessId(businessId);
  }

  @Get('branches/:branchId/cash-registers')
  @ApiOkResponse()
  async getCashRegistersByBranchId(
    @Param('branchId') branchId: string
  ): Promise<CashRegisterResponseDto[]> {
    return this.businessService.getCashRegistersByBranchId(branchId);
  }

  @Get('cash-shifts/open')
  @ApiOkResponse()
  async getOpenCashShifts(): Promise<CashShiftResponseDto[]> {
    return this.businessService.getOpenCashShifts();
  }

  @Post('cash-shifts/open')
  @ApiOkResponse()
  async openCashShift(@Body() payload: OpenCashShiftDto): Promise<CashShiftResponseDto> {
    return this.businessService.openCashShift(payload);
  }

  @Patch('cash-shifts/:cashShiftId/close')
  @ApiOkResponse()
  async closeCashShift(
    @Param('cashShiftId') cashShiftId: string,
    @Body() payload: CloseCashShiftDto
  ): Promise<CashShiftResponseDto> {
    return this.businessService.closeCashShift(cashShiftId, payload);
  }
}