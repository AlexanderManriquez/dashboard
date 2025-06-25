import {
  renderPacientesChart,
  renderTratamientosChart,
  renderCitasChart,
  renderIngresosChart,
  renderCumplimientoChart,
} from "./charts.js";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./assets/data/data.json");
  const data = await response.json();
  const estadisticas = data.estadisticas;

  const selectMes = document.getElementById("mesSelect");

  // Mostrar cards iniciales (Todos los meses)
  generarCardsDesdeMes("Todos", estadisticas);

  // Mostrar gráficos globales (una vez)
  mostrarGraficosGlobales(estadisticas);

  // Evento para actualizar cards al cambiar el mes
  selectMes.addEventListener("change", (e) => {
    const mesSeleccionado = e.target.value;
    generarCardsDesdeMes(mesSeleccionado, estadisticas);
  });

  // Botones para mostrar un gráfico a la vez
  const botonesGraficos = document.querySelectorAll('.chart-btn');
  const charts = document.querySelectorAll('.charts canvas');

  botonesGraficos.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesGraficos.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');

      const chartId = boton.getAttribute('data-chart');

      charts.forEach(canvas => {
        canvas.style.display = (canvas.id === chartId) ? 'block' : 'none';
      });
    });
  });
});

function generarCardsDesdeMes(mesSeleccionado, estadisticas) {
  let datosFiltrados;

  if (mesSeleccionado === "Todos") {
    const acumulado = {
      atenciones: 0,
      ingresos: 0,
      citas: { asistidas: 0, noAsistidas: 0 },
      tratamientos: {},
      areas: {},
      odontologos: {}
    };

    estadisticas.forEach(mes => {
      acumulado.atenciones += mes.atenciones;
      acumulado.ingresos += mes.ingresos;
      acumulado.citas.asistidas += mes.citas.asistidas;
      acumulado.citas.noAsistidas += mes.citas.noAsistidas;

      for (const [k, v] of Object.entries(mes.tratamientos)) {
        acumulado.tratamientos[k] = (acumulado.tratamientos[k] || 0) + v;
      }

      for (const [k, v] of Object.entries(mes.areas)) {
        acumulado.areas[k] = (acumulado.areas[k] || 0) + v;
      }

      mes.odontologos.forEach(o => {
        acumulado.odontologos[o.nombre] = (acumulado.odontologos[o.nombre] || 0) + o.atenciones;
      });
    });

    datosFiltrados = {
      ...acumulado,
      odontologos: Object.entries(acumulado.odontologos).map(([nombre, atenciones]) => ({ nombre, atenciones }))
    };
  } else {
    datosFiltrados = estadisticas.find(e => e.mes === mesSeleccionado);
  }

  generarCards(datosFiltrados);
}

function generarCards(data) {
  const container = document.getElementById("cardsSection");
  container.innerHTML = "";

  const citasTotales = data.citas.asistidas + data.citas.noAsistidas;
  const cumplimientoPorcentaje = Math.round((data.citas.asistidas / citasTotales) * 100);

  const tratamientoMasSolicitado = Object.entries(data.tratamientos)
    .sort((a, b) => b[1] - a[1])[0][0];

  const areaConMasAtenciones = Object.entries(data.areas)
    .sort((a, b) => b[1] - a[1])[0][0];

  const odontologoTop = data.odontologos
    .sort((a, b) => b.atenciones - a.atenciones)[0];

  const cards = [
    { titulo: "Atenciones del mes", valor: data.atenciones },
    { titulo: "Ingresos del mes", valor: `$${data.ingresos.toLocaleString()}` },
    { titulo: "Cumplimiento de citas", valor: `${cumplimientoPorcentaje}%` },
    { titulo: "Tratamiento más solicitado", valor: tratamientoMasSolicitado },
    { titulo: "Área más activa", valor: areaConMasAtenciones },
    { titulo: "Top odontólogo", valor: `${odontologoTop.nombre} (${odontologoTop.atenciones})` }
  ];

  cards.forEach(card => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${card.titulo}</h3>
      <p>${card.valor}</p>
    `;
    container.appendChild(div);
  });
}

function mostrarGraficosGlobales(estadisticas) {
  const tratamientos = acumularTratamientos(estadisticas);
  const cumplimiento = acumularCitas(estadisticas);
  const pacientes = estadisticas.map(m => m.atenciones);
  const ingresos = estadisticas.map(m => m.ingresos);
  const meses = estadisticas.map(m => m.mes);

  const citasPorMes = estadisticas.map(m => ({
    mes: m.mes,
    asistidas: m.citas.asistidas,
    noAsistidas: m.citas.noAsistidas
  }));

  renderPacientesChart(pacientes, meses);
  renderIngresosChart(ingresos, meses);
  renderTratamientosChart(tratamientos);
  renderCitasChart(citasPorMes);
  renderCumplimientoChart(cumplimiento);
}

function acumularTratamientos(dataArray) {
  const total = {};
  dataArray.forEach(mes => {
    for (const [key, val] of Object.entries(mes.tratamientos)) {
      total[key] = (total[key] || 0) + val;
    }
  });
  return total;
}

function acumularCitas(dataArray) {
  return dataArray.reduce((acc, mes) => {
    acc.asistidas += mes.citas.asistidas;
    acc.noAsistidas += mes.citas.noAsistidas;
    return acc;
  }, { asistidas: 0, noAsistidas: 0 });
}
