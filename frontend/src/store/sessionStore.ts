import { create } from "zustand";

export interface SessionStore {
  isAuthenticated: boolean;
  isAdmin: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set({ isAuthenticated: isAuthenticated }),
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin: isAdmin }),
}));
