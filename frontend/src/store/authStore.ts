import { LoginInputs, RegisterInputs } from "@/lib/types";
import { login, logout, register } from "@/api/auth";
import { create } from "zustand";

export interface AuthStore {
  user: unknown;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (loginInputs: LoginInputs) => Promise<void>;
  register: (registerInputs: RegisterInputs) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
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
}));
