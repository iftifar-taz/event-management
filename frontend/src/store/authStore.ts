import { LoginInputs, RegisterInputs } from "@/lib/types";
import { login, logout, register } from "@/api/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/models/User";

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (loginInputs: LoginInputs) => Promise<void>;
  register: (registerInputs: RegisterInputs) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: false,

      login: async (loginInputs: LoginInputs) => {
        set({ isLoading: true });
        try {
          const response = await login(loginInputs);
          set({
            isAuthenticated: true,
            user: response,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      register: async (registerInputs: RegisterInputs) => {
        set({ isLoading: true });
        try {
          const response = await register(registerInputs);
          set({
            isAuthenticated: true,
            user: response,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await logout();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
