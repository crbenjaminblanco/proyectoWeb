const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/signin', (req, res) => {
    res.sendFile(path.resolve('Backend/public/signin.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('Backend/public/signup.html'));
});

module.exports = router;