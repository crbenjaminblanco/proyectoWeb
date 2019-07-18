require('./styles/app.css');

import homeUI from './homeUI';

// Evento: Una vez el navegador haya pintado la interfaz (DOM haya sido cargado) me traigo los datos desde el backend.
document.addEventListener('DOMContentLoaded', () => {
    const hui = new homeUI();
    hui.renderSharedRecipes();
});

//Cuando se busca
const goButton = document.getElementById('goButton');

goButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    var line = searchInput.value;
    const hui = new homeUI();
    
    if (line.localeCompare('')) { //If line has something
        console.log("lineas distintas");
        var lineMinus = line.toLowerCase();
        hui.searchRecipes(lineMinus);
    } else {
        hui.renderSharedRecipes();
    }
});