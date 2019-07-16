// Passport => Ayuda a guardar los datos de una sesión.

const passport = require('passport'); //Manera de autenticar al usuario
const localStrategy = require('passport-local').Strategy; //Estrategia de autenticación
const User = require('../models/User')

passport.use(new localStrategy({
    usernameField: 'email' // <= Atraves de qué se va a autenticar el usuario
}, async (email, password, done) => {
    const user = await User.findOne({email: email}); //Busca en la base de datos
    if (!user) { // Si el correo no existe, devuelve error.
        return done(null, false, {message: 'Not User Found.'});
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect Password.'});
        }
    }
}));

//Si el usuario hace login, se almacena en sesión su ID.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Si existe un usuario en la sesión...
passport.deserializeUser((id, done) => {

    //Busco al usuario por ese ID
    // La busqueda puede dar error, o encontrar al usuario
    User.findById(id, (err, user) => {
        done(err, user);
    });
})