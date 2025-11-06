# 📖 Guía de Datos de la Biblia RVR1960

## 🎯 Estado Actual

La app incluye **datos de ejemplo** para desarrollo:
- ✅ Génesis 1 (completo)
- ✅ Juan 3 (incluyendo 3:16)

## 📥 Obtener la Biblia Completa RVR1960

### Opción 1: Repositorio recomendado (Más fácil)

```bash
# 1. Descargar desde GitHub
curl -o src/assets/bible-data/rvr1960.json \
  https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es-RVR1960.json

# 2. El servicio de Biblia ya está configurado para usarlo
```

### Opción 2: API Bolls.life (Online)

```typescript
// Ya configurado en: src/features/bible-reader/services/bibleApiService.ts

const response = await fetch(
  'https://bolls.life/get-paralel-verses/',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      translations: ['RVR1960'],
      book: bookId,
      chapter: chapterNumber,
      verses: [1, 2, 3, /* ... */]
    })
  }
);
```

### Opción 3: Bible API (Alternativa)

Repositorio: https://github.com/wldeh/bible-api

```bash
# Descargar capítulo por capítulo
curl https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/es-rvr/books/genesis/chapters/1.json
```

## 🗂️ Estructura de Datos Requerida

```typescript
interface BibleVerse {
  id: string;          // Ejemplo: "gen-1-1"
  number: number;      // Número del versículo
  text: string;        // Texto del versículo
  chapterId: string;   // Ejemplo: "gen-1"
}

interface BibleChapter {
  id: string;          // Ejemplo: "gen-1"
  number: number;      // Número del capítulo
  bookId: string;      // Ejemplo: "gen"
  verses: BibleVerse[];
}

interface BibleBook {
  id: string;          // Ejemplo: "gen"
  name: string;        // "Génesis"
  abbr: string;        // "Gn"
  testament: 'old' | 'new';
  order: number;       // Orden en la Biblia
  chaptersCount: number;
}
```

## 🔄 Integración con Realm Database

Una vez que tengas los datos completos:

### 1. Convertir JSON a formato Realm

```typescript
// src/database/services/bibleImportService.ts

import { getRealm } from '../realm/realmConfig';
import bibleData from '@/assets/bible-data/rvr1960.json';

export const importBibleData = async () => {
  const realm = getRealm();
  
  realm.write(() => {
    // Importar libros, capítulos y versículos
    bibleData.forEach(book => {
      realm.create('BibleBook', {
        _id: book.abbrev,
        name: book.name,
        // ... más campos
      });
    });
  });
};
```

### 2. Ejecutar importación (una sola vez)

```typescript
// En App.tsx o en un screen de setup inicial
import { importBibleData } from '@/database/services/bibleImportService';

useEffect(() => {
  const checkAndImportBible = async () => {
    const realm = getRealm();
    const booksCount = realm.objects('BibleBook').length;
    
    if (booksCount === 0) {
      console.log('Importando Biblia...');
      await importBibleData();
      console.log('✅ Biblia importada!');
    }
  };
  
  checkAndImportBible();
}, []);
```

## 📊 Tamaño de Datos

- **Biblia completa RVR1960**: ~4-5 MB (JSON)
- **En Realm Database**: ~6-7 MB
- **Recomendación**: Incluir en el bundle de la app para uso offline

## 🚀 Optimizaciones

### 1. Compresión

```bash
# Comprimir JSON para reducir tamaño
npm install --save-dev json-minify
node scripts/minify-bible.js
```

### 2. Lazy Loading

```typescript
// Cargar solo el libro actual
const loadBook = async (bookId: string) => {
  const bookData = await import(`@/assets/bible-data/books/${bookId}.json`);
  return bookData;
};
```

### 3. Caché Inteligente

```typescript
// Ya implementado con React Query
const { data: verses } = useQuery({
  queryKey: ['bible', book, chapter],
  queryFn: () => getBibleChapter(book, chapter),
  staleTime: Infinity, // La Biblia no cambia
});
```

## ✅ Checklist de Implementación

- [ ] Descargar datos completos de RVR1960
- [ ] Colocar en `src/assets/bible-data/rvr1960.json`
- [ ] Crear servicio de importación a Realm
- [ ] Ejecutar importación inicial
- [ ] Verificar que todos los libros se carguen
- [ ] Probar búsqueda en toda la Biblia
- [ ] Optimizar tamaño si es necesario

## 📚 Recursos Adicionales

- [Repo recomendado](https://github.com/thiagobodruk/bible)
- [Bolls.life API](https://bolls.life/api/)
- [Bible API](https://github.com/wldeh/bible-api)
- [Sociedades Bíblicas Unidas](https://www.unitedbiblesocieties.org/)

## 🙏 Nota Importante

Verifica siempre la licencia de los datos bíblicos que uses. La mayoría de traducciones antiguas (como RVR1960) están en dominio público, pero siempre es bueno confirmar.

---

**¿Preguntas?** Abre un issue en GitHub o revisa la documentación completa.
