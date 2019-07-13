const mongoose = require('mongoose'); //nos permite conectarnos con MongoDB.
                                     // es necesario tener MongoDB instalado, en Windows el servicio
                                     //de MongoDB Server corre automáticamente después de la instalación.

mongoose.connect('mongodb://localhost/javascriptdb', { //indica la base de datos a la que nos vamos
    useNewUrlParser: true                              // a conectar, si no existe, la crea.
})
    .then(db => console.log('DB is connected'))     //si se conecta satisfactoria mente lo indica en consola.
    .catch(err => console.error(err));              //si da error también lo indica.