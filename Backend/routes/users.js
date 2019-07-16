const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/myRecipes', //si la autenticación se dio con exito, se redirecciona a la pantalla principal.
    failureRedirect: '/signin', //si la autenticacion fallo, se redirecciona a la pantalla de signin.
    failureFlash: true
}));

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
        res.render('signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use. Please try with another email.');
            res.redirect('/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registered successfully!');
            res.redirect('/signin');
        }
    }
});

router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/');
});

module.exports = router;