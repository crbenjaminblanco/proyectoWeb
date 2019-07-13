
require('./styles/app.css');

import RecipeService from './services/RecipeService'; // Podemos hacer esto gracias a Webpack.

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

    const recipeService = new RecipeService();
    recipeService.postRecipe(formData);

    e.preventDefault(); // Cuando se envia el formulario ya no se reinicia.

});