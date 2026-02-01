import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    isLoggedIn: boolean;
    isHydrated: boolean;

    login: () => void;
    logout: () => void;
    setHydrated: (v: boolean) => void;
};

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            isHydrated: false,

            setHydrated: (v) => set({ isHydrated: v }),
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
        }),
        {
            name: 'spendwise_auth_v1',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
