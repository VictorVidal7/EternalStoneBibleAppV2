// src/features/bible-reader/hooks/useBibleReader.ts
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useBibleStore } from '@/app/store/bibleStore';
import { BibleVerse } from '@/shared/types/bible.types';

// Simulación de servicio - reemplazar con tu implementación real
const fetchChapterVerses = async (
  book: string,
  chapter: number
): Promise<BibleVerse[]> => {
  // Aquí conectarías con tu base de datos Realm
  // Por ahora devuelvo datos de ejemplo
  return Promise.resolve([
    {
      id: `${book}-${chapter}-1`,
      number: 1,
      text: 'Verso de ejemplo',
      chapterId: `${book}-${chapter}`,
    },
  ]);
};

export const useBibleReader = (initialBook: string, initialChapter: number) => {
  const queryClient = useQueryClient();
  const { currentBook, currentChapter, setCurrentBook, setCurrentChapter, addToRecentlyRead } =
    useBibleStore();

  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(initialChapter);

  // Query principal con cache automático
  const {
    data: verses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['bible-chapter', book, chapter],
    queryFn: () => fetchChapterVerses(book, chapter),
    staleTime: Infinity, // La Biblia no cambia
    cacheTime: 1000 * 60 * 60 * 24, // 24 horas en caché
  });

  // Precarga de capítulos adyacentes para mejor UX
  useEffect(() => {
    // Precarga el capítulo anterior
    if (chapter > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bible-chapter', book, chapter - 1],
        queryFn: () => fetchChapterVerses(book, chapter - 1),
      });
    }

    // Precarga el siguiente capítulo
    queryClient.prefetchQuery({
      queryKey: ['bible-chapter', book, chapter + 1],
      queryFn: () => fetchChapterVerses(book, chapter + 1),
    });
  }, [book, chapter, queryClient]);

  // Actualizar el store global cuando cambien book/chapter
  useEffect(() => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
    addToRecentlyRead(book, chapter);
  }, [book, chapter, setCurrentBook, setCurrentChapter, addToRecentlyRead]);

  const nextChapter = useCallback(() => {
    // Aquí deberías verificar si hay un siguiente capítulo
    // Por ahora solo incrementamos
    setChapter((prev) => prev + 1);
  }, []);

  const previousChapter = useCallback(() => {
    if (chapter > 1) {
      setChapter((prev) => prev - 1);
    }
  }, [chapter]);

  const goToChapter = useCallback((newChapter: number) => {
    setChapter(newChapter);
  }, []);

  const goToBook = useCallback((newBook: string, newChapter: number = 1) => {
    setBook(newBook);
    setChapter(newChapter);
  }, []);

  return {
    // Data
    verses: verses || [],
    book,
    chapter,
    
    // Loading states
    isLoading,
    error,
    
    // Actions
    nextChapter,
    previousChapter,
    goToChapter,
    goToBook,
    refetch,
  };
};
