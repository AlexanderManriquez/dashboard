// Módulo para manejar los gráficos de la aplicación

export function renderPacientesChart(ctx, labels, data) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Atenciones por mes',
        data,
        backgroundColor: '#4f46e5'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderTratamientosChart(ctx, data) {
  return new Chart(ctx, {
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

export function renderCitasChart(ctx, labels, data) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Citas por día',
        data,
        borderColor: '#22c55e',
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderIngresosChart(ctx, labels, data) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Ingresos ($CLP)',
        data,
        backgroundColor: '#f97316'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export function renderCumplimientoChart(ctx, data) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Citas',
        data: Object.values(data),
        backgroundColor: ['#16a34a', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
