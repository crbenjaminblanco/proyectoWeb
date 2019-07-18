if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); //Este require sirve para leer archivos .env (variables de entorno).
}


const express = require('express'); //Se utiliza el framework express de node.
const morgan = require('morgan'); //Nos permite ir viendo por consola lo que las aplicaciones 
                                  //cliente piden.
const multer = require('multer'); //Este modulo nos sirve para procesar imágenes.
const path = require('path'); //A traves de este modulo se le dice a la app the utilice la
                              //dirección actual de nuestro proyecto.
const cors = require('cors'); //Permite la comunicación entre dos servidores.
const session = require('express-session'); //Permite guardar los datos de los usuarios a traves de una sesión. 
const flash = require('connect-flash'); //Permite enviar mensajes entre multiples vistas.
const exphbs = require('express-handlebars'); //Nos permite usar el motor de plantillas handlebars.
const passport = require('passport'); // Ayuda a guardar los datos de una sesión.
const favicon = require('serve-favicon'); //Para el favicon.

//Inicializaciones
const app = express();
require('./database');
require('./config/passport');

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'public'),
    partialsDir: path.join(__dirname, 'public'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev')); //Usamos morgan como una funcion ya que todos los middlewares de express son funciones.
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), //en esta dir se guardan las imagenes.
    filename(req, file, cb){ //nombre para los archivos de las imagenes.
        cb(null, new Date().getTime() + path.extname(file.originalname));
    } 
})
app.use(multer({storage}).single('image')); //usamos el middleware multer, con su config respectiva en la
                                     //la propiedad storage y usamos el metodo single para indicar que
                                     //las imagenes que suban los usuarios se suben de una en una.

app.use(express.urlencoded({extended: false})); //Este middleware nos ayuda cuando tenemos un
                                                //formulario en el front-end que envía datos.
                                                //permite interpretar los datos del formulario como JSON.

app.use(express.json()); //Para entender las peticiones JSON que le hagan al servidor sin ningun formulario.
app.use(cors()); //Comunicación entre servidores.
app.use(session({ //Configuraciones básicas que permiten almacenar los datos del usuario temporalmente.
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //Variable global que guarda los mensajes de exito de flash.
    res.locals.error_msg = req.flash('error_msg'); //Variable global que guarda los mensajes de error de flash.
    res.locals.error = req.flash('error'); //Variable global que guarda los mensajes de error de flash.
    res.locals.user = req.user || null; // Variable global que almacena al usuario.
    next();
});

//Rutas
app.use('/api/recipes', require('./routes/recipes')); // Las rutas del servidor proporcionaran rest APIs.
app.use('/api/sharedRecipes', require('./routes/sharedRecipes')); //API para recetas compartidas.
app.use(require('./routes/myRecipes'));
app.use(require('./routes/users')); // Rutas para manejar usuarios.
app.use(require('./routes/about')); // Ruta para la pantalla about. 
app.use(require('./routes/features')); // Ruta para la pantalla features. 
app.use(require('./routes/homePage')); // Ruta para la pantalla home.

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public'))); // Envia archivos estaticos 
                                                         // (imagenes, css, html, js, etc).

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
});