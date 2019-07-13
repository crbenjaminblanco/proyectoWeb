const {Schema, model} = require('mongoose'); //Requerimos la clase Schema y el método model.

const RecipeSchema = new Schema({ //Esquema o modelo para los datos de las recetas.
    title: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    imagePath: {type: String, required: true}, //para las imagenes solo guardamos la dirección.
    created_at: {type: Date, default: Date.now} 
});

module.exports = model('Recipe', RecipeSchema);