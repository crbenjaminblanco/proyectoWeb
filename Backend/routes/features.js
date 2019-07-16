const express = require('express');
const router = express.Router();   

router.get('/features', (req, res) => {
    res.render('features');
});

module.exports = router;