const { Router } = require('express');
const router = Router(); //Este enrutador sirve para definir las rutas del servidor.

const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => { //Con get recuperamos todas las recetas.
    const recipes = await Recipe.find() //Este find busca todas las recetas de la base de datos. 
                        //Es como un select * en SQL.
    res.json(recipes);
});

router.post('/', async(req, res) => { //Utilizamos post para enviar nuevas recetas.
    const { title, ingredients, instructions } = req.body; //req body es lo que se recibe en el post.
    const newRecipe = new Recipe({title, ingredients, instructions}); //creamos una nueva receta con el modelo.
    console.log(newRecipe);
    await newRecipe.save(); //Se guarda la receta en la base de datos MongoDB.
    res.json({message: 'Recipe saved'});
});

router.delete('/:id', async (req, res) => { //Usamos delete para borrar una receta utilizando su id.
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    console.log(recipe);
    res.json({message: 'Recipe deleted'});
});

module.exports = router;