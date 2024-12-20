import { SignInInputs, SignUpInputs } from "@/lib/types";
import { signin } from "@/api/auth";
import { create } from "zustand";

export interface AuthStore {
  user: unknown;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  signin: (signInInputs: SignInInputs) => Promise<void>;
  signup: (signUpInputs: SignUpInputs) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signin: async (signInInputs: SignInInputs) => {
    set({ isLoading: true, error: null });
    try {
      const response = await signin(signInInputs);
      set({
        isAuthenticated: true,
        user: response.id,
        error: null,
        isLoading: false,
      });
    } catch (error: Error | unknown) {
      let errMessage = "Error signing in";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      set({ error: errMessage, isLoading: false });
      throw error;
    }
  },
  signup: async (signUpInputs: SignUpInputs) => {
    set({ isLoading: true, error: null });
    try {
      const response = await signup(signUpInputs);
      set({
        isAuthenticated: true,
        user: response.id,
        error: null,
        isLoading: false,
      });
    } catch (error: Error | unknown) {
      let errMessage = "Error signing up";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      set({ error: errMessage, isLoading: false });
      throw error;
    }
  },
}));
