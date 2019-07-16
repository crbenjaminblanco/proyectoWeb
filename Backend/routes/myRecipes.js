const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

router.get('/myRecipes', isAuthenticated, (req, res) => {
    res.render('myRecipes');
});

module.exports = router;