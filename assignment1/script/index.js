const responseContainer = document.querySelector('.response-container');
const errorContainer = document.querySelector('.error-container');
const identificator = document.querySelector('.container__input__id');
const button = document.querySelector('.container__input__button');
const options=document.getElementById('options');

const preloader = document.querySelector('.preloader');
preloader.classList.add('preloader_hidden');

function getSelectValue() {
    let selectedOptionValue=options.value;
    return selectedOptionValue;
}

options.addEventListener('change', getSelectValue);

function createLayoutName(name) {
    let displayName = '';
    displayName = `
    <div class='response-container__item'>Name: ${name}</div>
    `
    responseContainer.innerHTML = displayName;
}

function createLayoutError(error) {
    let displayError = '';
    displayError = `
    <div class='error-container__item'>${error}</div>
    `
    errorContainer.innerHTML = displayError;
}

function clearDiv(divName) {
    divName.innerHTML='';
}

function showName() {
    const optionChoice = getSelectValue();
    const inputId = identificator.value;
    preloader.classList.remove('preloader_hidden');
    fetch('https://swapi.dev/api/'+ optionChoice +'/' + inputId +'/')
    .then(response => response.json())
    .then((data) => {
        clearDiv(errorContainer);
        if (data.detail || inputId>10) return Promise.reject("Ошибка: 404");
        switch (optionChoice) {
            case 'films': createLayoutName(data.title);
                break;
            default : createLayoutName(data.name);
            } 
        preloader.classList.add('preloader_hidden');
    })
    .catch ((error) => {
        clearDiv(responseContainer);
        createLayoutError(error);
        preloader.classList.add('preloader_hidden');
    })
    .finally (() => {
        console.log('Done');
    })
}

button.addEventListener('click', showName);
