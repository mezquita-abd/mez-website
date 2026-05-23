# 🕌 Quba — Versión Web (HTML/CSS/JS)

Tu compañero espiritual islámico en formato **web puro** — listo para convertir a APK.

> ⚠️ **Importante:** Esta es la versión web del proyecto Quba. Funciona en cualquier navegador moderno y se puede convertir fácilmente a APK Android / IPA iOS usando varias herramientas (PWA Builder, Capacitor, etc.).

---

## ✨ Funciones implementadas

| Sección | Detalles |
|---|---|
| 🏠 **Inicio** | Saludo dinámico · Próxima oración con cuenta regresiva en vivo · Versículo del día · Du'a del día · Virtud del día · Anillos de progreso |
| 📖 **Corán** | 114 suras (Al-Quran Cloud API) · Búsqueda · Audio de 6 recitadores · Traducciones ES/EN |
| 🕋 **Oración** | Aladhan API · 8 métodos de cálculo · Brújula Qibla con DeviceOrientation API |
| 📅 **Calendario** | Hijri ↔ Gregoriano · Festividades · Días recomendados de ayuno · Virtud del día |
| 👤 **Perfil** | Idioma ES/AR/EN · Tema claro/oscuro/auto · Método de cálculo · Recitador |
| 🎯 **Sabiduría** | Placeholder para Fase 2 (Quiz gamificado) |

---

## 🚀 Cómo usar / probar localmente

### Opción 1: Servidor simple con Python
```bash
cd quba-web
python3 -m http.server 8080
# Abrir en navegador: http://localhost:8080
```

### Opción 2: Servidor con Node.js
```bash
npx serve quba-web
```

### Opción 3: Live Server (VSCode)
Instala la extensión "Live Server" y haz clic derecho en `index.html` → "Open with Live Server".

---

## 📱 Convertir a APK Android

### 🌟 Opción 1: PWA Builder (MÁS FÁCIL — recomendado)

Esta opción es **gratuita y no requiere instalación**.

1. **Sube tu sitio a un servidor HTTPS** (recomendado, gratis):
   - [Netlify Drop](https://app.netlify.com/drop) — arrastra la carpeta `quba-web` y listo
   - [Vercel](https://vercel.com) — `vercel deploy`
   - [GitHub Pages](https://pages.github.com) — sube a repo + activa Pages
   - [Firebase Hosting](https://firebase.google.com/docs/hosting)

2. **Ve a [PWA Builder](https://www.pwabuilder.com/)**:
   - Pega tu URL (ej: `https://quba.netlify.app`)
   - Haz clic en "Start"
   - Espera el análisis (normalmente puntuación 90+)
   - Haz clic en **"Package For Stores" → "Android"**
   - Configura nombre del paquete (ej: `com.quba.app`)
   - Descarga el **`.apk`** o **`.aab`** listo para instalar/publicar

**Tiempo total: ~10 minutos** ✅

---

### 🛠️ Opción 2: Capacitor (más control)

Para quienes quieren integrar plugins nativos (notificaciones push, etc).

```bash
# 1) Inicializar Capacitor
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init Quba com.quba.app --web-dir=.

# 2) Añadir plataforma Android
npx cap add android

# 3) Copiar archivos web a Android
npx cap sync

# 4) Abrir en Android Studio
npx cap open android

# 5) En Android Studio: Build > Generate Signed APK
```

Requisitos:
- Node.js 18+
- [Android Studio](https://developer.android.com/studio)
- JDK 17+

---

### 📦 Opción 3: Median.co (one-click, de pago)

Servicio comercial que toma tu URL y genera APK en minutos:
1. Ve a [median.co](https://median.co)
2. Pega tu URL
3. Configura splash + ícono
4. Descarga APK

---

### 🤖 Opción 4: Bubblewrap (Google oficial)

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://tu-url.com/manifest.json
bubblewrap build
```

---

## 📁 Estructura del proyecto

```
quba-web/
├── index.html              # Punto de entrada SPA
├── manifest.json           # Configuración PWA
├── sw.js                   # Service Worker (offline)
├── README.md
├── APK_GUIDE.md            # Guía completa de conversión a APK
│
├── assets/
│   ├── icon.png            # Ícono 1024×1024 (multipropósito)
│   └── splash.png          # Splash screen
│
├── css/
│   ├── main.css            # Variables, splash, layout
│   ├── components.css      # Card, ProgressRing, etc.
│   └── screens.css         # Estilos por pantalla
│
├── js/
│   ├── i18n.js             # Sistema multi-idioma (ES/AR/EN)
│   ├── config.js           # Constantes globales
│   ├── storage.js          # localStorage con TTL
│   ├── api.js              # Cliente Aladhan + Al-Quran Cloud
│   ├── qibla.js            # Cálculo bearing/distancia
│   ├── duas.js             # 7 du'as curadas
│   ├── hijri.js            # Festividades + virtudes
│   ├── router.js           # SPA router minimalista
│   └── app.js              # Inicialización + tema + toast
│
└── pages/
    ├── home.js             # Hub espiritual
    ├── quran.js            # Lista + detalle suras
    ├── prayer.js           # Tiempos + Qibla
    ├── calendar.js         # Calendario hijri
    ├── wisdom.js           # Placeholder Fase 2
    └── profile.js          # Ajustes
```

---

## 🔌 APIs usadas (todas gratuitas, sin API keys)

| API | Uso |
|---|---|
| [Aladhan API](https://aladhan.com/prayer-times-api) | Tiempos de oración + calendario hijri |
| [Al-Quran Cloud](https://alquran.cloud/api) | 114 suras + 6 recitadores + traducciones |
| [Nominatim (OSM)](https://nominatim.org/) | Reverse geocoding (nombre de ciudad) |
| **DeviceOrientation API** | Brújula Qibla (nativo del navegador) |
| **Geolocation API** | GPS (nativo del navegador) |

---

## 🎨 Paleta visual

- 💚 **Verde esmeralda** `#0F4C3A` — color principal (espiritualidad)
- 🟡 **Dorado suave** `#D4AF37` — acentos
- 🤍 **Beige perla** `#F5F0E6` — fondos claros
- 🌃 **Azul medianoche** `#1A2B4A` — modo oscuro

---

## ⚙️ Funcionalidades técnicas

- ✅ **PWA completa** con manifest + service worker
- ✅ **Offline básico** (caché de archivos estáticos)
- ✅ **Tema claro/oscuro/auto** (respeta `prefers-color-scheme`)
- ✅ **Multi-idioma** con detección automática + RTL para árabe
- ✅ **Soporte iOS** (incluye `webkitCompassHeading` para brújula)
- ✅ **Animaciones suaves** CSS (sin librerías pesadas)
- ✅ **Caché inteligente** con TTL en localStorage
- ✅ **Vibración háptica** al alinear Qibla
- ✅ **Safe-area-insets** para iPhone con notch
- ✅ **Sin dependencias npm** — JavaScript vanilla puro

---

## 📦 Tamaño del proyecto

| Recurso | Tamaño |
|---|---|
| HTML | ~4 KB |
| CSS total | ~28 KB |
| JS total | ~52 KB |
| Iconos | ~2.3 MB |
| **Total** | **~2.4 MB** |

✨ Sin frameworks pesados — carga ultra-rápida.

---

## 🐛 Solución de problemas

| Problema | Solución |
|---|---|
| Brújula no funciona en iOS | Toca el botón "Activar brújula" (iOS requiere permiso explícito) |
| Geolocalización falla | Asegúrate de servir el sitio por **HTTPS** (file:// no funciona) |
| APIs CORS error | Solo ocurre en file://. Usa servidor local o HTTPS |
| Audio no reproduce | Requiere interacción del usuario primero (política autoplay) |
| APK no carga datos | Verifica que tienes conexión + permisos de Internet en AndroidManifest |

---

## 📜 Licencia

MIT © 2026 — Hecho con ❤️ y تَقْوَى para la ummah hispanohablante.

> *"وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ"*
> — *Y no te enviamos sino como misericordia para los mundos.* (Q 21:107)
