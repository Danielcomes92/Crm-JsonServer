import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js';

(function() {
    
    //campos del formulario
    const nombreInput = document.querySelector('#nombre');
    const empresaInput = document.querySelector('#empresa');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const idInput = document.querySelector('#id');


        document.addEventListener('DOMContentLoaded', async () => {
            const parametrosURL = new URLSearchParams(window.location.search);
            const idCliente = parseInt(parametrosURL.get('id'));
            const cliente = await obtenerCliente(idCliente);
            
            mostrarCliente(cliente);

            //submit al formulario
            const formulario = document.querySelector('#formulario');
            formulario.addEventListener('submit', validarCliente);
        });

        function mostrarCliente(cliente) {
            const {nombre, empresa, telefono, email, id} = cliente;

            nombreInput.value = nombre;
            emailInput.value = email;
            empresaInput.value = empresa;
            telefonoInput.value = telefono;
            idInput.value = id;
        }

        function validarCliente(e) {
            e.preventDefault();
            
            const cliente = {
                nombre: nombreInput.value,
                email: emailInput.value,
                telefono: telefonoInput.value,
                empresa: empresaInput.value,
                id: parseInt(idInput.value)
            }
   
            if(validar(cliente)) {
                mostrarAlerta('todos los campos son obligatorios');
                return;
            }

            //reescribe el objeto
            editarCliente(cliente);


        }

})();