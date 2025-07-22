const formulario = document.getElementById("formulario-hechizo");
const hechizoContainer = document.getElementById("hechizo-container");
const hechizoSeleccionado = document.getElementById("hechizo-seleccionado");
const btnBorrarLS = document.getElementById("borrarLS");

let hechizos = [];
let hechizoElegido = null;

// Crear hechizo personalizado con validación
function crearHechizoPersonalizado(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const nivel = parseInt(document.getElementById("nivel").value.trim());
  const efecto = document.getElementById("efecto").value.trim();
  const numero = parseInt(document.getElementById("numero").value.trim());

  // Validar campos vacíos
  if (!nombre || !tipo || isNaN(nivel) || !efecto || isNaN(numero)) {
    Toastify({
      text: "Todos los campos deben estar completos.",
      style: { background: "red" },
      duration: 3000,
    }).showToast();
    return;
  }

  // Validar duplicados
  const repetido = hechizos.some(h => h.numero === numero || h.nombre.toLowerCase() === nombre.toLowerCase());
  if (repetido) {
    Toastify({
      text: "Ya existe un hechizo con ese nombre o número.",
      style: { background: "orange" },
      duration: 3000,
    }).showToast();
    return;
  }

  const hechizo = { nombre, tipo, nivel, efecto, numero };
  hechizos.push(hechizo);
  localStorage.setItem("hechizos", JSON.stringify(hechizos));
  mostrarInventario();
  formulario.reset();

  Toastify({
    text: "¡Hechizo guardado!",
    style: { background: "green" },
    duration: 2000,
  }).showToast();
}

// Mostrar hechizo seleccionado
function mostrarHechizo(hechizo) {
  hechizoSeleccionado.innerHTML = `
    <h2>${hechizo.nombre}</h2>
    <p><strong>Tipo:</strong> ${hechizo.tipo}</p>
    <p><strong>Nivel:</strong> ${hechizo.nivel}</p>
    <p><strong>Efecto:</strong> ${hechizo.efecto}</p>
  `;
  hechizoElegido = hechizo;
  localStorage.setItem("hechizoSeleccionado", JSON.stringify(hechizo));
}

// Mostrar hechizos disponibles
function mostrarInventario() {
  hechizoContainer.innerHTML = "";

  hechizos.forEach(hechizo => {
    const div = document.createElement("div");
    div.classList.add("hechizo-card");
    div.innerHTML = `
      <h3>${hechizo.nombre}</h3>
      <p><strong>Tipo:</strong> ${hechizo.tipo}</p>
      <p><strong>Nivel:</strong> ${hechizo.nivel}</p>
      <button class="btn-seleccionar">Seleccionar</button>
    `;

    div.querySelector(".btn-seleccionar").addEventListener("click", () => {
      mostrarHechizo(hechizo);
    });

    hechizoContainer.appendChild(div);
  });
}

// Cargar hechizos desde localStorage
function cargarLS() {
  const hechizosLS = localStorage.getItem("hechizos");
  if (hechizosLS) {
    hechizos = JSON.parse(hechizosLS);
    mostrarInventario();
  }

  const seleccionadoLS = localStorage.getItem("hechizoSeleccionado");
  if (seleccionadoLS) {
    mostrarHechizo(JSON.parse(seleccionadoLS));
  }
}

// Borrar localStorage
btnBorrarLS.addEventListener("click", () => {
  localStorage.clear();
  hechizos = [];
  hechizoElegido = null;
  hechizoContainer.innerHTML = "";
  hechizoSeleccionado.innerHTML = "";
  Toastify({
    text: "LocalStorage borrado.",
    style: { background: "gray" },
    duration: 2000,
  }).showToast();
});

formulario.addEventListener("submit", crearHechizoPersonalizado);
document.addEventListener("DOMContentLoaded", cargarLS);
