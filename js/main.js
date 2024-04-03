// Guardar los datos en localStorage
function guardarLS(){
    // Convertir el arreglo de objetos a una cadena de texto
    let serializedNecronomicon=""
    for(let hechizo of necronomicon){
        serializedNecronomicon+=`${hechizo.numero}, ${hechizo.nombre}, ${hechizo.invocacion};`
    }
    localStorage.setItem('necronomicon',serializedNecronomicon)
}

// Cargar los datos desde localStorage
function cargarLS(){
    const necronomiconGuardado=localStorage.getItem('necronomicon')
    if(necronomiconGuardado){
        // Convertir la cadena de texto de vuelta a un arreglo de objetos
        const hechizosGuardados=necronomiconGuardado.split(';')
        for (let hechizoString of hechizosGuardados){
            const[numero,nombre,invocacion]=hechizoString.split(',')
            necronomicon.push(new Hechizo(parseInt(numero),nombre,invocacion))
        }
    }
}

// Objetos
class Hechizo{
    constructor(numero,nombre,invocacion){
        this.numero=numero
        this.nombre=nombre
        this.invocacion=invocacion
    }
}

const necronomicon=[
    new Hechizo(
        1,
        "Invocar a Cthulhu",
        "¡Cthulhu ha despertado!"
    ),
    new Hechizo(
        2,
        "Abrir un portal a otra dimensión",
        "¡Se ha abierto un portal a otra dimensión!"
    ),
    new Hechizo(
        3,
        "Invocar a los muertos",
        "¡Los muertos han respondido a tu llamado!"
    ),
    new Hechizo(
        4,
        "Maldición de los ancestros",
        "¡Las sombras de los ancestros te acompañan!"
    ),
    new Hechizo(
        5,
        "Escudo de Oscuridad",
        "¡Te rodea una barrera de oscuridad impenetrable!"
    ),
    new Hechizo(
        6,
        "Despertar del Fuego Infernal",
        "¡Las llamas del abismo arden a tu voluntad!"
    ),
    new Hechizo(
        7,
        "Súplica a Nyarlathotep",
        "¡Nyarlathotep, el mensajero de los dioses, escucha tu llamado!"
    ),
    new Hechizo(
        8,
        "Bendición de Azathoth",
        "¡La locura de Azathoth te otorga su protección!"
    ),
    new Hechizo(
        9,
        "Maldición del Vacío",
        "¡El vacío devora tu enemigo desde dentro!"
    ),
    new Hechizo(
        10,
        "Círculo de Protección Arcano",
        "¡Un círculo de poder te rodea, protegiéndote de las fuerzas malignas!"
    )
]

function buscarHechizo(numero){
    return necronomicon.find(hechizo=>hechizo.numero===numero)
}

function mostrarMensaje(mensaje){
    const mensajeDiv=document.getElementById("mensaje")
    mensajeDiv.textContent=mensaje
}

function mostrarInventario(){
    const listaInventario=document.getElementById("lista-inventario")
    listaInventario.innerHTML = ""
    for(let hechizo of hechizosElegidos){
        const listItem=document.createElement("li")
        listItem.textContent=`${hechizo.numero}: ${hechizo.nombre}`
        listaInventario.appendChild(listItem)
    }
}

const hechizosElegidos = []

const chooseNumberButton=document.getElementById("elegir-numero")

chooseNumberButton.addEventListener("click",function(){
    const numberInput=document.createElement("input")
    numberInput.type="number"
    numberInput.placeholder="Introduce el número del hechizo que deseas realizar"
    const confirmButton=document.createElement("button")
    confirmButton.textContent="Confirmar"
    confirmButton.addEventListener("click",function(){
        const numeroHechizo=parseInt(numberInput.value)
        const hechizo=buscarHechizo(numeroHechizo)
        if(hechizo){
            hechizosElegidos.push(hechizo)
            mostrarMensaje(`Has elegido ${hechizo.nombre}. ${hechizo.invocacion}`)
            mostrarInventario()
            setTimeout(function() {
                mensajeDiv.innerHTML = ""
            }, 3000)
        }else{
            mostrarMensaje("No se encontró ningún hechizo con ese número. Por favor, introduce un número válido.")
        }
        numberInput.value=""
    })
    const mensajeDiv=document.getElementById("mensaje")
    mensajeDiv.innerHTML=""
    mensajeDiv.appendChild(numberInput)
    mensajeDiv.appendChild(confirmButton)

    mostrarInventario()
})

const personalizarHechizoButton=document.getElementById("crear-hechizo")

personalizarHechizoButton.addEventListener("click",function(){
    const personalizacionDiv=document.getElementById("personalizacion")
    personalizacionDiv.innerHTML=`
        <label for="nombre-hechizo">Nombre del hechizo:</label>
        <input type="text" id="nombre-hechizo"><br>
        <label for="invocacion-hechizo">Invocación del hechizo:</label>
        <input type="text" id="invocacion-hechizo"><br>
        <button id="guardar-personalizacion">Guardar</button>
    `

    const guardarButton=document.getElementById("guardar-personalizacion")
    guardarButton.addEventListener("click",function(){
        const nombre=document.getElementById("nombre-hechizo").value
        const invocacion=document.getElementById("invocacion-hechizo").value

        const nuevoHechizo=new Hechizo(necronomicon.length+1,nombre, invocacion)
        hechizosElegidos.push(nuevoHechizo)
        mostrarInventario()
        personalizacionDiv.innerHTML="<p>Hechizo personalizado añadido con éxito al Necronomicón.</p>"

        setTimeout(function(){
            personalizacionDiv.innerHTML=""
        },3000)
    })

    mostrarInventario()
})