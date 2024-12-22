import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserResponse } from "@/interfaces/user.interfaces";

export interface AuthStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: UserResponse | null) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
