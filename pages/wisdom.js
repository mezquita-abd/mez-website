// 🎯 Pantalla Sabiduría (placeholder Fase 2)
const WisdomPage = {
  async render(container) {
    const features = [
      { icon: '🧠', title: 'Quiz Islámico Gamificado', desc: '+5,000 preguntas en 6 categorías' },
      { icon: '🏆', title: 'Sistema de niveles', desc: 'Iniciado → Estudiante → Sabio → Erudito → Imam' },
      { icon: '⚔️', title: 'Modo Duelo 1vs1', desc: 'Reta a amigos en tiempo real' },
      { icon: '🔥', title: 'Rachas y XP diario', desc: 'Mantén tu racha de aprendizaje' },
      { icon: '📚', title: 'Mini-cursos interactivos', desc: 'Lecciones de 5 min con certificados' },
      { icon: '🎖️', title: 'Insignias coleccionables', desc: 'Maestro del Tajwid, Conocedor de la Sira...' },
    ];

    container.innerHTML = `
      <div class="page-header">
        <div class="page-title">🎯 ${t('tabWisdom')}</div>
        <div class="page-subtitle">Aprende, juega, crece espiritualmente</div>
      </div>

      <div style="padding: var(--sp-md);">
        <div class="coming-soon-card">
          <div class="coming-soon-label">🚀 Próximamente</div>
          <div class="coming-soon-title">Sabiduría Gamificada</div>
          <div class="coming-soon-desc">
            La sección estrella de Quba está en desarrollo. Aprende el Islam de forma divertida e interactiva — estilo Duolingo.
          </div>
        </div>

        <h2 class="section-title">Funciones planeadas (Fase 2)</h2>

        ${features.map(f => `
          <div class="card">
            <div class="feature-row">
              <div class="feature-icon">${f.icon}</div>
              <div class="feature-info">
                <div class="feature-title">${f.title}</div>
                <div class="feature-desc">${f.desc}</div>
              </div>
            </div>
          </div>
        `).join('')}

        <div class="card" style="background: rgba(15,76,58,0.08);">
          <div style="font-size: 13px; line-height: 1.5;">
            💡 Inspirado en apps como Ilm Arena y Duolingo, con preguntas validadas por eruditos.
          </div>
        </div>
      </div>
    `;
  },
  cleanup() {},
};
