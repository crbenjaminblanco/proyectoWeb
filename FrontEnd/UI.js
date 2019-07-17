
import RecipeService from './services/RecipeService'
const recipeService = new RecipeService();

import { format } from 'timeago.js';

/**
 * El objetivo de esta clase es interactuar con el navegador.
 */
class UI {
    /**
     * Metodo para renderizar las recetas en pantalla.
     */
    async renderRecipes() {
        const recipes = await recipeService.getRecipe();
        const recipesCardContainer = document.getElementById('recipes-cards'); // Contenedor donde se va a renderizar.
        recipesCardContainer.innerHTML = ''; // Verifico que este limpio.
        recipes.forEach(recipe => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000${recipe.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h3 class="card-title mt-1">${recipe.title}</h3> 
                                <h5>Ingredients:</h5>
                                <p class="card-text">${recipe.ingredients}</p>
                                <h5>Instructions:</h5>
                                <p class="card-text">${recipe.instructions}</p>
                                <a href="#" class="btn btn-primary delete" _id="${recipe._id}" style="max-width:3.9rem; width:3.9rem;">
                                    <h3 class="delete" _id="${recipe._id}">🗑</h3>
                                </a>
                                <a href="#" class="btn btn-success edit" data-toggle="modal" data-target="#myModal" _id="${recipe._id}" style="max-width:3.9rem; width:3.9rem;" > 
                                    <h3 class="edit" _id="${recipe._id}">🖊</h3>
                                </a>

                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(recipe.created_at)}
                    </div>
                </div>
            `; // Que va a tener adentro.
            recipesCardContainer.appendChild(div);
        });
    }

    /**
    * Obtiene el id de la receta que selecciono el usuario, busca el id de esa receta
    * en la base de datos y llena el edit modal con los valores de la receta que se va a editar.
    */
    async renderEditModal(id) {
        const recipes = await recipeService.getRecipe();
        recipes.forEach(recipe => {
            if (id == recipe._id) {
                const modalTitle = document.getElementById('modalTitle');
                modalTitle.value = recipe.title;
                const modalIngredients = document.getElementById('modalIngredients');
                modalIngredients.value = recipe.ingredients;
                const modalInstructions = document.getElementById('modalInstructions');
                modalInstructions.value = recipe.instructions;
                if (recipe.shared == false) {
                    const modalPrivateRadio = document.getElementById('modalPrivateRadio');
                    modalPrivateRadio.checked = true;
                    const modalPublicRadio = document.getElementById('modalPublicRadio');
                    modalPublicRadio.checked = false;
                }

            }
        });
    }

    /**
     * Metodo para agregar una nueva receta.
     */
    async addNewRecipe(recipe) {
        await recipeService.postRecipe(recipe);
        this.clearRecipeForm();
        this.renderRecipes();
    }

    /**
     * Metodo para limpiar el formulario y lo resetea.
     */
    clearRecipeForm() {
        document.getElementById('recipe-form').reset();
    }

    /**
     * Metodo para renderizar un msj.
     */
    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const recipeForm = document.querySelector('#recipe-form');

        container.insertBefore(div, recipeForm); // Coloca el msj entre el form y el col-md-4.
        setTimeout(() => {
            document.querySelector('.message').remove(); // Todos los elementos que tengan clase "message" seran removidos.
        }, secondsToRemove);
    }

    /**
     * Eliminar un elemento de la pantalla.
     */
    async deleteRecipe(recipeId) {
        await recipeService.deleteRecipe(recipeId);
        this.renderRecipes();
    }

    /**
     * Metodo para editar un elemento.
     */
    async editRecipe(recipeId, recipe) {
        await recipeService.editRecipe(recipeId, recipe); 
    }
}

export default UI;