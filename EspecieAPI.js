// 1. Obtener los datos del formularios
// 2. Conectarnos a la ruta de la API
// 3. Mostrar los mensajes correspondientes.

class EspecieAPI {

    // Metodo guardar especie
    async guardarEspecie() {
        // paso 1
        //TO DO: validar datos
        const alertError = document.getElementById('alert-especie');
        const formEspecie = document.getElementById('form-especie');
        const nombre = document.getElementById('nombre').value;
        const especie = document.getElementById('especie').value;
        const edad = parseInt(document.getElementById('edad').value);
        const pesoPromedio = parseFloat(document.getElementById('peso-promedio').value);

        if (nombre === '' || especie === '' || edad === '' || edad === '') {
            alertError.innerHTML = `<div class="alert alert-danger" role="alert">Todos los campos son obligatorios!</div>`
            setTimeout(() => {
                alertError.innerHTML = "";
            }, 3000);
            return
        }

        if (this.validarDatos(nombre) === false || this.validarDatos(especie) === false) {
            if (this.validarDatos(nombre) === false) {
                alertError.innerHTML = `<div class="alert alert-danger" role="alert">El nombre solo puede contener letras!</div>`
            }
            if (this.validarDatos(especie) === false) {
                alertError.innerHTML = `<div class="alert alert-danger" role="alert">La clasificacion solo puede contener letras!</div>`
            }
            setTimeout(() => {
                alertError.innerHTML = "";
            }, 3000);
            return
        }

        // Crear Json con los datos anteriores
        const datos = {
            nombre: nombre,
            especie: especie,
            edad: edad,
            peso_promedio: pesoPromedio
        }

        const response = await fetch(
            "https://vet-node.fly.dev/crear_especies",
            "http://localhost:8080/crear_especies",
            {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }

            }
        );
        //TO DO: gestionar mensaje de error de la API

        //TO DO: Mostrar mensaje de exito        
        alertError.innerHTML = `<div class="alert alert-success" role="alert">Especie creada con exito!</div>`
        formEspecie.reset();
        setTimeout(() => {
            alertError.innerHTML = "";
        }, 3000);

    }

    //1. Conectarnos a la ruta /listar_especies.
    // 2. Recorrer el Json
    // 2.1 Agregar una fila en la tabla por cada objeto retornado en Json.
    async listarEspecie() {
        // Paso 1.
        // TO DO: La API no deberia estar sin proteccion
        // let especies = await fetch("http://localhost:8080/listar_especies");
        let especies = await fetch("https://vet-node.fly.dev/listar_especies");
        especies = await especies.json();
        const miTabla = document.getElementById('table-especies')

        // Paso 2: recorrer el Json

        especies.forEach(
            (especie) => {
                const fila = miTabla.insertRow()
                fila.insertCell().innerText = especie.id_especie;
                fila.insertCell().innerText = especie.nombre;
                fila.insertCell().innerText = especie.especie;
                fila.insertCell().innerText = especie.edad;
                fila.insertCell().innerText = especie.peso_promedio;
            });
    }

    validarDatos(data) {
        console.log(data);
        let reg = new RegExp('[a-zA-Z]');
        console.log(reg);
        console.log(reg.test(data));
        return reg.test(data);
    }

}
//Convertir la clase en un modulo
export default EspecieAPI;