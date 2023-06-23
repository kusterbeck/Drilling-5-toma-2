let arrayCharacters = [];
let indexTwo = 0;
let isFetchComplete = false;
let pageIndex = 0;
let punteroColores = 0;
let punteroTexto = 0;
let punteroHideCard = 0;
let punteroPaginas = 0;
let characterIndex = 0;
let punteroLine = 1;
const colores = ['rojo', 'verde', 'celeste'];
let ingresarHtml = document.getElementById('main_box');
 
async function fetchData() {
    for (let i = 0; i < 9; i++) {
        let url = `https://swapi.dev/api/people/?page=${i+1}&format=json`;
        try {
            let response = await fetch(url);
            response = await response.json();
            arrayCharacters.push(response.results);
        } catch (error) {
            console.log(error);
        }
    }
    isFetchComplete = true;
    loadingSpinner();
    generar.next().value;
}

function loadingSpinner() {
    const spinner = document.getElementById('spinner');
    if (isFetchComplete === true) {
        spinner.style.display= 'none';
    }
}

function renderData() {
    if (isFetchComplete === true) {
        let text = ['Encontrarás información sobre los personajes más populares de las películas.',
                    'Encontrarás información sobre los personajes secundarios importantes.', 
                    'Encontrarás información sobre otros personajes significativos']
        let createCard = document.createElement('div');
        createCard.classList.add('row');
        createCard.setAttribute('id', `row_${pageIndex}`);
        let cards = `<div class="card mb-3 mx-2" style="max-width: 340px;" id="bloque_${pageIndex}" onmouseenter="generar.next().value;">
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
        
        punteroTexto++;
        if (punteroTexto >= 2) {
            punteroTexto = 2;
        }
        ingresarHtml.appendChild(createCard);
        createCard.innerHTML = cards;
    }
}

function renderCards() {
        const attachCard = document.getElementById(`row_${pageIndex-1}`);
        for ( characterIndex ; characterIndex < indexTwo + 5; characterIndex++ ) {
            if (punteroPaginas >= 8 && characterIndex >= 2) {
                break;
            }
            let card = document.createElement('div')
            card.classList.add('card', 'mb-3', 'card_height', 'mx-2');  
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
        }
        if (punteroColores > 2) {
            punteroColores = 0;
        } 
        if (characterIndex >= 9) {
            characterIndex = 0;
            indexTwo = 0;
        }
        indexTwo += characterIndex;
        if (pageIndex%2 == 0) {
            punteroPaginas++;
        }
}

function renderLine() {
    let cajaLine = document.getElementById('aside');
    let line = document.createElement('div');
    let lineCircle = document.createElement('span');
    lineCircle.classList.add('pacman');
    line.classList.add('text-center', 'border_right');
    if (punteroLine >= 80) {
        line.innerHTML = `<p class="texto">${punteroLine} - ${punteroLine + 1}</p>`;
        cajaLine.appendChild(line);
        line.appendChild(lineCircle);
        punteroLine = punteroLine + 2
    } else {
        line.innerHTML = `<p class="texto">${punteroLine} - ${punteroLine + 4}</p>`;
        cajaLine.appendChild(line);
        line.appendChild(lineCircle);
        punteroLine = punteroLine + 5;
    }
}


fetchData();
const generar = cardGenerator();

function* cardGenerator() {
    renderData();
    renderLine();
    yield
    while (pageIndex < 18) {
        renderCards();
        if ( pageIndex < 17) {
            document.getElementById(`bloque_${pageIndex-1}`).removeAttribute('onmouseenter');
            renderLine();
            renderData();
        }
        yield
   }
}

