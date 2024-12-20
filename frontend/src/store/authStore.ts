import { LoginInputs, RegisterInputs } from "@/lib/types";
import { login, register } from "@/api/auth";
import { create } from "zustand";

export interface AuthStore {
  user: unknown;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  login: (loginInputs: LoginInputs) => Promise<void>;
  register: (registerInputs: RegisterInputs) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  login: async (loginInputs: LoginInputs) => {
    set({ isLoading: true, error: null });
    try {
      const response = await login(loginInputs);
      set({
        isAuthenticated: true,
        user: response.id,
        error: null,
        isLoading: false,
      });
    } catch (error: Error | unknown) {
      let errMessage = "Error when trying to login";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      set({ error: errMessage, isLoading: false });
      throw error;
    }
  },
  register: async (registerInputs: RegisterInputs) => {
    set({ isLoading: true, error: null });
    try {
      const response = await register(registerInputs);
      set({
        isAuthenticated: true,
        user: response.id,
        error: null,
        isLoading: false,
      });
    } catch (error: Error | unknown) {
      let errMessage = "Error when trying to register user";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      set({ error: errMessage, isLoading: false });
      throw error;
    }
  },
}));
