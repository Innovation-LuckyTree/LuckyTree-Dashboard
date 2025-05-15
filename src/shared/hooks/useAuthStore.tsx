import { create } from 'zustand';
import { UserAuth } from '../types/UserAuth';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserAuth | null;
  setUserAuth: (token: string, user: UserAuth) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        token: '',
        setUserAuth: (token, user) =>
          set({ user, token, isAuthenticated: true }, false, 'setUserAuth'),
        logout: () =>
          (set({ user: null, token: '', isAuthenticated: false  }, false, 'logout'),
          localStorage.removeItem('auth-storage')),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
      }
    ),
    { name: 'AuthStore' }
  )
);