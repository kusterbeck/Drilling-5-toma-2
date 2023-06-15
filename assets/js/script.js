let arrayCharacters = [];
let indexTwo = 0;
let isFetchComplete = false;
let pageIndex = 0;
let punteroColores = 0;
let punteroTexto = 0;
let punteroHideCard = 0;
let punteroPaginas = 0;
let characterIndex = 0;
const colores = ['rojo', 'verde', 'celeste'];
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

function renderData() {
    if (isFetchComplete === true) {
        let text = ['Encontrarás información sobre los personajes más populares de las películas.',
                    'Encontrarás información sobre los personajes secundarios importantes.', 
                    'Encontrarás información sobre otros personajes significativos']
        
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
        
    }
}

function renderCards() {
        const attachCard = document.getElementById(`row_${pageIndex-1}`);
        console.log(characterIndex)
        for ( characterIndex ; characterIndex < indexTwo + 5; characterIndex++ ) {
            let card = document.createElement('div')
            card.classList.add('card', 'mb-3', 'card_height');  
            card.innerHTML = `<div class="row g-0">
                                    <div class="col-md-2">
                                        <div class="circulo ${colores[punteroColores-1]}"></div>
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <h5 class="card-title">${arrayCharacters[punteroPaginas][characterIndex].name}</h5>
                                            <p class="card-text">Estatura: ${arrayCharacters[punteroPaginas][characterIndex].height} cm. Peso: ${arrayCharacters[punteroPaginas][characterIndex].mass} kg.</p>
                                        </div>
                                    </div>
                                </div>
                            `;
            attachCard.appendChild(card);
            if (punteroPaginas >= 8 && characterIndex >= 1) {
                break;
            }
        }

        if (characterIndex >= 9) {
            characterIndex = 0;
            indexTwo = 0;
        }
        indexTwo += characterIndex;
        if (pageIndex%2 == 0) {
            punteroPaginas++;
        }
        // let container = document.getElementById(`row_${pageIndex-1}`);

}


fetchData();
const generar = cardGenerator();

function* cardGenerator() {
    renderData();
    yield
    while (pageIndex < 18) {
        renderCards();
        if ( pageIndex < 17) {
            renderData();
        }
        console.log(pageIndex);
        yield
   }
}

