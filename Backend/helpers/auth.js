const helpers = {};

helpers.isAuthenticated = (req, res, next) => { //Esto revisa si hay una sesion activa.
    if (req.isAuthenticated()) { //isAthenticated => Passport
        return next();
    }
    req.flash('error_msg', 'Not Authorized. You have to login first.');
    res.redirect('/signin');
};

module.exports = helpers;