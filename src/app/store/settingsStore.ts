// src/app/store/settingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings } from '@/shared/types/bible.types';

interface SettingsState extends UserSettings {
  // Actions
  setTheme: (theme: UserSettings['theme']) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setLineHeight: (height: number) => void;
  setDefaultVersion: (version: string) => void;
  updateNotifications: (notifications: Partial<UserSettings['notifications']>) => void;
  updateReadingSettings: (settings: Partial<UserSettings['reading']>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'auto',
  fontSize: 16,
  fontFamily: 'System',
  lineHeight: 1.8,
  defaultVersion: 'RVR1960',
  notifications: {
    enabled: true,
    dailyReminder: true,
    reminderTime: '08:00',
  },
  reading: {
    keepScreenOn: true,
    autoScroll: false,
    verseNumbers: true,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),
      
      setFontSize: (fontSize) => set({ fontSize }),
      
      setFontFamily: (fontFamily) => set({ fontFamily }),
      
      setLineHeight: (lineHeight) => set({ lineHeight }),
      
      setDefaultVersion: (defaultVersion) => set({ defaultVersion }),
      
      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      
      updateReadingSettings: (reading) =>
        set((state) => ({
          reading: { ...state.reading, ...reading },
        })),
      
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
