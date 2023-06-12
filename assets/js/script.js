let arrayCharacters = [];
let pageIndex = 0;
let punteroColores = 0;
let punteroTexto = 0;
let punteroHideCard = 0;
 


async function fetchData() {
    for (let i = 0; i < 9; i++) {
        let url = `https://swapi.dev/api/people/?page=${i+1}`;
        try {
            let response = await fetch(url);
            response = await response.json();
            arrayCharacters.push(response.results);
            // console.log(arrayCharacters);
        } catch (error) {
            console.log(error);
        }
        console.log(arrayCharacters)
    }
}

async function renderData() {
    if (arrayCharacters == []) {
        await fetchData();
    }
    
    let text = ['Encontrarás información sobre los personajes más populares de las películas.',
                'Encontrarás información sobre los personajes secundarios importantes.', 
                'Encontrarás información sobre otros personajes significativos']
    let colores = ['rojo', 'verde', 'celeste'];
    let hideCard = ['','hidden'];
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
        let ingresarHtml = document.getElementById('main_box');
        ingresarHtml.innerHTML += cards;
}

function renderCards() {
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j <= 9; j++) {
        let characterCard = `<div class="card mb-3 card_height" style="max-width: 340px;">
                                <div class="row g-0">
                                    <div class="col-md-2">
                                        <div class="circulo verde"></div>
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <h5 class="card-title">${arrayCharacters[i][j].name}</h5>
                                            <p class="card-text">Estatura: ${arrayCharacters[i][j].height} cm. Peso: ${arrayCharacters[i][j].mass} kg.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
        html += characterCard;
        }
    }
    let container = document.getElementById(`row_${n}`);
    container.innerHTML = html;
}

// function carta1(clase, parrafo) {
//     let html1 = `<div class="card mb-3 " style="max-width: 340px;" id="bloque_1" onclick="generar.next().value;">
//                     <div class="row g-0">
//                         <div class="col-md-2">
//                             <div class="circulo ${clase}"></div>
//                         </div>
//                         <div class="col-md-10">
//                             <div class="card-body">
//                                 <h5 class="card-title">En esta sección...</h5>
//                                 <p class="card-text">${parrafo}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>`;
//     let ingresarHtml = document.getElementById('main_box');
//     ingresarHtml.innerHTML += html1;
// }

const generar = cardGenerator();
generar.next().value;


fetchData();
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

