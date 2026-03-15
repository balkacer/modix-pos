import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  BranchResponseDto,
  BusinessResponseDto,
  CashRegisterResponseDto,
  CashShiftResponseDto,
  CloseCashShiftRequestDto,
  OpenCashShiftRequestDto
} from '@modix/pkgs/contracts';
import { appConfig } from '../../config/app.config';
import { mapAxiosErrorToHttpException } from '../../shared/http/http-exception.mapper';
import { HttpService } from '../../shared/http/http.service';

@Injectable()
export class BusinessService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async getBusinesses(): Promise<BusinessResponseDto[]> {
    try {
      const response = await this.httpService.get<BusinessResponseDto[]>(
        `${this.config.services.businessServiceBaseUrl}/businesses`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getBranchesByBusinessId(businessId: string): Promise<BranchResponseDto[]> {
    try {
      const response = await this.httpService.get<BranchResponseDto[]>(
        `${this.config.services.businessServiceBaseUrl}/businesses/${businessId}/branches`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getCashRegistersByBranchId(branchId: string): Promise<CashRegisterResponseDto[]> {
    try {
      const response = await this.httpService.get<CashRegisterResponseDto[]>(
        `${this.config.services.businessServiceBaseUrl}/branches/${branchId}/cash-registers`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getOpenCashShifts(): Promise<CashShiftResponseDto[]> {
    try {
      const response = await this.httpService.get<CashShiftResponseDto[]>(
        `${this.config.services.businessServiceBaseUrl}/cash-shifts/open`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async openCashShift(payload: OpenCashShiftRequestDto): Promise<CashShiftResponseDto> {
    try {
      const response = await this.httpService.post<
        CashShiftResponseDto,
        OpenCashShiftRequestDto
      >(`${this.config.services.businessServiceBaseUrl}/cash-shifts/open`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async closeCashShift(
    cashShiftId: string,
    payload: CloseCashShiftRequestDto
  ): Promise<CashShiftResponseDto> {
    try {
      const response = await this.httpService.patch<
        CashShiftResponseDto,
        CloseCashShiftRequestDto
      >(
        `${this.config.services.businessServiceBaseUrl}/cash-shifts/${cashShiftId}/close`,
        payload
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getOpenCashShiftByCashRegisterId(
    cashRegisterId: string
  ): Promise<CashShiftResponseDto> {
    try {
      const response = await this.httpService.get<CashShiftResponseDto>(
        `${this.config.services.businessServiceBaseUrl}/cash-shifts/open/by-cash-register/${cashRegisterId}`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }
}
