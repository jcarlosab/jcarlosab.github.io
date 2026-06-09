class Puzzle {
    constructor(tipo, formato, piezas, dimension, segundos) {
        this.tipo = tipo;
        this.formato = formato;
        this.piezas = piezas;
        this.fila = dimension;
        this.columna = dimension;
        this.segundos = segundos;
        this.posiciones = [];
    }
    inicializarPuzzle() {
        const idPuzzle = document.querySelector("#puzzle");
        let piezasDesordenadas = this.piezas.sort(() => Math.random() - 0.5);
        this.posiciones = [];
        let n = 0;
        for (let x = 0; x < this.fila; x++) {
            this.posiciones[x] = [];
            for (let y = 0; y < this.columna; y++) {
                let casilla = document.createElement("div");
                casilla.setAttribute("class", "casilla");
                casilla.setAttribute("data-value", x + '' + y);
                if (piezasDesordenadas[n] != '') {
                    let pieza = document.createElement("img");
                    pieza.setAttribute("class", "pieza");
                    pieza.setAttribute("src", "assets/imagenes/" + this.tipo + piezasDesordenadas[n] + "." + this.formato);
                    pieza.setAttribute("data-imgvalue", piezasDesordenadas[n]);
                    casilla.appendChild(pieza);
                }
                idPuzzle.appendChild(casilla);
                n++;
            }
        }
    }
}

const divPuzzle = document.querySelector('#puzzle');
const container = document.querySelector('.container');
const inicio = document.querySelector('#inicio');
const aviso = document.querySelector('.aviso');
let countdownTimer = "";

const init = () => {
    const puzzles = document.querySelector('.puzzles');
    const reset = document.querySelector('.buttom');
    puzzles.addEventListener('click', seleccionarPuzzle);
    divPuzzle.addEventListener('click', moverPieza);
    reset.addEventListener('click', limpiarPuzzle);
}

const seleccionarPuzzle = (event) => {
    if(event.target.tagName.toLowerCase() === 'div' && event.target.className != 'puzzles') {
        let arrayPiezas = [1,2,3,4,5,6,7,8,''];
        let puzzle = {}; 
        const valor = event.target.getAttribute('data-value');
        const grid = parseInt(event.target.getAttribute('data-grid'));
        const formato = event.target.getAttribute('data-format');
        inicio.classList.add('hidden');
        container.classList.remove('hidden');
        if (grid == 4) {
            arrayPiezas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
            divPuzzle.classList.add('grid-4x4');
            divPuzzle.classList.remove('grid-3x3');
        } else {
            divPuzzle.classList.remove('grid-4x4');
            divPuzzle.classList.add('grid-3x3');
        }
        puzzle = new Puzzle(valor, formato, arrayPiezas, grid, 90);
        puzzle.inicializarPuzzle();
        cronometro();
    }
}

const buscarPosVacia = () => {
    const casillas = document.querySelectorAll(".casilla");
    let elemento = '';
    casillas.forEach(element => {
        if (!element.hasChildNodes()) {
            elemento = element;
        }
    });
    return elemento;
}

const moverPieza = (event) => {
    if(event.target.tagName.toLowerCase() === 'img'){
        const casilla = event.target.parentNode;
        const posicion = casilla.getAttribute('data-value');
        const audio = document.getElementById("audio");
        const elemento =  document.querySelector('[data-value="' + posicion + '"]');
        let valor = 0;
        let vacio = buscarPosVacia();
        valor = parseInt(vacio.getAttribute('data-value')) - parseInt(elemento.getAttribute('data-value'));
        if (valor == -1 || valor == 1 || valor == 10 || valor == -10) {
            audio.play();
            let copia = elemento.childNodes[0];
            if(copia != undefined) {
                vacio.appendChild(copia);
                comprobar();
                audio.currentTime = 0;
            }
        }
    }
}

const comprobar = () => {
    let vacio = buscarPosVacia();
    let valores = '';
    if (document.querySelector("#puzzle").lastChild.getAttribute('data-value') == vacio.getAttribute('data-value')) {
        valores = Array.from (document.querySelectorAll('.pieza')).map (e => e.dataset.imgvalue);
        if ('["1","2","3","4","5","6","7","8"]' === JSON.stringify(valores) || '["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]' === JSON.stringify(valores)) {
            clearInterval(countdownTimer);
            divPuzzle.removeEventListener('click', moverPieza);
            divPuzzle.classList.add('disabled');
            mostrarAviso('¡Has ganado!');
        } 
    }
}

const cronometro = () => {
    let segundos = 120;
    const contador = document.querySelector('.contador');
    function decrementSeconds() {
        contador.innerText = --segundos;
        if (segundos == 0) {
            clearInterval(countdownTimer);
            divPuzzle.removeEventListener('click', moverPieza);
            divPuzzle.classList.add('disabled');
            contador.innerText = "¡Se acabó el tiempo!";
            mostrarAviso('¡Has perdido!');
        }
    }
    countdownTimer = setInterval(decrementSeconds, 1000);
    contador.innerHTML = segundos.toString();
}

const mostrarAviso = (texto) => {
    aviso.classList.remove('hidden');
    aviso.innerHTML = texto;
}

const limpiarPuzzle = () => {
    while (divPuzzle.hasChildNodes()) {
        divPuzzle.removeChild(divPuzzle.firstChild);
    }
    container.classList.add('hidden');
    inicio.classList.remove('hidden');
    divPuzzle.classList.remove('disabled')
    aviso.classList.add('hidden');
    clearInterval(countdownTimer);
    init();
}

init();