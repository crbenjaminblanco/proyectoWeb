const express = require('express');
const router = express.Router();   

router.get('/myRecipes', (req, res) => {
    res.render('myRecipes');
});

router.post('/myRecipes', (req, res) => {
    res.render('myRecipes');
});

router.delete('/myRecipes:id', (req, res) => {
    res.render('myRecipes');
});

module.exports = router;