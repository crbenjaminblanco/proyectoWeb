const express = require('express');
const router = express.Router();   

router.get('/myRecipes', (req, res) => {
    res.render('myRecipes');
});

module.exports = router;