import { create } from "zustand";

export interface SessionStore {
  isAuthenticated: boolean;
  isAdmin: boolean;
  checkingAuthentication: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setCheckingAuthentication: (checkingAuthentication: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  checkingAuthentication: false,
  setIsAuthenticated: (isAuthenticated: boolean) =>
    set({ isAuthenticated: isAuthenticated }),
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin: isAdmin }),
  setCheckingAuthentication: (checkingAuthentication: boolean) =>
    set({ checkingAuthentication: checkingAuthentication }),
}));
