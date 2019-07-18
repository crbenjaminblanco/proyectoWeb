/** Clase con metodos para reutilizar. */
class SRecipesService {

    /**
     * Constructor tipico de una clase que se ejecuta
     * cuando la clase se instancia.   
     */
    constructor() {
        this.URI = 'http://localhost:3000/api/sharedRecipes'; // Direccion de donde esta mi API.
    }

    /**
     * Este metodo hace una peticion get a localhost:3000/api/sharedRecipes
     * para obtener datos.
     * Esto puede tardar tiempo por lo que se hace el metodo async.
     */
    async getRecipe() { 
        const response = await fetch(this.URI); // Peticion get al backend que devuelve string.
        const recipes = await response.json();  // Conversion de ese string a JSON.
        return recipes;
    }
}

export default SRecipesService;