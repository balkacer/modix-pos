import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
import { PermissionsGuard } from '../authz/guards/permissions.guard';
import { AuthGuard } from '../authz/guards/auth.guard';
import { RequirePermissions } from '../authz/decorators/require-permissions.decorator';

@ApiTags('Business')
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('businesses')
  @RequirePermissions('business.read')
  @ApiOkResponse()
  async getBusinesses(): Promise<BusinessResponseDto[]> {
    return this.businessService.getBusinesses();
  }

  @Get('businesses/:businessId/branches')
  @RequirePermissions('business.read')
  @ApiOkResponse()
  async getBranchesByBusinessId(
    @Param('businessId') businessId: string
  ): Promise<BranchResponseDto[]> {
    return this.businessService.getBranchesByBusinessId(businessId);
  }

  @Get('branches/:branchId/cash-registers')
  @RequirePermissions('business.read')
  @ApiOkResponse()
  async getCashRegistersByBranchId(
    @Param('branchId') branchId: string
  ): Promise<CashRegisterResponseDto[]> {
    return this.businessService.getCashRegistersByBranchId(branchId);
  }

  @Get('cash-shifts/open')
  @RequirePermissions('business.read')
  @ApiOkResponse()
  async getOpenCashShifts(): Promise<CashShiftResponseDto[]> {
    return this.businessService.getOpenCashShifts();
  }

  @Post('cash-shifts/open')
  @RequirePermissions('business.shift.open')
  @ApiOkResponse()
  async openCashShift(@Body() payload: OpenCashShiftDto): Promise<CashShiftResponseDto> {
    return this.businessService.openCashShift(payload);
  }

  @Patch('cash-shifts/:cashShiftId/close')
  @RequirePermissions('business.shift.close')
  @ApiOkResponse()
  async closeCashShift(
    @Param('cashShiftId') cashShiftId: string,
    @Body() payload: CloseCashShiftDto
  ): Promise<CashShiftResponseDto> {
    return this.businessService.closeCashShift(cashShiftId, payload);
  }

  @Get('cash-shifts/open/by-cash-register/:cashRegisterId')
  @RequirePermissions('business.read')
  @ApiOkResponse()
  async getOpenCashShiftByCashRegister(
    @Param('cashRegisterId') cashRegisterId: string
  ): Promise<CashShiftResponseDto> {
    return this.businessService.getOpenCashShiftByCashRegisterId(cashRegisterId);
  }
}
