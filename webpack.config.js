
// Webpack tiene la funcion de convertir el codigo de frontend 
// a codigo de HTML, CSS y JavaScript y moverlo a otra carpeta.
// En este caso es a la carpeta "public" en el backend.
// Hay que especificar donde esta el codigo de frontend.
// Ademas de convertir el codigo, webpack enlaza el HTML con el JS
// del frontend, esto mediante el script que agrega en el HTML del backend.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Para preguntar si estoy en modo "desarrollo" o modo "produccion". Devuelve un booleano.
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './FrontEnd/app.js', // Aqui se le dice donde esta el archivo principal del proyecto.
    output: { // Aqui se le dice donde se va a colocar el codigo convertido.
        path: path.join(__dirname, 'Backend/public'),
        filename: 'js/bundle.js' // Nombre del archivo generado.
    }, 
    mode: 'development',

    // Modulos para cargar estilos dentro del JS.
    // En produccion se quiere q los archivos de CSS esten en los de CSS 
    // Y los de HTML esten en los de HTML. 
    // En package JSON esta el script "build" para ejecutarlo en ambiente "produccion".
    // Con esto ya se puede entender CSS en el app.js.
    // devMode:
    // Si estoy en desarrollo: carga los estilos dentro del JS. 
    // Si estoy en produccion: carga los estilos en su propio archivo de CSS.
    module: { 
        rules: [
            {
                test: /\.css/,
                use: [ 
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './Frontend/index.html',  // Se debe indicar el html del frontend que se va a pasar al backend.
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css' // Nombre del archivo generado.
        })
    ],

    // Cuando estoy en modo "desarrollo" quiero saber en que linea de codigo me equivoco.
    devtool: 'source-map'
};

// NOTA 1: 
// Para generar codigo se usa el comando: npx webpack
// Para correr servidor se usa el comando: npm run dev

//NOTA 2:
// Para correr el programa en modo "production" se usa: npm run build.

//NOTA 3:
// Para correrlo en el puerto 8080 y que se compile automaticamente se puso un script en package JSON.
// Para esto se usa: npm run server:dev 