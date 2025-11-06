// src/assets/bible-data/sampleData.ts
// Datos de ejemplo - RVR1960
// Para la Biblia completa, ver BIBLE_DATA_GUIDE.md

import { BibleBook, BibleChapter, BibleVerse } from '@/shared/types/bible.types';

// GÉNESIS 1 - Versículos completos
export const genesis1Verses: BibleVerse[] = [
  {
    id: 'gen-1-1',
    number: 1,
    text: 'En el principio creó Dios los cielos y la tierra.',
    chapterId: 'gen-1',
  },
  {
    id: 'gen-1-2',
    number: 2,
    text: 'Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.',
    chapterId: 'gen-1',
  },
  {
    id: 'gen-1-3',
    number: 3,
    text: 'Y dijo Dios: Sea la luz; y fue la luz.',
    chapterId: 'gen-1',
  },
  {
    id: 'gen-1-4',
    number: 4,
    text: 'Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.',
    chapterId: 'gen-1',
  },
  {
    id: 'gen-1-5',
    number: 5,
    text: 'Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.',
    chapterId: 'gen-1',
  },
  // ... más versículos (en producción tendrías los 31 versículos)
];

// JUAN 3 - Versículos selectos incluyendo Juan 3:16
export const juan3Verses: BibleVerse[] = [
  {
    id: 'jn-3-1',
    number: 1,
    text: 'Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos.',
    chapterId: 'jn-3',
  },
  {
    id: 'jn-3-2',
    number: 2,
    text: 'Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él.',
    chapterId: 'jn-3',
  },
  {
    id: 'jn-3-16',
    number: 16,
    text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
    chapterId: 'jn-3',
  },
  {
    id: 'jn-3-17',
    number: 17,
    text: 'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.',
    chapterId: 'jn-3',
  },
];

// Estructura de libros de la Biblia
export const bibleBooks: BibleBook[] = [
  {
    id: 'gen',
    name: 'Génesis',
    abbr: 'Gn',
    testament: 'old',
    order: 1,
    chaptersCount: 50,
  },
  {
    id: 'exo',
    name: 'Éxodo',
    abbr: 'Ex',
    testament: 'old',
    order: 2,
    chaptersCount: 40,
  },
  // ... más libros (39 del AT)
  {
    id: 'jn',
    name: 'Juan',
    abbr: 'Jn',
    testament: 'new',
    order: 43,
    chaptersCount: 21,
  },
  // ... más libros (27 del NT)
];

// Servicio mock para desarrollo
export const getBibleChapter = async (
  book: string,
  chapter: number
): Promise<BibleVerse[]> => {
  // Simulación de delay de red
  await new Promise(resolve => setTimeout(resolve, 300));

  // Retornar datos de ejemplo basado en el libro y capítulo
  if (book.toLowerCase() === 'génesis' && chapter === 1) {
    return genesis1Verses;
  } else if (book.toLowerCase() === 'juan' && chapter === 3) {
    return juan3Verses;
  }

  // Por defecto, retornar datos de Génesis 1
  return genesis1Verses;
};

export const searchVerses = async (query: string): Promise<BibleVerse[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  // Búsqueda simple en datos de ejemplo
  const allVerses = [...genesis1Verses, ...juan3Verses];
  return allVerses.filter(v =>
    v.text.toLowerCase().includes(query.toLowerCase())
  );
};
