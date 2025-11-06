// src/app/store/bibleStore.ts
import { create } from 'zustand';
import { BibleBook, BibleChapter, BibleVerse, BibleVersion } from '@/shared/types/bible.types';

interface BibleState {
  // State
  currentBook: string | null;
  currentChapter: number;
  currentVersion: string;
  books: BibleBook[];
  versions: BibleVersion[];
  recentlyRead: Array<{ book: string; chapter: number; timestamp: Date }>;

  // Actions
  setCurrentBook: (book: string) => void;
  setCurrentChapter: (chapter: number) => void;
  setCurrentVersion: (version: string) => void;
  setBooks: (books: BibleBook[]) => void;
  setVersions: (versions: BibleVersion[]) => void;
  addToRecentlyRead: (book: string, chapter: number) => void;
  navigateToVerse: (book: string, chapter: number, verse?: number) => void;
}

export const useBibleStore = create<BibleState>((set, get) => ({
  // Initial State
  currentBook: null,
  currentChapter: 1,
  currentVersion: 'RVR1960',
  books: [],
  versions: [],
  recentlyRead: [],

  // Actions
  setCurrentBook: (book) => set({ currentBook: book }),

  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),

  setCurrentVersion: (version) => set({ currentVersion: version }),

  setBooks: (books) => set({ books }),

  setVersions: (versions) => set({ versions }),

  addToRecentlyRead: (book, chapter) => {
    const { recentlyRead } = get();
    const newEntry = { book, chapter, timestamp: new Date() };
    
    // Evitar duplicados recientes
    const filtered = recentlyRead.filter(
      (item) => !(item.book === book && item.chapter === chapter)
    );
    
    // Mantener solo los últimos 10
    const updated = [newEntry, ...filtered].slice(0, 10);
    
    set({ recentlyRead: updated });
  },

  navigateToVerse: (book, chapter, verse) => {
    set({ 
      currentBook: book, 
      currentChapter: chapter 
    });
    get().addToRecentlyRead(book, chapter);
  },
}));
