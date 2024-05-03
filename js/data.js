// VARIABLES
const necronomicon = []
const hechizosElegidos=[]
const mapaHechizos=new Map()

// Objetos
class Hechizo{
    constructor(numero,nombre,invocacion){
        this.numero=numero
        this.nombre=nombre
        this.invocacion=invocacion
    }
}

// Fecth
fetch('../db/data.json')
.then(response=>{
    if (!response.ok){
        throw new Error('Error al cargar los datos. Estado de respuesta: '+response.status)
    }
    return response.json()
})
.then(data=>{
    try{
        return data.map(item=>new Hechizo(item.numero,item.nombre,item.invocacion))
    }catch(error){
        console.error('Error al procesar los datos: ',error)
    }
})
.then(processedData=>{
    necronomicon.push(...processedData)
    mostrarInventario()
})
.catch(error=>{
    console.error('Error en la carga de datos: ',error)
})
.finally(()=>{
    console.log('Operación de carga de datos finalizada.')
})

// LocalStorage
function guardarLS() {
    localStorage.setItem('hechizosElegidos', JSON.stringify(hechizosElegidos))
}

// Cargar inventario desde LocalStorage al cargar la página
function cargarLS(){
    const hechizosElegidosGuardados=JSON.parse(localStorage.getItem('hechizosElegidos'))
    if(hechizosElegidosGuardados){
        hechizosElegidos.push(...hechizosElegidosGuardados)
        mostrarInventario()
    }
}
cargarLS()

// Eliminar un hechizo del inventario y actualizar LocalStorage
function eliminarHechizo(index) {
    hechizosElegidos.splice(index,1)
    mostrarInventario()
    guardarLS()
}

// Buscar Hechizo por número
function buscarHechizo(numero){
    if (necronomicon.length===0){
        console.error('Necronomicon array is empty. Data may not have been fetched yet.')
        return null
    }
    return necronomicon.find(hechizo=>hechizo.numero===numero)
}