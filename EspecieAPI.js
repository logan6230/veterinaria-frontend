// 1. Obtener los datos del formularios
// 2. Conectarnos a la ruta de la API
// 3. Mostrar los mensajes correspondientes.

class EspecieAPI {

    // Metodo guardar especie
    async guardarEspecie() {
        // paso 1
        //TO DO: validar datos
        const nombre = document.getElementById('nombre').value;
        const clasificacion = document.getElementById('clasificacion').value;
        const edad = document.getElementById('edad').value;
        const pesoPromedio = parseFloat(document.getElementById('peso-promedio').value);

        if (nombre === '' || clasificacion === '' || edad === '' || edad === '') {

        }
        // Crear Json con los datos anteriores

        const datos = {
            nombre: nombre,
            clasificacion: clasificacion,
            edad: edad,
            peso_promedio: pesoPromedio
        }

        //TO DO: Validar datos y gestionnar errores
        await fetch(
            "http://localhost:3000/crear_especies",
            {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }

            }
        )
    }

    //1. Conectarnos a la ruta /listar_especies.
    // 2. Recorrer el Json
    // 2.1 Agregar una fila en la tabla por cada objeto retornado en Json.
    async listarEspecie() {
        // Paso 1.
        // TO DO: La API no deberia estar sin proteccion
        let especies = await fetch("http://localhost:3000/listar_especies");
        especies = await especies.json();
        const miTabla = document.getElementById('table-especies')

        // Paso 2: recorrer el Json

        especies.forEach(
            (especie) => {
                const fila = miTabla.insertRow()
                fila.insertCell().innerText = especie.id_especie;
                fila.insertCell().innerText = especie.nombre;
                fila.insertCell().innerText = especie.clasificacion;
                fila.insertCell().innerText = especie.esperanza_vida;
                fila.insertCell().innerText = especie.peso_promedio;
            });
    }
}
//Convertir la clase en un modulo
export default EspecieAPI;