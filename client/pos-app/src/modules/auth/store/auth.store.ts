import { create } from 'zustand';
import { LoginResponseDto } from '@modix/pkgs/contracts';
import { sessionStorageService } from '../../../shared/storage/session-storage.service';

interface AuthState {
  accessToken: string | null;
  user: LoginResponseDto['user'] | null;
  setSession: (session: LoginResponseDto) => void;
  hydrateSession: () => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: sessionStorageService.getAccessToken(),
  user: sessionStorageService.getUser(),

  setSession: (session) => {
    sessionStorageService.setSession(session);

    set({
      accessToken: session.accessToken,
      user: session.user
    });
  },

  hydrateSession: () => {
    set({
      accessToken: sessionStorageService.getAccessToken(),
      user: sessionStorageService.getUser()
    });
  },

  clearSession: () => {
    sessionStorageService.clearSession();

    set({
      accessToken: null,
      user: null
    });
  }
}));