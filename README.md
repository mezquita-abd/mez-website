# 🕌 Quba — Tu compañero islámico

**Quba** es una aplicación web islámica integral diseñada para la comunidad musulmana hispanohablante.

## ✨ Características

- 📖 **Corán completo** — 114 suras con búsqueda
- 🕌 **Horarios de oración** — 5 oraciones diarias con próxima oración destacada
- 📅 **Calendario Hijri** — Calendario islámico con fechas importantes
- 🧭 **Brújula Qibla** — Dirección de La Meca con cálculo geográfico real
- 🧠 **Quiz Islámico** — 6 categorías: Corán, Sira, Hadices, Fiqh, Historia, Profetas
- 🌿 **Bienestar Espiritual** — Meditación, du'as, diario de gratitud, tasbih

## 🌍 Idiomas soportados

- 🇪🇸 **Español** (idioma principal)
- 🇬🇧 **Inglés**
- 🇸🇦 **Árabe** (con soporte RTL completo)

## 📁 Estructura del proyecto

```
Quba/
├── index.html              # Página principal
├── css/
│   ├── style.css           # Estilos globales (navbar, hero, footer, botones)
│   ├── home.css            # Estilos de la home (prayer strip, carrusel, features)
│   └── pages.css           # Estilos de páginas internas
├── js/
│   ├── translations.js     # Sistema de traducciones (ES/EN/AR)
│   ├── main.js             # Lógica principal (navbar, prayer times, contadores)
│   └── home.js             # Carrusel de la home
├── pages/
│   ├── quran.html          # Sección Corán
│   ├── prayer-times.html   # Horarios de oración detallados
│   ├── calendar.html       # Calendario hijri
│   ├── quiz.html           # Quiz islámico gamificado
│   ├── wellness.html       # Bienestar espiritual (rafahiya)
│   ├── qibla.html          # Brújula Qibla
│   └── about.html          # Acerca de Quba
└── images/                 # (carpeta vacía — añade tus imágenes aquí)
```

## 🎨 Paleta de colores

- **Verde primario**: `#0F5C4E`
- **Verde oscuro**: `#0a4339`
- **Dorado**: `#D4AF37`
- **Azul medianoche**: `#1a2a4a`
- **Beige cremoso**: `#F5F1E8`

## 🚀 Cómo usar

1. Descomprime el archivo ZIP
2. Abre `index.html` en cualquier navegador moderno
3. ¡Listo! No requiere instalación ni servidor

## 🌐 Diseño inspirado en

Diseño visual inspirado en la [Mezquita Abdullah en La Habana](https://mezquitaabdullah1-sys.github.io/Mezquita-abdullah-en-la-habana/) — manteniendo la misma estética de verde esmeralda y dorado con elementos islámicos clásicos.

## 📝 Notas

- Los horarios de oración son ejemplos. En producción se conectaría a la API de [AlAdhan](https://aladhan.com/prayer-times-api).
- El cálculo de la Qibla usa fórmulas geográficas reales basadas en las coordenadas de la Kaaba (21.4225°N, 39.8262°E).
- Las traducciones se guardan en `localStorage` para mantener la preferencia del usuario.

---

**جزاكم الله خيرا** — Que Allah los recompense con el bien.

© 2026 Quba — Todos los derechos reservados.
