# 🕌 Mezquita Abdullah - Sitio Web v2.0

Sitio web completo, multilingüe y moderno para la **Mezquita Abdullah**, ubicada en Habana Vieja, La Habana, Cuba.

---

## 📄 Estructura del proyecto

```
mezquita-abdullah/
├── index.html              ← Página principal con horarios de oración
├── new-muslims.html        ← Sección para nuevos musulmanes
├── events.html             ← Eventos semanales/mensuales + tahfiz + tablón
├── donate.html             ← Sistema completo de donaciones
├── visit.html              ← Información de visita + mapa + facilidades
├── contact.html            ← Centro de contacto (redes sociales)
├── calendar.html           ← Calendario hijri/gregoriano interactivo
├── prayer-times.html       ← Horarios de oración detallados (semana)
├── css/
│   └── style.css           ← Estilos completos (responsive)
├── js/
│   ├── translations.js     ← Traducciones humanas (ES/EN/AR/FR)
│   ├── main.js             ← Lógica general + idiomas
│   ├── prayer-times.js     ← API Aladhan (Liga Mundial Islámica)
│   ├── calendar.js         ← Conversión hijri ↔ gregoriano
│   └── donate.js           ← Lógica del formulario de donación
├── images/
│   ├── logo.jpg
│   ├── mosque-exterior.jpg
│   ├── mosque-interior-1.jpg
│   ├── mosque-interior-2.jpg
│   ├── mosque-prayer.jpg
│   └── quran.jpg
└── README.md
```

---

## ✨ Funcionalidades implementadas

### 1️⃣ Sección para Nuevos Musulmanes (`new-muslims.html`)
- ✅ 4 pasos guiados: Wudu, Salat, Corán, Mentor
- ✅ Videos de YouTube en 4 idiomas (Español, Inglés, Árabe, Francés)
- ✅ Recursos: Quran.com (ES/EN), Complejo Rey Fahd, Yaqeen Institute, Bayyinah TV
- ✅ Formulario de solicitud de mentor personal
- ✅ Botones directos a WhatsApp (+53 59490936)
- ✅ Libros gratuitos en Archive.org

### 2️⃣ Comunidad Local (`events.html`)
- ✅ **Programa de Tahfiz**: niños, adultos y mujeres con horarios
- ✅ **Tablón de anuncios**: bodas, condolencias, iftares, lecciones
- ✅ **Eventos semanales** (próximos 7 días) y **mensuales**

### 3️⃣ Sistema de Donaciones (`donate.html`)
- ✅ Botón "Donar" visible en TODAS las páginas (navbar + botón flotante)
- ✅ Frecuencia: una vez / mensual / anual
- ✅ Montos predefinidos + cantidad personalizada
- ✅ Métodos de pago: **Visa/Mastercard, PayPal, Zelle, Cripto**
- ✅ Barra de progreso de objetivos (3 proyectos activos)
- ✅ Recibo fiscal automático (planeado)
- ✅ Donación anónima opcional
- ✅ **Versículos coránicos y hadices** motivacionales
- ✅ Otras formas: transferencia bancaria, presencial, voluntariado

### 4️⃣ Visita Logística (`visit.html`)
- ✅ Mapa interactivo de Google Maps embebido
- ✅ Coordenadas: **23.139272, -82.349244**
- ✅ Estacionamiento más cercano: 23.139839, -82.348334
- ✅ Parada de bus más cercana: 23.141224, -82.348540
- ✅ Sala separada para mujeres + wudu mujeres (destacado)
- ✅ Aviso de horas pico (Yumu'ah, Ramadán, Eid)
- ✅ Guía de etiqueta para visitantes

### 5️⃣ Redes Sociales y Vida Diaria
- ✅ Tarjetas grandes a Instagram, Facebook, WhatsApp en homepage
- ✅ Iconos sociales en footer de cada página
- ✅ Página de contacto dedicada con todos los canales

### 6️⃣ Traducciones Humanas (No Google Translate)
- ✅ Archivo `translations.js` con traducciones manuales
- ✅ 4 idiomas: Español, Inglés, Árabe (RTL), Francés
- ✅ Cambio dinámico sin recargar página
- ✅ Idioma guardado en `localStorage`

### 7️⃣ Funciones Islámicas
- ✅ **Horarios de oración**: API Aladhan (gratis), método Liga Mundial Islámica
- ✅ Barra superior con próxima oración y cuenta regresiva
- ✅ Tabla semanal de horarios (`prayer-times.html`)
- ✅ **Calendario hijri-gregoriano** interactivo (`calendar.html`)
- ✅ Fechas importantes: Ramadán, Eid al-Fitr, Hajj, Año Nuevo Hijri
- ✅ **Contacto reformado**: solo redes sociales + teléfono (sin formularios de "cita")

### 8️⃣ FAQs Actualizadas
- ✅ Hijab: explicación basada en obediencia a Allah
- ✅ Cristianos/judíos: incluye versículos (2:256, 109:6)
- ✅ 5 oraciones: incluye Al-Ankabut 29:45 sobre prevenir el mal

---

## 🚀 Cómo usar

### Opción 1: Abrir directamente
1. Descomprime el ZIP
2. Abre `index.html` en cualquier navegador moderno
3. ¡Listo!

### Opción 2: Servidor local (recomendado para Aladhan API)
```bash
# Con Python 3
cd mezquita-abdullah
python3 -m http.server 8000
# Abre: http://localhost:8000

# Con Node.js
npx serve .
```

---

## 🔧 Configuración técnica

### API de Horarios de Oración (Aladhan)
- **URL**: `https://api.aladhan.com/v1/timings/{date}`
- **Coordenadas**: 23.139272, -82.349244 (La Habana)
- **Método**: 3 (Muslim World League / Rabita al-Alam al-Islami)
- **Costo**: GRATIS, sin API key
- **Documentación**: https://aladhan.com/prayer-times-api

### Pasarelas de pago recomendadas (gratis/bajo costo)
| Servicio | Comisión | Notas |
|----------|----------|-------|
| **Stripe** | 2.9% + $0.30 | Sin mensualidad. Visa/MC/AmEx |
| **PayPal** | 2.9% + $0.30 | Reconocido mundialmente |
| **Donorbox** | 1.5% extra | Plataforma diseñada para mezquitas/ONGs |
| **Givebutter** | 0% (tip-based) | Recomendado para ONGs |

> **Para Cuba específicamente**: Considera Zelle (a familia/representante en USA), transferencia bancaria internacional, o un fideicomiso en USA/España que reciba los fondos.

---

## 📋 Pasos para activar las funcionalidades reales

### 1. Donaciones (Stripe)
1. Crea cuenta en https://stripe.com
2. Obtén tu `Publishable Key`
3. Reemplaza `js/donate.js` con integración de Stripe Checkout:
```javascript
// Ejemplo simplificado
const stripe = Stripe('pk_live_TU_KEY');
form.addEventListener('submit', async () => {
    const response = await fetch('/create-checkout-session', { /* ... */ });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
});
```

### 2. Recibos fiscales
- Usa **Donorbox** (incluye recibos automáticos)
- O integra con **SendGrid** + plantilla PDF

### 3. Tablón de anuncios dinámico
- Usa **Airtable** (gratis, API simple) como CMS
- O **Google Sheets API** (totalmente gratis)
- O instala WordPress con plugin Polylang para mezquita pequeña

### 4. Feed de Instagram automático
- Usa **EmbedSocial** o **SnapWidget** (versión gratis)
- O Instagram Basic Display API (gratis, requiere token)

### 5. Cambio de idioma sin Google Translate
- ✅ Ya implementado con `translations.js`
- Para extender: simplemente edita el archivo y añade más claves

---

## 💰 Costos estimados (mensual)

| Servicio | Costo |
|----------|-------|
| Hosting (Netlify/Vercel) | **$0** (gratis) |
| Dominio (.org) | ~$1/mes |
| Aladhan API | **$0** |
| Google Maps embed | **$0** |
| Stripe/PayPal | Solo comisión por transacción |
| Donorbox plan free | **$0** (hasta cierto volumen) |
| **TOTAL FIJO** | **~$1-5/mes** |

---

## 🌍 Idiomas

| Idioma | Código | Estado |
|--------|--------|--------|
| Español | `es` | ✅ Completo (idioma principal) |
| English | `en` | ✅ Completo |
| العربية | `ar` | ✅ Completo (RTL automático) |
| Français | `fr` | ✅ Parcial (claves principales) |

**Para añadir más idiomas**: edita `js/translations.js` y agrega un nuevo objeto.

---

## 📞 Información de contacto del centro

- **Dirección**: Obispo #13 e/ Ave del Puerto, Habana Vieja, La Habana, Cuba
- **Coordenadas**: 23.139272, -82.349244
- **Teléfono / WhatsApp**: +53 59490936
- **Instagram**: [@mezquita__abdullah](https://www.instagram.com/mezquita__abdullah)
- **Facebook**: [Mezquita Abdullah](https://www.facebook.com/share/18zo94WL5i/)
- **Canal WhatsApp**: [Unirse](https://www.whatsapp.com/channel/0029vb7hd1kkmcpjx0nllu06)

---

## 🤲 Du'a

> *"رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ"*
>
> "¡Señor Nuestro! Acéptanos. Tú eres el que todo lo oye, el que todo lo sabe." - Al-Baqarah 2:127

**Que Allah acepte este esfuerzo y haga de esta mezquita una fuente de hidayah para Cuba y el mundo.**
