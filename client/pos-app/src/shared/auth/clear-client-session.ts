import { sessionStorageService } from '../storage/session-storage.service';

export const clearClientSession = (): void => {
  sessionStorageService.clearActiveOrder();
  sessionStorageService.clearActiveShift();
  sessionStorageService.clearSession();
};
