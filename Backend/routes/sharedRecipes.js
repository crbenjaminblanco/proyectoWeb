const { Router } = require('express');
const router = Router(); // Este enrutador sirve para definir las rutas del servidor.
const {unlink} = require('fs-extra');
const path = require('path');

const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => { // Con get recuperamos todas las recetas.
    const recipes = await Recipe.find({shared: true}); //Este find busca todas las recetas de la base de datos que estan compartidas.
    res.json(recipes);
});

module.exports = router;