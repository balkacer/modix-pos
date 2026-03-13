import { create } from 'zustand';
import { LoginResponseDto } from '@modix/pkgs/contracts';

interface AuthState {
  accessToken: string | null;
  user: LoginResponseDto['user'] | null;
  setSession: (session: LoginResponseDto) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setSession: (session) =>
    set({
      accessToken: session.accessToken,
      user: session.user
    }),
  clearSession: () =>
    set({
      accessToken: null,
      user: null
    })
}));