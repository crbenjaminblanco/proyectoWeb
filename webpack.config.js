
// Webpack tiene la funcion de convertir el codigo de frontend 
// a codigo de HTML, CSS y JavaScript y moverlo a otra carpeta.
// En este caso es a la carpeta "public" en el backend.
// Hay que especificar donde esta el codigo de frontend.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './FrontEnd/app.js', // Aqui se le dice donde esta el archivo principal del proyecto.
    output: { // Aqui se le dice donde se va a colocar el codigo convertido.
        path: path.join(__dirname, 'Backend/public'),
        filename: 'bundle.js' // Nombre del archivo generado.
    }, 

    plugins: [
        new HtmlWebpackPlugin({
            template: './Frontend/index.html'  // Se debe indicar el html del frontend que se va a pasar al backend.
        })
    ]
};

// NOTA: 
// Para generar codigo se usa el comando: npx webpack.
// Para correr servidor se usa el comando: npm run dev.