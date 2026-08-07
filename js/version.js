// 🏷️ Versión centralizada — cargar primero
// Un solo punto de verdad para SW, README, profile, manifest
const APP_VERSION = '4.6.0';
const APP_BUILD_DATE = '2026-08-01';
const APP_NAME = 'Quba';
const APP_CODENAME = 'Quba Al-Mubarak';

// Helper global de seguridad — escapa HTML para prevenir XSS
// Uso: ${escapeHtml(apiData.field)} en todos los template literals
function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Alias corto para templates
const esc = escapeHtml;

// Escape para atributos HTML (más estricto: incluye backticks y control chars)
function escapeAttr(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
