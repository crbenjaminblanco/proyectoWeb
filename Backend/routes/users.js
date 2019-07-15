const express = require('express');
const router = express.Router();    
var path = require('path');
const User = require('../models/User');

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (name.length <= 0) { errors.push({text: 'Please insert your name'}); }
    if (email.length <= 0) { errors.push({text: 'Please insert your email'}); }
    if (password.length <= 0) { errors.push({text: 'Please insert your password'}); }
    if (confirm_password.length <= 0) { errors.push({text: 'Please insert your password confirmation'}); }
    
    if (password != confirm_password) { errors.push({text: 'Password do not match'}); }
    if (password.length < 4) { errors.push({text: 'Password must be at least 4 characters'}); }

    if (errors.length > 0) {
        res.render('signup', {errors, name, email, password, confirm_password}); // TODO: volver a mostrar la pagina con la lista de errores. 2:11:55 del video. Ver 2:17:12
        //res.redirect('/signup', errors);
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Success!');
        res.redirect('/signin');
    }
});

module.exports = router;