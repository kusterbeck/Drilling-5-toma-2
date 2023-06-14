let arrayCharacters = [];
let isFetchComplete = false;
let pageIndex = 0;
let punteroColores = 0;
let punteroTexto = 0;
let punteroHideCard = 0;
let ingresarHtml = document.getElementById('main_box');
 
async function fetchData() {
    for (let i = 0; i < 9; i++) {
        let url = `https://swapi.dev/api/people/?page=${i+1}&format=json`;
        try {
            let response = await fetch(url);
            response = await response.json();
            arrayCharacters.push(response.results);
            // console.log(arrayCharacters);
            
        } catch (error) {
            console.log(error);
        }
        console.log(arrayCharacters)
        isFetchComplete = true;
    }
    generar.next().value;
}

async function renderData() {
    if (isFetchComplete === true) {
        let text = ['Encontrarás información sobre los personajes más populares de las películas.',
                    'Encontrarás información sobre los personajes secundarios importantes.', 
                    'Encontrarás información sobre otros personajes significativos']
        let colores = ['rojo', 'verde', 'celeste'];
        let hideCard = ['','hidden'];
        let createCard = document.createElement('div');
        createCard.classList.add('row');
        createCard.setAttribute('id', `row_${pageIndex}`);
        let cards = `<div class="card mb-3 ${hideCard[punteroHideCard]}" style="max-width: 340px;" id="bloque_${pageIndex}" onclick="generar.next().value;">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <div class="circulo ${colores[punteroColores]}"></div>
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h5 class="card-title">En esta sección...</h5>
                                    <p class="card-text">${text[punteroTexto]}</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
        pageIndex++;
        punteroColores++;
        punteroHideCard = 1; 
        if (punteroColores > 2) {
            punteroColores = 0;
        } 
        punteroTexto++;
        if (punteroTexto >= 2) {
            punteroTexto = 2;
        }
        console.log(ingresarHtml);
        ingresarHtml.appendChild(createCard);
        createCard.innerHTML = cards;
        renderCards();
    }
}

function renderCards() {
        const attachCard = document.getElementById(`row_${pageIndex-1}`);
        let card = document.createElement('div')
        card.classList.add('card', 'mb-3', 'card_height');  
        card.innerHTML = `<div class="row g-0">
                                <div class="col-md-2">
                                    <div class="circulo verde"></div>
                                </div>
                                <div class="col-md-10">
                                    <div class="card-body">
                                        <h5 class="card-title">titulo</h5>
                                        <p class="card-text">Estatura: 150 cm. Peso: 45 kg.</p>
                                    </div>
                                </div>
                            </div>
                        `;
        attachCard.appendChild(card);
        // let container = document.getElementById(`row_${pageIndex-1}`);

}


fetchData();
const generar = cardGenerator();

function* cardGenerator() {
    
    console.log(0)
    renderData();
    
    yield
    console.log(1)
    renderData();
    
    yield 
    console.log(2)
    renderData();
    yield
    console.log(3)
    renderData();
    yield
}

