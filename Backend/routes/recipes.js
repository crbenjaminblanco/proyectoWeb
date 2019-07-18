const { Router } = require('express');
const router = Router(); // Este enrutador sirve para definir las rutas del servidor.
const {unlink} = require('fs-extra');
const path = require('path');

const Recipe = require('../models/Recipe');
const { isAuthenticated } = require('../helpers/auth');

router.get('/', isAuthenticated, async (req, res) => { // Con get recuperamos todas las recetas.
    const recipes = await Recipe.find({user: req.user.id}); //Este find busca todas las recetas de la base de datos asociadas a un user.
                        // Es como un select * en SQL.
    res.json(recipes);
});

router.get('/:id', isAuthenticated, async (req, res) => { // Con get recuperamos todas las recetas.
    const recipeById = await Recipe.findById(req.params.id); //Este find busca una receta por id.
    res.json(recipeById);
});

router.post('/', isAuthenticated, async(req, res) => { // Utilizamos post para enviar nuevas recetas.
    const { title, ingredients, instructions, shared} = req.body; //req body es lo que se recibe en el post.
    const imagePath = '/uploads/' + req.file.filename; // Para guardar la imagen.
    const newRecipe = new Recipe({title, ingredients, instructions, imagePath, shared}); // Creamos una nueva receta con el modelo.
    newRecipe.user = req.user.id;
    await newRecipe.save(); // Se guarda la receta en la base de datos MongoDB.
    res.json({message: 'Recipe saved'});
});

router.delete('/:id', isAuthenticated, async (req, res) => { // Usamos delete para borrar una receta utilizando su id.
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./Backend/public' + recipe.imagePath)); // Modulo fs-extra que maneja archivos para eliminar las imagenes que quedan en el proyecto.
    res.json({message: 'Recipe deleted'});
});

router.put('/:id', isAuthenticated, async(req, res) => { // Actualiza una receta utilizando su id.
    const oldRecipeImg = await Recipe.findById(req.params.id);
    unlink(path.resolve('./Backend/public' + oldRecipeImg.imagePath)); // Modulo fs-extra que maneja archivos para eliminar las imagenes que quedan en el proyecto.

    const { title, ingredients, instructions, shared} = req.body; // req body es lo que se recibe en el post.
    const imagePath = '/uploads/' + req.file.filename; // Para guardar la imagen.

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { 
        $set: {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            imagePath: imagePath,
            shared: shared
        }
    });
    res.json({message: 'Recipe updated.'});
});

module.exports = router;