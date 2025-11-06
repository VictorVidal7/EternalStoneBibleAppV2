# 🚀 Inicio Rápido - Eternal Stone Bible App

## ⚡ Configuración en 5 Minutos

### Prerequisitos

Asegúrate de tener instalado:
- ✅ Node.js >= 18
- ✅ npm >= 9 o Yarn
- ✅ Xcode (para iOS)
- ✅ Android Studio (para Android)
- ✅ CocoaPods (para iOS): `sudo gem install cocoapods`

### Paso 1: Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/VictorVidal7/EternalStoneBibleApp.git
cd EternalStoneBibleApp

# Instalar dependencias
npm install

# iOS: Instalar pods
cd ios && pod install && cd ..
```

### Paso 2: Ejecutar la App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

### Paso 3: Verificar que Funciona

La app debería abrir mostrando:
- ✅ Pantalla de lectura de la Biblia
- ✅ Génesis 1 o Juan 3 (datos de ejemplo)
- ✅ Navegación fluida entre capítulos

## 🎯 Próximos Pasos

### 1. Obtener la Biblia Completa

Ver [BIBLE_DATA_GUIDE.md](./BIBLE_DATA_GUIDE.md) para instrucciones detalladas.

**Opción rápida:**
```bash
# Descargar RVR1960 completa
curl -o src/assets/bible-data/rvr1960.json \
  https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es-RVR1960.json
```

### 2. Configurar Realm Database

```bash
# Realm ya está en package.json, solo necesitas:
npm install
```

Luego implementa la importación de datos (ver guía en BIBLE_DATA_GUIDE.md)

### 3. Personalizar la App

1. **Colores y Tema**: Edita `src/shared/constants/tokens.ts`
2. **Configuraciones**: Edita `src/app/store/settingsStore.ts`
3. **Features**: Agrega en `src/features/`

## 🐛 Solución de Problemas

### Error: "Module not found"

```bash
# Limpiar cache
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

### Error en iOS: "pod install failed"

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

### Error en Android: Build failed

```bash
cd android
./gradlew clean
cd ..
```

### TypeScript no reconoce aliases

Reinicia el servidor TypeScript en VSCode:
- `Cmd/Ctrl + Shift + P`
- Escribe "TypeScript: Restart TS Server"

## 📱 Probar en Dispositivo Físico

### iOS:
1. Abre `ios/EternalStoneBibleApp.xcworkspace` en Xcode
2. Selecciona tu dispositivo
3. Click en "Run"

### Android:
1. Habilita "Depuración USB" en tu Android
2. Conecta el dispositivo
3. `npm run android`

## 🎨 Personalización Rápida

### Cambiar colores primarios:

```typescript
// src/shared/constants/tokens.ts
export const tokens = {
  colors: {
    primary: {
      500: '#TU_COLOR_AQUI', // Color principal
    },
    // ...
  }
};
```

### Cambiar fuente de lectura:

```typescript
// src/shared/constants/tokens.ts
typography: {
  fonts: {
    reading: 'TU_FUENTE_AQUI', // Fuente para Biblia
  }
}
```

## 📚 Documentación Completa

- [README.md](./README.md) - Visión general del proyecto
- [DOCS.md](./DOCS.md) - Documentación técnica completa
- [BIBLE_DATA_GUIDE.md](./BIBLE_DATA_GUIDE.md) - Guía de datos bíblicos
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía para contribuir

## 💬 ¿Necesitas Ayuda?

- 🐛 Issues: https://github.com/VictorVidal7/EternalStoneBibleApp/issues
- 📧 Email: victor@eternalstone.app
- 🙏 Recuerda: ¡Esto es para la gloria de Dios!

---

**¡Que Dios bendiga tu desarrollo!** 🙏
