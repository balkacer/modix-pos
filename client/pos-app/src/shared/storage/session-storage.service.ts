import {
  LoginResponseDto,
  CashShiftResponseDto,
  OrderResponseDto
} from '@modix/pkgs/contracts';
import { COOKIE_KEYS } from './cookie.constants';
import { cookieService } from './cookie.service';

export const sessionStorageService = {
  setSession(session: LoginResponseDto): void {
    cookieService.set(COOKIE_KEYS.accessToken, session.accessToken);
    cookieService.set(COOKIE_KEYS.user, session.user);
  },

  getAccessToken(): string | null {
    return cookieService.get<string>(COOKIE_KEYS.accessToken);
  },

  getUser(): LoginResponseDto['user'] | null {
    return cookieService.get<LoginResponseDto['user']>(COOKIE_KEYS.user);
  },

  clearSession(): void {
    cookieService.remove(COOKIE_KEYS.accessToken);
    cookieService.remove(COOKIE_KEYS.user);
  },

  setActiveShift(shift: CashShiftResponseDto): void {
    cookieService.set(COOKIE_KEYS.activeShift, shift);
  },

  getActiveShift(): CashShiftResponseDto | null {
    return cookieService.get<CashShiftResponseDto>(COOKIE_KEYS.activeShift);
  },

  clearActiveShift(): void {
    cookieService.remove(COOKIE_KEYS.activeShift);
  },

  setActiveOrder(order: OrderResponseDto): void {
    cookieService.set(COOKIE_KEYS.activeOrder, order);
  },

  getActiveOrder(): OrderResponseDto | null {
    return cookieService.get<OrderResponseDto>(COOKIE_KEYS.activeOrder);
  },

  clearActiveOrder(): void {
    cookieService.remove(COOKIE_KEYS.activeOrder);
  }
};
