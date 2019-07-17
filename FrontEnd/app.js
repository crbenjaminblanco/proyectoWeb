require('./styles/app.css');

import UI from './UI';
import globals from './globals';

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
    const shared = document.getElementById('publicRadio').checked;


    console.log(title, ingredients, instructions, image, shared);    

    // Los datos de la receta se quieren enviar por post, pero este metodo en RecipeService
    // solo recibe un objeto por parametro, por lo tanto se crea un Formdata para poder enviarlo a partir
    // de los datos recopilados por getElementById de arriba.
    const formData = new FormData(); // Es un formulario virtual de JS.
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);    
    formData.append('shared', shared);

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

// Editar datos. 
document.getElementById('recipes-cards').addEventListener('click', e => {
    // Quiero comprobar que solo capture el click en el boton de delete.
    if (e.target.classList.contains('edit')) { // Para que solo capture el evento que tiene un delete. 
        //console.log(e.target.getAttribute('_id'));
        const ui = new UI();
        ui.renderEditModal(e.target.getAttribute('_id')); // Se encarga de eliminar   
        globals.globalRecipeId = e.target.getAttribute('_id');
        console.log(globals.globalRecipeId);
    }
   // e.preventDefault(); //Lo tenia delete
});

/*
// Cuando se le da al boton del modal, es como si fuera submit del formulario.
document.getElementById('saveModal').addEventListener('click', e => {
        document.getElementById("modal-recipe-form").submit(); 
});
*/

document.getElementById('modal-recipe-form').addEventListener('submit', e => {
        const title = document.getElementById('modalTitle').value;
        const ingredients = document.getElementById('modalIngredients').value;
        const instructions = document.getElementById('modalInstructions').value;
        const image = document.getElementById('modalImage').files;
        const shared = document.getElementById('modalPublicRadio').checked;
    
        console.log(title); 
        console.log(ingredients);
        console.log(instructions);
        console.log(image);
        console.log(shared);   

        const formData = new FormData(); // Es un formulario virtual de JS.
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);    
        formData.append('shared', shared);
    
        const ui = new UI();
        /*Como seguia*/
        ui.editRecipe(globals.globalRecipeId, formData); 
        ui.renderMessage('Recipe Edited', 'success', 2000); 
});

document.getElementById('image').addEventListener('change', e => {
    // Hacer que aparezca el titulo.
    const labelImage = document.getElementById('labelImage');
    const image = document.getElementById('image').files;
    // Elimina el path.
    var fileName = image[0].name;
    fileName = fileName.split(/(\\|\/)/g).pop();
    labelImage.innerHTML = fileName;
});

document.getElementById('modalImage').addEventListener('change', e => {
    // Hacer que aparezca el titulo.
    const labelImage = document.getElementById('modalLabelImage');
    const image = document.getElementById('modalImage').files;
    // Elimina el path.
    var fileName = image[0].name;
    fileName = fileName.split(/(\\|\/)/g).pop();
    labelImage.innerHTML = fileName;
});