// src/app/store/AuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    isLoggedIn: boolean;
    isHydrated: boolean;

    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
    setHydrated: (v: boolean) => void;
};

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            // IMPORTANT: start false so app opens Login
            isLoggedIn: false,
            isHydrated: false,

            setHydrated: (v) => set({ isHydrated: v }),

            // demo auth: accept anything non-empty
            login: (email, password) => {
                if (!email?.trim() || !password?.trim()) return;
                set({ isLoggedIn: true });
            },

            signup: (name, email, password) => {
                if (!name?.trim() || !email?.trim() || !password?.trim()) return;
                set({ isLoggedIn: true });
            },

            logout: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'spendwise_auth_v1',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // persist only login state
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
