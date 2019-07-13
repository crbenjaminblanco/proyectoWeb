
/**
 * Clase con metodos para reutilizar.
 */
class RecipeService {

    /**
     * Constructor tipico de una clase que se ejecuta
     * cuando la clase se instancia.   
     */
    constructor() {
        this.URI = 'http://localhost:3000/api/recipes'; // Direccion de donde esta mi API.
    }

    /**
     * Este metodo hace una peticion get a localhost:3000/api/recipes
     * para obtener datos.
     * Esto puede tardar tiempo por lo que se hace el metodo async.
     */
    async getRecipe() { 
        const response = await fetch(this.URI); // Peticion get al backend que devuelve string.
        const recipes = await response.json(); // Conversion de ese string a JSON.
        return recipes;
    }

    /**
     * Este metodo envia una peticion post al backend.
     * Debe recibir los datos que se van a enviar al backend para que los guarde.
     * @param {*} recipe 
     */
    async postRecipe(recipe) {
        // En este fetch coloco los header para decirle al backend que es lo que estoy enviando.
        const response = await fetch(this.URI, {
            method: 'POST',
            body: recipe
        });
        const data = await response.json();

        console.log(data);
    }

    /**
     * Este metodo elimina la receta en el backend.
     * Se le manda por parametro el id de la receta para que lo encuentre, igual
     * que en el recipes.js de routes en el backend.
     * Esto porque desde el frontend se debe enviar el id que se quiere eliminar.
     * @param {*} recipeId 
     */
    async deleteRecipe(recipeId) {
        const response = await fetch(`${this.URI}/${recipeId}`, { // Esto lo envia al backend
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();

        console.log(data);
    }
}

export default RecipeService;
