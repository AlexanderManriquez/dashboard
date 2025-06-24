import {
  renderPacientesChart,
  renderTratamientosChart,
  renderCitasChart,
  renderIngresosChart,
  renderCumplimientoChart
} from './charts.js';

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./assets/data/data.json');
  const data = await response.json();

  const charts = {};

  // Inicializar cada gráfico
  charts.pacientesChart = renderPacientesChart(
    document.getElementById('pacientesChart'),
    data.meses,
    data.atencionesPorMes
  );

  charts.tratamientosChart = renderTratamientosChart(
    document.getElementById('tratamientosChart'),
    data.tratamientosSolicitados
  );

  charts.citasChart = renderCitasChart(
    document.getElementById('citasChart'),
    data.diasSemana,
    data.citasPorDia
  );

  charts.ingresosChart = renderIngresosChart(
    document.getElementById('ingresosChart'),
    data.meses,
    data.ingresosMensuales
  );

  charts.cumplimientoChart = renderCumplimientoChart(
    document.getElementById('cumplimientoChart'),
    data.cumplimientoCitas
  );

  // Ocultar todos los canvas al inicio
  document.querySelectorAll('.charts canvas').forEach(c => c.style.display = 'none');

  // Mostrar solo el primero
  document.getElementById('pacientesChart').style.display = 'block';

  // Manejar botones de selección
  const buttons = document.querySelectorAll('.chart-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.chart;

      // Estilo botón activo
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Ocultar todos los gráficos
      document.querySelectorAll('.charts canvas').forEach(c => c.style.display = 'none');

      // Mostrar gráfico seleccionado
      document.getElementById(target).style.display = 'block';
    });
  });

  // Ranking odontólogos
  const rankingList = document.getElementById('rankingOdontologos');
  rankingList.innerHTML = data.odontologos
    .sort((a, b) => b.atenciones - a.atenciones)
    .map(o => `<li>${o.nombre}: ${o.atenciones} atenciones</li>`)
    .join('');
});
