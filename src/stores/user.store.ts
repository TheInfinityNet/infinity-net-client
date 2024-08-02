import { create } from "zustand";
import { type User } from "@/lib/api/types/user.type";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-store",
    },
  ),
);
