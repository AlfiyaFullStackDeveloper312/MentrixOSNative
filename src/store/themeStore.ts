import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

//  FIXED STORAGE
const zustandStorage = {
  setItem: (name: string, value: any) => {
    storage.set(name, JSON.stringify(value));
  },

  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? JSON.parse(value) : null;
  },

  removeItem: (name: string) => {
    storage.delete(name);
  },
};

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (value: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDark: false,

      toggleTheme: () =>
        set(state => ({
          isDark: !state.isDark,
        })),

      setTheme: value =>
        set({
          isDark: value,
        }),
    }),
    {
      name: 'theme-storage',
      storage: zustandStorage,
    },
  ),
);
