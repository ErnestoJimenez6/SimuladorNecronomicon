const hechizoSelect = document.getElementById('hechizo');
const resultadoDiv = document.getElementById('resultado');
const btnGuardar = document.getElementById('btnGuardar');

let hechizos = [];
let hechizoActual = null;

// Cargar hechizos desde JSON
fetch('array.json')
  .then(response => {
    if (!response.ok) throw new Error('Error al cargar los hechizos');
    return response.json();
  })
  .then(data => {
    hechizos = data;
    cargarLS(); // Mostrar el hechizo guardado, si existe
    poblarSelect();
  })
  .catch(error => {
    console.error(error);
    Toastify({
      text: "No se pudo cargar el grimorio 📜",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#8B0000"
    }).showToast();
  });

// Rellenar <select> con hechizos
function poblarSelect() {
  hechizos.forEach(hechizo => {
    const option = document.createElement('option');
    option.value = hechizo.id;
    option.textContent = hechizo.nombre;
    hechizoSelect.appendChild(option);
  });
}

// Mostrar hechizo seleccionado
hechizoSelect.addEventListener('change', () => {
  const id = parseInt(hechizoSelect.value);
  hechizoActual = hechizos.find(h => h.id === id);
  if (hechizoActual) mostrarHechizo();
});

// Mostrar en pantalla
function mostrarHechizo() {
  resultadoDiv.innerHTML = `
    <h2>${hechizoActual.nombre}</h2>
    <p><strong>Descripción:</strong> ${hechizoActual.descripcion}</p>
    ${hechizoActual.efecto ? `<p><strong>Efecto:</strong> ${hechizoActual.efecto}</p>` : ''}
    ${hechizoActual.nivel ? `<p><strong>Nivel:</strong> ${hechizoActual.nivel}</p>` : ''}
    ${hechizoActual.tipo ? `<p><strong>Tipo:</strong> ${hechizoActual.tipo}</p>` : ''}
    ${hechizoActual.efectoSonoro ? `<p><strong>Sonido:</strong> ${hechizoActual.efectoSonoro}</p>` : ''}
  `;
}

// Guardar hechizo en localStorage
btnGuardar.addEventListener('click', () => {
  if (hechizoActual) {
    localStorage.setItem('hechizoGuardado', JSON.stringify(hechizoActual));
    Toastify({
      text: "Hechizo guardado en tu grimorio 🧪",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4B0082"
    }).showToast();
  }
});

// Cargar desde localStorage si existe
function cargarLS() {
  const hechizoLS = localStorage.getItem('hechizoGuardado');
  if (hechizoLS) {
    hechizoActual = JSON.parse(hechizoLS);
    mostrarHechizo();
  }
}
