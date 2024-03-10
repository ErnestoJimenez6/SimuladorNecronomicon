// Array de hechizos
const necronomicon=[
    {numero:1,nombre:"Invocar a Cthulhu",invocacion:"¡Cthulhu ha despertado!"},
    {numero:2,nombre:"Abrir un portal a otra dimensión",invocacion:"¡Se ha abierto un portal a otra dimensión!"},
    {numero:3,nombre:"Invocar a los muertos",invocacion:"¡Los muertos han respondido a tu llamado!"}
    // Agregar mas hechizos
]

// Buscar hechizos por número
function buscarHechizo(numero){
    for(let hechizo of necronomicon){
        if(hechizo.numero===numero){
            return hechizo
        }
    }
    return null
}

// Función principal
function simuladorNecronomicon(){

    let mensaje="Bienvenido al Necronomicón. ¿Quieres realizar un hechizo?\n"
    for(let hechizo of necronomicon){
        mensaje+=`${hechizo.numero}: ${hechizo.nombre}\n`
    }
    mensaje+="Introduce un número o escribe 'salir' para terminar:"

    while(true){
        const entrada=prompt(mensaje).toLowerCase()

        if(entrada===null){
            alert("Nos volveremos a ver")
            break
        }

        if(entrada.toLowerCase()==="salir"){
            alert("Nos volveremos a ver")
            break;
        }

        const numeroHechizo=parseInt(entrada);
        if(isNaN(numeroHechizo)){
            alert("Por favor, introduce un número válido.")
            continue
        }

        const hechizo=buscarHechizo(numeroHechizo);
        if(hechizo){
            const confirmacion=confirm(`Has elegido ${hechizo.nombre}. ${hechizo.invocacion} ¿Deseas elegir otro hechizo?`)
            if(!confirmacion){
                alert("Nos volveremos a ver")
                break
            }
        }else{
            alert("No se encontró ningún hechizo con ese número. Por favor, introduce un número válido.")
        }
    }
}

// Ejecutar la función principal
simuladorNecronomicon()