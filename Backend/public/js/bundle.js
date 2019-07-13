/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontEnd/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontEnd/app.js":
/*!*************************!*\
  !*** ./FrontEnd/app.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_RecipeService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/RecipeService */ "./FrontEnd/services/RecipeService.js");

__webpack_require__(/*! ./styles/app.css */ "./FrontEnd/styles/app.css");

 // Podemos hacer esto gracias a Webpack.

// Aqui se obtiene por el id del formulario todos los datos que ingresa el usuario a traves de los inputs del Form en el index.html.
document.getElementById('recipe-form')
    .addEventListener('submit', e => { // Funcion flecha.
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('image').files;

    console.log(title, ingredients, instructions, image);

    // Los datos de la receta se quieren enviar por post, pero este metodo en RecipeService
    // solo recibe un objeto por parametro, por lo tanto se crea un Formdata para poder enviarlo a partir 
    // de los datos recopilados por getElementById de arriba.
    const formData = new FormData(); // Es un formulario virtual de JS.
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);

    const recipeService = new _services_RecipeService__WEBPACK_IMPORTED_MODULE_0__["default"]();
    recipeService.postRecipe(formData);

    e.preventDefault(); // Cuando se envia el formulario ya no se reinicia.

});

/***/ }),

/***/ "./FrontEnd/services/RecipeService.js":
/*!********************************************!*\
  !*** ./FrontEnd/services/RecipeService.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Clase con metodos para reutilizar.
 */
class RecipeService {

    /**
     * Constructor tipico de una clase que se ejecuta
     * cuando la clase se instancia.   
     */
    constructor() {
        this.URI = 'http://localhost:3000/api/recipes'; // Direccion de donde esta mi API.
    }

    /**
     * Este metodo hace una peticion get a localhost:3000/api/recipes
     * para obtener datos.
     * Esto puede tardar tiempo por lo que se hace el metodo async.
     */
    async getRecipe() { 
        const response = await fetch(this.URI); // Peticion get al backend que devuelve string.
        const recipes = await response.json(); // Conversion de ese string a JSON.
        return recipes;
    }

    /**
     * Este metodo envia una peticion post al backend.
     * Debe recibir los datos que se van a enviar al backend para que los guarde.
     * @param {*} recipe 
     */
    async postRecipe(recipe) {
        // En este fetch coloco los header para decirle al backend que es lo que estoy enviando.
        const response = await fetch(this.URI, {
            method: 'POST',
            body: recipe
        });
        const data = await response.json();

        console.log(data);
    }

    /**
     * Este metodo elimina la receta en el backend.
     * Se le manda por parametro el id de la receta para que lo encuentre, igual
     * que en el recipes.js de routes en el backend.
     * Esto porque desde el frontend se debe enviar el id que se quiere eliminar.
     * @param {*} recipeId 
     */
    async deleteRecipe(recipeId) {
        const response = await fetch(`${this.URI}/${recipeId}`, { // Esto lo envia al backend
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();

        console.log(data);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (RecipeService);


/***/ }),

/***/ "./FrontEnd/styles/app.css":
/*!*********************************!*\
  !*** ./FrontEnd/styles/app.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map