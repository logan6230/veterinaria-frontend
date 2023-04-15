import EspecieAPI from "./EspecieAPI.js";

const miEspecie = new EspecieAPI();

const btnProcesar = document.getElementById('btn-procesar');

btnProcesar.addEventListener('click',
    async (event) => {
        event.preventDefault();
        btnProcesar.disabled = true;
        await miEspecie.guardarEspecie();
        setTimeout(() => {
            btnProcesar.disabled = false;
        }, 3000);
    }
)