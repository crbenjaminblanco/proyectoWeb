
require('./styles/app.css');

import UI from './UI';

// Evento: Una vez el navegador haya pintado la interfaz (DOM haya sido cargado) me traigo los datos desde el backend.
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderRecipes();
});

// Aqui se obtiene por el id del formulario todos los datos que ingresa el usuario a traves de los inputs del Form en el index.html.
document.getElementById('recipe-form')
    .addEventListener('submit', e => { // Funcion flecha.
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('image').files;

    console.log(title, ingredients, instructions, image);

    // Los datos de la receta se quieren enviar por post, pero este metodo en RecipeService
    // solo recibe un objeto por parametro, por lo tanto se crea un Formdata para poder enviarlo a partir 
    // de los datos recopilados por getElementById de arriba.
    const formData = new FormData(); // Es un formulario virtual de JS.
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);

    const ui = new UI();
    ui.addNewRecipe(formData);
    ui.renderMessage('New Recipe Added', 'success', 3000);

    e.preventDefault(); // Cuando se envia el formulario ya no se reinicia.

});

// Eliminar datos.
document.getElementById('recipes-cards').addEventListener('click', e => {
    // Quiero comprobar que solo capture el click en el boton de delete.
    if (e.target.classList.contains('delete')) { // Para que solo capture el evento que tiene un delete. 
        //console.log(e.target.getAttribute('_id'));
        const ui = new UI();
        ui.deleteRecipe(e.target.getAttribute('_id')); // Se encarga de eliminar
        ui.renderMessage('Recipe Removed', 'danger', 2000);
    }
    e.preventDefault();
});

document.getElementById('')

    /*Hacer que aparezca el titulo*/
    const image = document.getElementById('image').files;
