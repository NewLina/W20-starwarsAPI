const responseContainer = document.querySelector('.response-container');
const errorContainer = document.querySelector('.error-container');
const identificator = document.querySelector('.container__input__id');
const searchOptions = document.querySelector('.option');
const button = document.querySelector('.container__input__button');

const options=document.getElementById('options');

function getSelectValue() {
    let selectedOptionValue=options.value;
    return selectedOptionValue;
}

options.addEventListener('change', getSelectValue);

const optionChoice = getSelectValue();

const inputId = identificator.value;

function createLayout(name) {
    let displayName = '';
    displayName = `
    <div class='response-container__item'>Name: ${name}</div>
    `
    responseContainer.innerHTML = displayName;
}


function showName() {
    fetch('https://swapi.dev/api/'+ optionChoice +'/' + inputId +'/')
        .then(response => response.json())
        .then((data) => {
            switch (optionChoice) {
                case 'films': createLayout(data.title);
                    break;
                default : createLayout(data.name);
            }
        
        })
}

button.addEventListener('click', showName);