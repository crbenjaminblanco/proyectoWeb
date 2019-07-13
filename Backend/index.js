const express = require('express'); //Se utiliza el framework express de node.
const morgan = require('morgan'); //Nos permite ir viendo por consola lo que las aplicaciones 
                                  //cliente piden.
const multer = require('multer'); //Este modulo nos sirve para procesar imágenes.
const path = require('path'); //A traves de este modulo se le dice a la app the utilice la
                              //dirección actual de nuestro proyecto.


//Inicializaciones
const app = express();
require('./database');

//Configuracion
app.set('port', 3000);

//Middlewares
app.use(morgan('dev')); //Usamos morgan como una funcion ya que todos los middlewares de express son funciones.
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), //en esta dir se guardan las imagenes.
    filename(req, file, cb){ //nombre para los archivos de las imagenes.
        cb(null, new Date.getTime() + path.extname(file.originalname));
    } 
})
app.use(multer({storage}).single('image')); //usamos el middleware multer, con su config respectiva en la
                                     //la propiedad storage y usamos el metodo single para indicar que
                                     //las imagenes que suban los usuarios se suben de una en una.

app.use(express.urlencoded({extended: false})); //Este middleware nos ayuda cuando tenemos un
                                                //formulario en el front-end que envía datos.
                                                //permite interpretar los datos del formulario como JSON.

app.use(express.json()); //Para entender las peticiones JSON que le hagan al servidor sin ningun formulario.

//Rutas
app.use('/api/recipes', require('./routes/recipes')); //Las rutas del servidor proporcionaran rest APIs.

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public'))); //Envia archivos estaticos 
                                                         //(imagenes, css, html, js, etc).


// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
});