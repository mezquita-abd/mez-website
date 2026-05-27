# 🕌 Quba v2.0 — Phase 2 Edition

**Tu compañero espiritual islámico** — versión web con gamificación completa, listo para convertir a APK.

> 🎯 **Phase 2 incluye:** Quiz gamificado (305+ preguntas), Tasbih digital, 4 colecciones de Adhkar, 3 mini-cursos, sistema de XP/niveles/logros.

---

## ✨ Novedades de Phase 2

### 🧠 Quiz Islámico Gamificado (estilo Duolingo)
- **305+ preguntas curadas** en 6 categorías:
  - 📖 **Corán y Tafsir** (60 preguntas)
  - 🕋 **Vida del Profeta ﷺ (Sira)** (55 preguntas)
  - 📜 **Hadices auténticos** (50 preguntas)
  - ⚖️ **Fiqh básico** (50 preguntas)
  - 🌙 **Historia islámica** (45 preguntas)
  - 👨 **Profetas** (45 preguntas)
- Cada quiz = 10 preguntas aleatorias
- Explicación detallada con cada respuesta
- Sistema de 3 niveles de dificultad (easy/medium/hard)

### 🏆 Sistema de gamificación completo
- **10 niveles**: Iniciado → Buscador → Estudiante → Aprendiz → Conocedor → Sabio → Maestro → Erudito → Hakim → **Imam** 🕌
- **5 vidas** ❤️ con regeneración automática (1 cada 30 min)
- **XP system**: +10 por respuesta correcta, +5 bonus por racha, +50 por quiz perfecto
- **Racha diaria** 🔥 — días consecutivos activos
- **18 logros desbloqueables** (Primer paso, Perfección, Maestro del Tajwid, Imam, Mil dhikrs...)

### 📿 Tasbih Digital
- 6 dhikrs preconfigurados (Subhanallah, Alhamdulillah, Allahu Akbar, La ilaha illa Allah, Astaghfirullah, etc.)
- Contador circular animado con barra de progreso
- **Feedback háptico** (vibración) en cada toque
- **Sonido sutil** (web audio API)
- Auto-avance al siguiente dhikr al completar
- Conteo total histórico persistente

### 🤲 Colecciones de Adhkar (4 sets)
- 🌅 **Adhkar de la mañana** — 8 dhikrs (Ayat al-Kursi, Sayyid al-Istighfar, las 3 Quls...)
- 🌇 **Adhkar de la tarde** — 6 dhikrs
- 🌙 **Adhkar antes de dormir** — 5 dhikrs (incluye 33+33+34 de Fatimah)
- 🕌 **Adhkar tras la oración** — 8 dhikrs (los tasabih obligatorios)
- Cada dhikr incluye: árabe + transliteración + traducción + virtud + fuente
- Contadores tactiles con animación visual

### 📚 Mini-cursos interactivos (3 cursos)
- 🕌 **Cómo rezar paso a paso** — 7 lecciones detalladas (Wudu, Niyyah, Qiyam, Ruku, Sujud, Tashahhud, Taslim)
- ⭐ **Los 5 Pilares del Islam** — 7 lecciones (Shahada, Salat, Zakat, Sawm, Hajj + intro + conclusión)
- ✨ **Los 99 Nombres de Allah** — Asma ul-Husna completos con árabe, transliteración, español y significado profundo
- Sistema de progreso con barra visual
- +25 XP por lección, +50 XP bonus al completar curso

---

## 📊 Estadísticas del proyecto

| Métrica | Valor |
|---|---|
| Líneas de código | ~5,500+ |
| Archivos JS | 25+ |
| Preguntas del quiz | **305+** |
| Dhikrs (Adhkar) | 27 únicos |
| 99 Nombres de Allah | 99 con significados |
| Lecciones de cursos | 15+ lecciones |
| Logros desbloqueables | 18 |
| Niveles | 10 |
| Idiomas soportados | 3 (ES/AR/EN) |

---

## 🎮 Cómo funciona la gamificación

### Sistema XP
| Acción | XP ganados |
|---|---|
| Respuesta correcta | +10 |
| Racha de respuestas | +5 bonus cada una |
| Quiz perfecto (0 errores) | +50 bonus |
| Completar lección | +25 |
| Completar curso | +50 |
| 100 dhikrs en Tasbih | +20 |
| Completar set de Adhkar | +30 |

### Niveles
```
Nivel 1  (0 XP)     🌱 Iniciado
Nivel 2  (50 XP)    🌿 Buscador
Nivel 3  (150 XP)   📚 Estudiante
Nivel 4  (300 XP)   🎓 Aprendiz
Nivel 5  (500 XP)   💡 Conocedor
Nivel 6  (750 XP)   🌟 Sabio
Nivel 7  (1000 XP)  👳 Maestro
Nivel 8  (1500 XP)  🕌 Erudito
Nivel 9  (2500 XP)  ⭐ Hakim
Nivel 10 (5000 XP)  🌙 Imam
```

### Vidas
- Máximo: **5 vidas** ❤️
- Pierdes 1 vida por cada respuesta incorrecta
- Regeneración automática: **1 vida cada 30 minutos**
- Si te quedas sin vidas, debes esperar

---

## 🚀 Cómo usar localmente

```bash
unzip quba-web-v2.zip
cd quba-web-v2
python3 -m http.server 8080
# Abrir http://localhost:8080
```

O con Node:
```bash
npx serve quba-web-v2
```

---

## 📱 Convertir a APK (igual que v1)

### 🌟 Opción más rápida: PWA Builder (10 minutos)

1. Sube la carpeta a [Netlify Drop](https://app.netlify.com/drop) (gratis, drag & drop)
2. Ve a [pwabuilder.com](https://www.pwabuilder.com)
3. Pega tu URL → Start → **Package For Stores → Android**
4. Descarga el APK firmado ✅

Ver **APK_GUIDE.md** para todas las opciones (Capacitor, Bubblewrap, Median.co).

---

## 📁 Estructura del proyecto

```
quba-web-v2/
├── index.html
├── manifest.json
├── sw.js                          (caché de 50+ archivos)
├── README.md
├── APK_GUIDE.md
│
├── assets/                        (íconos)
│
├── css/
│   ├── main.css                   (variables, splash)
│   ├── components.css             (cards, botones)
│   ├── screens.css                (Home, Quran, Prayer, Calendar)
│   └── wisdom.css                 (NUEVO - Phase 2)
│
├── js/
│   ├── i18n.js
│   ├── config.js
│   ├── storage.js
│   ├── api.js
│   ├── qibla.js
│   ├── duas.js
│   ├── hijri.js
│   ├── gamification.js           (NUEVO - XP/niveles/logros)
│   ├── router.js
│   └── app.js
│
├── data/                          (NUEVO)
│   ├── quiz/
│   │   ├── quran.js              (60 preguntas)
│   │   ├── sira.js               (55 preguntas)
│   │   ├── hadith.js             (50 preguntas)
│   │   ├── fiqh.js               (50 preguntas)
│   │   ├── history.js            (45 preguntas)
│   │   └── prophets.js           (45 preguntas)
│   ├── adhkar/
│   │   ├── morning.js
│   │   ├── evening.js
│   │   ├── sleep.js
│   │   └── after_prayer.js
│   └── courses/
│       ├── how_to_pray.js
│       ├── pillars.js
│       └── names_of_allah.js
│
└── pages/
    ├── home.js
    ├── quran.js
    ├── prayer.js
    ├── calendar.js
    ├── wisdom.js                  (hub principal)
    ├── profile.js
    └── wisdom/                    (NUEVO)
        ├── quiz.js
        ├── tasbih.js
        ├── adhkar.js
        └── courses.js
```

---

## 💾 Datos persistentes

Toda la gamificación se guarda automáticamente en `localStorage`:

| Clave | Contenido |
|---|---|
| `quba_gamification` | XP, nivel, vidas, racha, logros, estadísticas por categoría |
| `quba_tasbih` | Conteo actual, total histórico, dhikr seleccionado |
| `quba_settings` | Idioma, tema, método, recitador |
| `quba_prayer_*` | Caché de tiempos de oración (24h) |
| `quba_surah_list` | Lista de las 114 suras (30 días) |
| `quba_hijri_*` | Conversiones hijri (7 días) |

---

## 🎯 Próximos pasos (Phase 3 sugerida)

- 🤖 **IA conversacional** (consultas islámicas con respuestas de eruditos)
- ⚔️ **Modo Duelo 1vs1** (requiere backend: Firebase)
- 🏆 **Leaderboard global** (requiere backend)
- 📸 **AR Qibla** (realidad aumentada)
- 🎙️ **Podcast integrado**

---

## 📜 Licencia

MIT © 2026 — Hecho con ❤️ y تَقْوَى para la ummah hispanohablante.

> *"وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ"*
> *— Y no te enviamos sino como misericordia para los mundos.* (Q 21:107)
