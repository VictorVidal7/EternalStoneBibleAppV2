// src/shared/types/bible.types.ts

export type Testament = 'old' | 'new';

export interface BibleVerse {
  id: string;
  number: number;
  text: string;
  chapterId: string;
}

export interface BibleChapter {
  id: string;
  number: number;
  bookId: string;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  abbr: string;
  testament: Testament;
  order: number;
  chaptersCount: number;
  chapters?: BibleChapter[];
}

export interface BibleVersion {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  description: string;
}

export interface Bookmark {
  id: string;
  verseId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  color: string;
  note?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // días
  startDate: Date;
  currentDay: number;
  completed: boolean;
  readings: ReadingPlanDay[];
}

export interface ReadingPlanDay {
  day: number;
  readings: Reading[];
  completed: boolean;
  completedAt?: Date;
}

export interface Reading {
  bookName: string;
  startChapter: number;
  endChapter?: number;
  startVerse?: number;
  endVerse?: number;
}

export interface SearchResult {
  verse: BibleVerse;
  bookName: string;
  chapter: number;
  verseNumber: number;
  highlight?: {
    start: number;
    end: number;
  };
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  defaultVersion: string;
  notifications: {
    enabled: boolean;
    dailyReminder: boolean;
    reminderTime: string;
  };
  reading: {
    keepScreenOn: boolean;
    autoScroll: boolean;
    verseNumbers: boolean;
  };
}
