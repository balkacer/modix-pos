import { Module } from '@nestjs/common';
import { CloseCashShiftUseCase } from './application/use-cases/close-cash-shift.use-case';
import { GetBranchesByBusinessUseCase } from './application/use-cases/get-branches-by-business.use-case';
import { GetBusinessesUseCase } from './application/use-cases/get-businesses.use-case';
import { GetCashRegistersByBranchUseCase } from './application/use-cases/get-cash-registers-by-branch.use-case';
import { GetOpenCashShiftsUseCase } from './application/use-cases/get-open-cash-shifts.use-case';
import { OpenCashShiftUseCase } from './application/use-cases/open-cash-shift.use-case';
import { BusinessController } from './infrastructure/controllers/business.controller';
import { MockBusinessRepository } from './infrastructure/repositories/mock-business.repository';

@Module({
  controllers: [BusinessController],
  providers: [
    MockBusinessRepository,
    GetBusinessesUseCase,
    GetBranchesByBusinessUseCase,
    GetCashRegistersByBranchUseCase,
    GetOpenCashShiftsUseCase,
    OpenCashShiftUseCase,
    CloseCashShiftUseCase
  ]
})
export class BusinessModule {}