# 🤝 Guía de Contribución

## ¡Gracias por tu interés en contribuir!

Este proyecto es para la gloria de Dios, y toda ayuda es bienvenida.

## 🙏 Código de Conducta

- Trata a todos con respeto y amor cristiano
- Mantén las discusiones constructivas
- Recuerda que trabajamos para servir a Dios

## 🚀 Cómo Contribuir

### 1. Fork el Repositorio

```bash
# Click en "Fork" en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/EternalStoneBibleApp.git
```

### 2. Crea una Rama

```bash
git checkout -b feature/nombre-del-feature
# o
git checkout -b fix/descripcion-del-bug
```

### 3. Haz tus Cambios

- Sigue las convenciones de código del proyecto
- Escribe tests si es posible
- Actualiza la documentación si es necesario

### 4. Commit con Mensaje Descriptivo

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add verse sharing feature"

# Fixes
git commit -m "fix: correct search results ordering"

# Docs
git commit -m "docs: update installation guide"

# Refactor
git commit -m "refactor: optimize bible reader component"
```

### 5. Push y Crear Pull Request

```bash
git push origin feature/nombre-del-feature
```

Luego ve a GitHub y crea un Pull Request.

## 📋 Áreas donde Puedes Ayudar

### 🐛 Reportar Bugs

Usa el [template de issues](https://github.com/VictorVidal7/EternalStoneBibleApp/issues/new) e incluye:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si es posible
- Versión de la app y dispositivo

### ✨ Sugerir Features

- Describe el feature y su propósito
- Explica cómo beneficia a los usuarios
- Comparte mockups o ejemplos si es posible

### 📖 Mejorar Documentación

- Corregir typos
- Aclarar instrucciones confusas
- Agregar ejemplos
- Traducir a otros idiomas

### 💻 Código

Áreas donde necesitamos ayuda:
- Tests automatizados
- Accesibilidad
- Performance optimization
- Nuevas traducciones de la Biblia
- Features de estudio bíblico

## 🏗️ Estructura del Proyecto

```
src/
├── app/          # Configuración global
├── features/     # Features por funcionalidad
├── shared/       # Componentes compartidos
├── database/     # Capa de datos
└── assets/       # Assets estáticos
```

## 📝 Estándares de Código

### TypeScript

- Usa TypeScript estricto (sin `any`)
- Define tipos para props y funciones
- Documenta funciones complejas

### React

- Componentes funcionales con hooks
- Memoiza componentes pesados con `memo()`
- Usa `useCallback` para callbacks

### Styling

- Usa tokens de diseño (`src/shared/constants/tokens.ts`)
- No uses valores hardcodeados
- Sigue el sistema de diseño

### Testing

- Escribe tests para nuevas features
- Manten cobertura >80%
- Tests deben ser claros y mantenibles

## 🔍 Code Review

Todos los PRs pasan por code review. Esperamos:
- ✅ Código limpio y legible
- ✅ Tests pasando
- ✅ Sin errores de TypeScript
- ✅ Documentación actualizada
- ✅ Commits con mensajes claros

## 📱 Testing

```bash
# Ejecutar tests
npm test

# Con cobertura
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## 🎯 Prioridades Actuales

1. **Alta**: Performance optimization
2. **Alta**: Tests automatizados
3. **Media**: Más traducciones de la Biblia
4. **Media**: Features de estudio (concordancia, diccionario)
5. **Baja**: Temas personalizados adicionales

## 💡 Tips para Contribuidores

- Lee el código existente para entender el patrón
- Pregunta si no estás seguro de algo
- Commits pequeños son mejores que grandes
- Documenta decisiones importantes
- Sé paciente con el proceso de review

## 📞 Contacto

- GitHub Issues: [Link](https://github.com/VictorVidal7/EternalStoneBibleApp/issues)
- Email: victor@eternalstone.app

## 🙏 Agradecimientos

Gracias por contribuir a este proyecto que busca acercar a las personas a la Palabra de Dios.

---

**"Todo lo que hagáis, hacedlo de corazón, como para el Señor"** - Colosenses 3:23
