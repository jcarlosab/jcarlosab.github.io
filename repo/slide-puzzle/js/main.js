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

const init = () => {
    const puzzles = document.querySelector('.puzzles');
    const idPuzzle = document.querySelector("#puzzle");
    puzzles.addEventListener('click', seleccionarPuzzle);
    idPuzzle.addEventListener('click', moverPieza);
}

const seleccionarPuzzle = (event) => {
    if(event.target.tagName.toLowerCase() === 'div' && event.target.className != 'puzzles') {
        let arrayPiezas = [1,2,3,4,5,6,7,8,''];
        const valor = event.target.getAttribute('data-value');
        const grid = parseInt(event.target.getAttribute('data-grid'));
        const formato = event.target.getAttribute('data-format');
        const idPuzzle = document.querySelector("#puzzle");
        limpiarPuzzle();
        document.querySelector('#inicio').classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
        if (grid == 4) {
            arrayPiezas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
            idPuzzle.style.gridTemplateColumns = "repeat(4, 1fr)";
            idPuzzle.style.gridTemplateRows = "repeat(4, 1fr)";
        }
        const puzzle = new Puzzle(valor, formato, arrayPiezas, grid, 90);
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
        //El valor nos indicará el eje y dirección a mover la ficha (10/-10 eje y) (1/-1 eje x) 
        if (valor == -1 || valor == 1 || valor == 10 || valor == -10) {
            audio.play();
            let copia = elemento.childNodes[0];
            console.log(copia);
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
    let arrayPiezas = [1,2,3,4,5,6,7,8,''];
    let valores = '';
    if (document.querySelector("#puzzle").lastChild.getAttribute('data-value') == vacio.getAttribute('data-value')) {
        valores = Array.from (document.querySelectorAll('.pieza')).map (e => e.dataset.imgvalue);
        console.log(JSON.stringify(valores));
        console.log(JSON.stringify(arrayPiezas));
        console.log(JSON.stringify(arrayPiezas) === JSON.stringify(valores));
    }
}

const silenciarJuego = () => {
    const audio = document.getElementById("audio");
    if (audio.muted) {
        audio.muted = false;
        //mute.style.textDecoration = "";
    } else {
        audio.muted = true;
        //mute.style.textDecoration = "line-through";
    }
}

const cronometro = () => {
    let segundos = 120;
    const contador = document.querySelector('.contador');
    const puzzle = document.querySelector('#puzzle');
    function decrementSeconds() {
        contador.innerText = --segundos;
        if (segundos == 0) {
            clearInterval(countdownTimer);
            puzzle.removeEventListener('click', moverPieza);
            puzzle.classList.add('disabled')
            contador.innerText = "¡Se acabó el tiempo!"; //muestra un mensaje final
        }
    }
    let countdownTimer = setInterval(decrementSeconds, 1000);
    contador.innerHTML = segundos.toString();
}

const limpiarPuzzle = () => {
    const eliminarNodos = document.getElementById("puzzle");
    while (eliminarNodos.hasChildNodes()) {
        eliminarNodos.removeChild(eliminarNodos.firstChild);
    }
}


/*Pausar juego*/
function pausar(valor) {
    //TODO
}

