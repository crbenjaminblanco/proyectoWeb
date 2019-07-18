import SRecipesService from './services/SRecipesService';
const sRecipesService = new SRecipesService();

import { format } from 'timeago.js';
  
/**
 * Metodo para renderizar las recetas publicas en pantalla.
 */
class homeUI {

    async renderSharedRecipes() {
        const recipes = await sRecipesService.getRecipe();
        const recipesCardContainer = document.getElementById('home-recipes-cards'); // Contenedor donde se va a renderizar.
        recipesCardContainer.innerHTML = ''; // Verifico que este limpio.
        
        const div = document.createElement('div');
        div.className = '';
        div.innerHTML = '';

        var hasOne=false;

        recipes.forEach(recipe => {
            hasOne=true;
            div.innerHTML += `
                <div class="card " id="div_${recipe._id}">
                    <div class="row">
                        <div class="col-md-4 ml-md-0">
                            <img src="http://localhost:3000${recipe.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8 mr-md-0"">
                            <div class="card-block px-2">
                                <h3 class="card-title mt-1">${recipe.title}</h3> 
                                <h5>Ingredients:</h5>
                                <p class="card-text">${recipe.ingredients}</p>
                                <h5>Instructions:</h5>
                                <p class="card-text">${recipe.instructions}</p>
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
        });
        recipesCardContainer.appendChild(div);

        if (!hasOne) { // Si no se encontro un resultado.
            document.getElementById('titleResults').innerHTML = "No recipes found.";
        } else { // Resetea.
            document.getElementById('titleResults').innerHTML = "Recipes shared by our users";
        }
    }

    async searchRecipes(line) {
        const recipes = await sRecipesService.getRecipe();
        const recipesCardContainer = document.getElementById('home-recipes-cards'); // Contenedor donde se va a renderizar.
        recipesCardContainer.innerHTML = ''; // Verifico que este limpio.
        
        const div = document.createElement('div');
        div.className = '';
        div.innerHTML = '';
        
        var hasOne = false;

        recipes.forEach(recipe => {
            console.log(recipe.title);
            var titleMinus = recipe.title.toLowerCase();
            var ingredientsMinus = recipe.ingredients.toLowerCase();
            var instructionsMinus = recipe.instructions.toLowerCase();

            if (titleMinus.indexOf(line) >= 0 || ingredientsMinus.indexOf(line) >= 0  || instructionsMinus.indexOf(line) >= 0) {
                hasOne = true;
                div.innerHTML += `
                    <div class="card " id="div_${recipe._id}">
                        <div class="row">
                            <div class="col-md-4 ml-md-0">
                                <img src="http://localhost:3000${recipe.imagePath}" alt="" class="img-fluid" />
                            </div>
                            <div class="col-md-8 mr-md-0"">
                                <div class="card-block px-2">
                                    <h3 class="card-title mt-1">${recipe.title}</h3> 
                                    <h5>Ingredients:</h5>
                                    <p class="card-text">${recipe.ingredients}</p>
                                    <h5>Instructions:</h5>
                                    <p class="card-text">${recipe.instructions}</p>
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
            }
        });
        recipesCardContainer.appendChild(div);

        if (!hasOne) { // Si no se encontro un resultado.
            document.getElementById('titleResults').innerHTML = "No recipes found.";
        } else { // Resetea.
            document.getElementById('titleResults').innerHTML = "Recipes shared by our users";
        }
    }
}

export default homeUI;