// VARIABLES GLOBALES
const necronomicon = [];
const hechizosElegidos = [];
const mapaHechizos = new Map();

// Clase Hechizo (igual que en main.js)
class Hechizo {
  constructor(numero, nombre, invocacion, nivel = '', tipo = '', efectoSonoro = '') {
    this.numero = numero;
    this.nombre = nombre;
    this.invocacion = invocacion;
    this.nivel = nivel;
    this.tipo = tipo;
    this.efectoSonoro = efectoSonoro;
  }
}

// Cargar datos desde JSON
fetch('./db/array.json')
  .then(response => {
    if (!response.ok) throw new Error('Error al cargar los datos. Estado: ' + response.status);
    return response.json();
  })
  .then(data => {
    try {
      const processedData = data.map(item =>
        new Hechizo(item.numero, item.nombre, item.invocacion, item.nivel, item.tipo, item.efectoSonoro)
      );
      necronomicon.push(...processedData);

      // Carga localStorage después que necronomicon esté listo
      cargarLS();

      // Muestra el inventario (función en main.js)
      mostrarInventario();
    } catch (error) {
      console.error('Error al procesar los datos: ', error);
    }
  })
  .catch(error => console.error('Error en la carga de datos: ', error))
  .finally(() => console.log('Operación de carga de datos finalizada.'));

// Guardar en localStorage
function guardarLS() {
  localStorage.setItem('hechizosElegidos', JSON.stringify(hechizosElegidos));
}

// Cargar desde localStorage
function cargarLS() {
  const hechizosElegidosGuardados = JSON.parse(localStorage.getItem('hechizosElegidos'));
  if (hechizosElegidosGuardados) {
    hechizosElegidos.push(...hechizosElegidosGuardados);
  }
}

// Eliminar hechizo
function eliminarHechizo(index) {
  hechizosElegidos.splice(index, 1);
  mostrarInventario();
  guardarLS();
}

// Buscar hechizo por número
function buscarHechizo(numero) {
  if (necronomicon.length === 0) {
    console.error('Necronomicon vacío, espera que se carguen los datos.');
    return null;
  }
  return necronomicon.find(h => h.numero === numero);
}
