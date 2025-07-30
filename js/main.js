// VARIABLES
const elegirEchizo=document.getElementById('elegir-numero')
const personalizarHechizo=document.getElementById('crear-hechizo')
const personalizacionDiv=document.getElementById('personalizacion')

// Personalización de hechizos y guardar en el inventario
let contHechizosCustom=0

function crearHechizoPersonalizado(){
    const nombre=document.getElementById('nombre-hechizo').value
    const invocacion=document.getElementById('invocacion-hechizo').value
    
    if(!nombre||!invocacion){
        Toastify({
            text:'Por favor, completa todos los campos.',
            duration:3000,
            destination:'../index.html',
            newWindow:false,
            close:true,
            gravity:'top',
            position:'center',
            stopOnFocus:true,
            style:{
                background:'linear-gradient(to right, #212121, #b30000)',
            },
            onClick:function(){}
        }).showToast()
        return
    }

    contHechizosCustom++
    const numHechizoCustom=10+contHechizosCustom
    const nuevoHechizo=new Hechizo(numHechizoCustom,nombre,invocacion)
    hechizosElegidos.push(nuevoHechizo)
    mostrarInventario()
    personalizacionDiv.innerHTML='<p>Hechizo personalizado añadido con éxito al Necronomicón.</p>'
    guardarLS()
}

// mostrar mensajes en el DOM
function mostrarMensaje(mensaje){
    const mensajeDiv=document.getElementById('mensaje')
    mensajeDiv.textContent=mensaje
}

// mostrar hechizos elegidos
function mostrarInventario(){
    const listaInventario=document.getElementById('lista-inventario')
    listaInventario.innerHTML=''
    for(let i=0;i<hechizosElegidos.length;i++){
        const hechizo=hechizosElegidos[i]
        const listItem=document.createElement('li')
        
        const infoHechizo=document.createElement('p')
        infoHechizo.textContent=`${hechizo.numero}: ${hechizo.nombre} [${hechizo.tipo} - ${hechizo.nivel}] - ${hechizo.invocacion}`
        listItem.appendChild(infoHechizo)
        
        const eliminar=document.createElement('button')
        eliminar.textContent='Eliminar'
        eliminar.addEventListener('click',function(){
            eliminarHechizo(i)
        })
        listItem.appendChild(eliminar)

        listaInventario.appendChild(listItem)
    }
}

// seleccionar un hechizo prediseñado
function SelectHechizo(){
    const numberInput=document.createElement('input')
    numberInput.type='number'
    numberInput.placeholder='Introduce el número del hechizo que deseas realizar'
    const confirmar=document.createElement('button')
    confirmar.textContent='Confirmar'
    confirmar.addEventListener('click',function(){
        const numeroHechizo=parseInt(numberInput.value)
        const hechizo=buscarHechizo(numeroHechizo)
        if(hechizo){
            hechizosElegidos.push(hechizo)
            mostrarMensaje(`Has elegido ${hechizo.nombre}. ${hechizo.invocacion}`)
            mostrarInventario()
            guardarLS()
        }else{
            mostrarMensaje('No se encontró ningún hechizo con ese número. Por favor, introduce un número válido.')
        }
        numberInput.value=''
    })
    const mensajeDiv=document.getElementById('mensaje')
    mensajeDiv.innerHTML=''
    mensajeDiv.appendChild(numberInput)
    mensajeDiv.appendChild(confirmar)
    
    mostrarInventario()
}

// personalizar un hechizo
function customHechizo(){
    personalizacionDiv.innerHTML=`
        <label for="nombre-hechizo">Nombre del hechizo:</label>
        <input type="text" id="nombre-hechizo" name="nombre-hechizo" placeholder="Nombre del hechizo">
        <br>
        <label for="invocacion-hechizo">Invocación del hechizo:</label>
        <input type="text" id="invocacion-hechizo" name="invocacion-hechizo" placeholder="Invocación del hechizo">
        <br>
        <button id="guardar-personalizacion">Guardar</button>
    `

    const guardar=document.getElementById('guardar-personalizacion')
    guardar.addEventListener('click',crearHechizoPersonalizado)
}

// guardar un hechizo personalizado
function guardarHechizoPersonalizado(){
    const nombre=document.getElementById('nombre-hechizo').value
    const invocacion=document.getElementById('invocacion-hechizo').value

    const nuevoHechizo=new Hechizo(necronomicon.length++,nombre,invocacion)
    hechizosElegidos.push(nuevoHechizo)
    mostrarInventario()
    personalizacionDiv.innerHTML='<p>Hechizo personalizado añadido con éxito al Necronomicón.</p>'
    guardarLS()
}

elegirEchizo.addEventListener('click',SelectHechizo)
personalizarHechizo.addEventListener('click',customHechizo)
