import { create } from 'zustand';
import { UserAuth } from '../types/UserAuth';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserAuth | null;
  setUserAuth: (token: string, user: UserAuth) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  setUserAuth: (token, user) => set({ isAuthenticated: true, token, user }),
  logout: () => set({ isAuthenticated: false, token: null }),
}));