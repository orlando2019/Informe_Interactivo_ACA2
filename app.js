const NEXUS_BANNER_HTML = `
  <div class="team-banner" id="teamBanner">
    <div class="team-banner-inner">
      <span class="team-banner-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ACA2
      </span>
      <a class="team-banner-link" href="index.html">Dashboard</a>
      <span class="team-sep">·</span>
      <span class="team-member" style="--accent: #00e5ff;">Orlando M. Ospino Hernández</span>
      <span class="team-sep">·</span>
      <span class="team-member" style="--accent: #22d97f;">Ildefonso J. Jiménez De La Rosa</span>
      <span class="team-sep">·</span>
      <span class="team-member" style="--accent: #a855f7;">Leidy T. Pérez Rodríguez</span>
      <span class="team-sep">·</span>
      <span class="team-member" style="--accent: #f59e0b;">Edward F. Torres Rodríguez</span>
    </div>
  </div>
`;

const NEXUS_FOOTER_HTML = `
  <footer class="dashboard-footer">
    <p>Nexus Renewables — Vientos del Desierto · ACA2 Sostenibilidad Estratégica CUN 2025</p>
    <p class="footer-team">Orlando M. Ospino H. · Ildefonso J. Jiménez De La Rosa · Leidy T. Pérez R. · Edward F. Torres R.</p>
    <p class="footer-credit">Desarrollado por <span>Orlando Ospino</span></p>
  </footer>
`;

function injectSharedBanner() {
  if (!document.body || document.querySelector('.team-banner')) return;
  document.body.insertAdjacentHTML('afterbegin', NEXUS_BANNER_HTML);
}

function injectSharedFooter() {
  if (!document.body || document.querySelector('.dashboard-footer')) return;
  document.body.insertAdjacentHTML('beforeend', NEXUS_FOOTER_HTML);
}

async function injectFragment(path, selector, position, fallback) {
  if (!document.body || document.querySelector(selector)) return;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No se pudo cargar ${path}`);

    const html = await response.text();
    document.body.insertAdjacentHTML(position, html);
    if (document.querySelector(selector)) return;
  } catch (_) {
    // Fallback for local file previews or blocked fetch.
  }

  if (!document.querySelector(selector)) {
    document.body.insertAdjacentHTML(position, fallback);
  }
}

function deepMerge(target, source) {
  const output = { ...target };

  Object.entries(source || {}).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      output[key] = deepMerge(target[key] || {}, value);
      return;
    }

    output[key] = value;
  });

  return output;
}

function setupChartDefaults() {
  if (!window.Chart || window.NexusCharts?.ready) return;

  Chart.defaults.color = '#8888a0';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.animation.duration = 1100;
  Chart.defaults.animation.easing = 'easeOutQuart';

  Chart.register({
    id: 'nexusCanvasGlow',
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const gradient = ctx.createRadialGradient(
        chartArea.left + chartArea.width / 2,
        chartArea.top,
        24,
        chartArea.left + chartArea.width / 2,
        chartArea.top + chartArea.height / 2,
        chartArea.width
      );

      gradient.addColorStop(0, 'rgba(0,229,255,0.07)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
      ctx.restore();
    }
  });

  window.NexusCharts = {
    ready: true,
    create(target, config) {
      const element = typeof target === 'string' ? document.getElementById(target) : target;
      if (!element) return null;

      const baseConfig = {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'nearest',
            intersect: false
          },
          plugins: {
            legend: {
              labels: {
                color: '#8888a0',
                padding: 14
              }
            },
            tooltip: {
              backgroundColor: '#11131d',
              titleColor: '#f3f4f6',
              bodyColor: '#c3c5da',
              borderColor: 'rgba(0,229,255,0.18)',
              borderWidth: 1,
              cornerRadius: 10,
              padding: 12,
              displayColors: true
            }
          }
        }
      };

      return new Chart(element, deepMerge(baseConfig, config));
    }
  };
}

injectFragment('banner.html', '.team-banner', 'afterbegin', NEXUS_BANNER_HTML);
injectFragment('footer.html', '.dashboard-footer', 'beforeend', NEXUS_FOOTER_HTML);
setupChartDefaults();
