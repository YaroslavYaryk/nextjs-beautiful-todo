import {create} from "zustand";

export type Auth = {
  token: string | null;
}

export type Actions = {
  addToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<Auth & Actions>()(set =>({
  token: null,
  addToken: (token: string) => set({
    token: token,
  }),
  removeToken: () => set({
    token: null,
  }),
}))