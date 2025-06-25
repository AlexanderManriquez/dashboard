// charts.js

let pacientesChartInstance;
let tratamientosChartInstance;
let citasChartInstance;
let ingresosChartInstance;
let cumplimientoChartInstance;

export function renderPacientesChart(data, label = '') {
  const ctx = document.getElementById('pacientesChart').getContext('2d');
  if (pacientesChartInstance) pacientesChartInstance.destroy();

  
const labels = Array.isArray(data) ? data.map(e => e.mes) : [label];
  const valores = Array.isArray(data) ? data.map(e => e.atenciones) : [data];
  pacientesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Atenciones',
        data: valores,
        backgroundColor: '#4f46e5'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderTratamientosChart(data) {
  const ctx = document.getElementById('tratamientosChart').getContext('2d');
  if (tratamientosChartInstance) tratamientosChartInstance.destroy();

  tratamientosChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Tratamientos',
        data: Object.values(data),
        backgroundColor: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderCitasChart(data) {
  const ctx = document.getElementById('citasChart').getContext('2d');
  if (citasChartInstance) citasChartInstance.destroy();

  const labels = Array.isArray(data)
    ? data.map(d => d.mes)
    : ['Seleccionado'];

  const asistidas = Array.isArray(data)
    ? data.map(d => d.asistidas)
    : [data[0]];

  const noAsistidas = Array.isArray(data)
    ? data.map(d => d.noAsistidas)
    : [data[1]];

  citasChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Asistidas',
          data: asistidas,
          backgroundColor: '#16a34a'
        },
        {
          label: 'No asistidas',
          data: noAsistidas,
          backgroundColor: '#ef4444'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderIngresosChart(data, label = '') {
  const ctx = document.getElementById('ingresosChart').getContext('2d');
  if (ingresosChartInstance) ingresosChartInstance.destroy();

  const labels = Array.isArray(data) ? data.map(e => e.mes) : [label];
  const valores = Array.isArray(data) ? data.map(e => e.atenciones) : [data];

  ingresosChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Ingresos ($CLP)',
        data: valores,
        backgroundColor: '#f97316'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderCumplimientoChart(data) {
  const ctx = document.getElementById('cumplimientoChart').getContext('2d');
  if (cumplimientoChartInstance) cumplimientoChartInstance.destroy();

  cumplimientoChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Asistidas', 'No asistidas'],
      datasets: [{
        label: 'Citas',
        data: [data.asistidas, data.noAsistidas],
        backgroundColor: ['#16a34a', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
