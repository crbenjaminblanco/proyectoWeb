
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
    entry:{
         app: './FrontEnd/app.js',
         usersUI: './FrontEnd/usersUI.js',
         about: './FrontEnd/about.js'
    }, // Aqui se le dice donde esta el archivo principal del proyecto.
    output: { // Aqui se le dice donde se va a colocar el codigo convertido.
        path: path.join(__dirname, 'Backend/public'),
        filename: 'js/[name].js' // Nombre del archivo generado.
    }, 
    mode: 'production',

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
            filename: 'myRecipes.hbs',
            template: './Frontend/myRecipes.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['app'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'signup.hbs',
            template: './Frontend/signup.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['usersUI'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'signin.hbs',
            template: './Frontend/signin.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['usersUI'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'main.hbs',
            template: './Frontend/main.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['usersUI'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'messages.hbs',
            template: './Frontend/messages.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['usersUI'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'about.hbs',
            template: './Frontend/about.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['about'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'features.hbs',
            template: './Frontend/features.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['about'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'homePage.hbs',
            template: './Frontend/homePage.hbs',  // Se debe indicar el html del frontend que se va a pasar al backend.
            chunks: ['about'],
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