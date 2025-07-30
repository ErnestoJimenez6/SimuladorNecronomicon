// VARIABLES GLOBALES
const elegirEchizo = document.getElementById('elegir-numero');
const personalizarHechizo = document.getElementById('crear-hechizo');
const personalizacionDiv = document.getElementById('personalizacion');

// Contador de hechizos personalizados
let contHechizosCustom = 0;

// Clase Hechizo (la defines en data.js, si querés mantenerla global aquí también)
class Hechizo {
  constructor(numero, nombre, invocacion, nivel = 'Personalizado', tipo = 'Custom', efectoSonoro = '') {
    this.numero = numero;
    this.nombre = nombre;
    this.invocacion = invocacion;
    this.nivel = nivel;
    this.tipo = tipo;
    this.efectoSonoro = efectoSonoro;
  }
}

// Crear hechizo personalizado (usar todos los parámetros para evitar undefined)
function crearHechizoPersonalizado() {
  const nombre = document.getElementById('nombre-hechizo').value;
  const invocacion = document.getElementById('invocacion-hechizo').value;

  if (!nombre || !invocacion) {
    Toastify({
      text: 'Por favor, completa todos los campos.',
      duration: 3000,
      gravity: 'top',
      position: 'center',
      style: { background: 'linear-gradient(to right, #212121, #b30000)' }
    }).showToast();
    return;
  }

  contHechizosCustom++;
  const numHechizoCustom = 10 + contHechizosCustom;

  const nuevoHechizo = new Hechizo(numHechizoCustom, nombre, invocacion);

  hechizosElegidos.push(nuevoHechizo);
  mostrarInventario();
  personalizacionDiv.innerHTML = '<p>Hechizo personalizado añadido con éxito al Necronomicón.</p>';
  guardarLS();
}

// Mostrar mensajes en DOM
function mostrarMensaje(mensaje) {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.textContent = mensaje;
}

// Mostrar inventario de hechizos (función global)
function mostrarInventario() {
  const listaInventario = document.getElementById('lista-inventario');
  listaInventario.innerHTML = '';

  for (let i = 0; i < hechizosElegidos.length; i++) {
    const hechizo = hechizosElegidos[i];
    const listItem = document.createElement('li');

    const infoHechizo = document.createElement('p');
    infoHechizo.textContent = `${hechizo.numero}: ${hechizo.nombre} [${hechizo.tipo} - ${hechizo.nivel}] - ${hechizo.invocacion}`;
    listItem.appendChild(infoHechizo);

    if (hechizo.efectoSonoro) {
      const playBtn = document.createElement('button');
      playBtn.textContent = '🔊';
      playBtn.addEventListener('click', () => {
        const audio = new Audio(`./sounds/${hechizo.efectoSonoro}`);
        audio.play();
      });
      listItem.appendChild(playBtn);
    }

    const eliminar = document.createElement('button');
    eliminar.textContent = 'Eliminar';
    eliminar.addEventListener('click', () => eliminarHechizo(i));
    listItem.appendChild(eliminar);

    listaInventario.appendChild(listItem);
  }
}

// Seleccionar hechizo prediseñado
function SelectHechizo() {
  const numberInput = document.createElement('input');
  numberInput.type = 'number';
  numberInput.placeholder = 'Introduce el número del hechizo que deseas realizar';

  const confirmar = document.createElement('button');
  confirmar.textContent = 'Confirmar';
  confirmar.addEventListener('click', () => {
    const numeroHechizo = parseInt(numberInput.value);
    const hechizo = buscarHechizo(numeroHechizo);
    if (hechizo) {
      hechizosElegidos.push(hechizo);
      mostrarMensaje(`Has elegido ${hechizo.nombre}. ${hechizo.invocacion}`);
      mostrarInventario();
      guardarLS();
    } else {
      mostrarMensaje('No se encontró ningún hechizo con ese número. Por favor, introduce un número válido.');
    }
    numberInput.value = '';
  });

  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerHTML = '';
  mensajeDiv.appendChild(numberInput);
  mensajeDiv.appendChild(confirmar);

  mostrarInventario();
}

// Mostrar formulario para crear hechizo personalizado
function customHechizo() {
  personalizacionDiv.innerHTML = `
    <label for="nombre-hechizo">Nombre del hechizo:</label>
    <input type="text" id="nombre-hechizo" name="nombre-hechizo" placeholder="Nombre del hechizo">
    <br>
    <label for="invocacion-hechizo">Invocación del hechizo:</label>
    <input type="text" id="invocacion-hechizo" name="invocacion-hechizo" placeholder="Invocación del hechizo">
    <br>
    <button id="guardar-personalizacion">Guardar</button>
  `;

  const guardar = document.getElementById('guardar-personalizacion');
  guardar.addEventListener('click', crearHechizoPersonalizado);
}

// Eventos botones
elegirEchizo.addEventListener('click', SelectHechizo);
personalizarHechizo.addEventListener('click', customHechizo);
