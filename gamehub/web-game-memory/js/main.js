class Carta {
    constructor(valor, imagen, girada) {
        this.valor = valor;
        this.imagen = imagen;
        this.girada = girada;
    }
}

class Tablero {
    constructor(cartas) {
        this.aciertos = 0;
        this.contador = 0;
        this.seleccionadas = [];
        this.comprobando = false;
        this.cartas = cartas;
    }
}

const inicio = () => {
    const reiniciar = document.querySelector("#reiniciar");
    const reset = document.querySelector('.boton-reset');
    const mute = document.querySelector("#mute");
    const reglas = document.querySelector("#reglas");
    const cerrar = document.querySelector(".cerrar");
    const audio = document.getElementById("audio");
    const divTablero = document.getElementById("tablero");
    let contador = 0;
    let valor = 0, listaCartas = [], aux = 0;
    let listaImg = [
        "assets/imagenes/pixel-7272046_640.png", 
        "assets/imagenes/pixel-art-7280236_640.png", 
        "assets/imagenes/pixel-art-7280889_640.png", 
        "assets/imagenes/pixel-art-7284052_640.png", 
        "assets/imagenes/pixel-art-7284060_640.png", 
        "assets/imagenes/shop-7285838_640.png", 
        "assets/imagenes/store-7274767_640.png", 
        "assets/imagenes/store-7289198_640.png", 
        "assets/imagenes/store-7289202_640.png"
    ];

    for (let img of listaImg) {
        let carta = new Carta(valor, img, false);
        listaCartas.push(carta);
        carta = new Carta(valor, img, false);
        listaCartas.push(carta);
        valor++;
    }

    listaCartas = desordenar(listaCartas);
    let tablero = new Tablero(listaCartas);
    
    tablero.cartas.forEach(() => {
        const divCarta = document.createElement("div");
        divCarta.setAttribute("data-valor", aux);
        divTablero.appendChild(divCarta);
        aux++;
    });

    divTablero.addEventListener('click', (event) => {
        if(event.target.tagName.toLowerCase() === 'div' && !tablero.comprobando){
            voltear(event.target);
        }
    });

    reiniciar.addEventListener('click', () => {
        reiniciarJuego();
    });

    reset.addEventListener('click', () => {
        reiniciarJuego();
    });

    mute.addEventListener('click', () => {
        silenciarJuego();
    });

    reglas.addEventListener('click', () => {
        reglasJuego();
    });

    cerrar.addEventListener('click', () => {
        cerrarReglas();
    });

    voltear = (div) => {
        if (div.getAttribute('data-valor') != null && !tablero.cartas[div.getAttribute('data-valor')].girada) {
            if (tablero.contador != 2) {
                div.style.backgroundImage = 'url(' + tablero.cartas[div.getAttribute('data-valor')].imagen + ')';
                tablero.seleccionadas.push(div);
                tablero.cartas[div.getAttribute('data-valor')].girada = true;
                tablero.contador++;
            }
        }
        if (tablero.contador == 2) {
            tablero.contador = 0;
            tablero.comprobando = true;
            audio.play();
            comparar(600);
        }   
    }
    
    comparar = (ms) => {
        setTimeout(() => {
        if (ms == 600) {
            let listaComparar = tablero.seleccionadas; 
            let carta1 = tablero.cartas[parseInt(listaComparar[0].getAttribute('data-valor'))];
            let carta2 =  tablero.cartas[parseInt(listaComparar[1].getAttribute('data-valor'))];
            document.getElementById("count").innerHTML = ++contador;
            if (carta1.valor == carta2.valor) {
                tablero.aciertos++;
            } else {
                listaComparar[0].style.backgroundImage = null;
                listaComparar[1].style.backgroundImage = null;
                listaComparar[0].getAttribute('data-valor');
                listaComparar[1].getAttribute('data-valor');
                carta1.girada = false;
                carta2.girada = false;
            }
            if (tablero.aciertos == tablero.cartas.length / 2) {
                const puntosTotales = 9000;
                let penalizacion = contador <= 15 ? 0 : (contador - 15) * 250;
                document.getElementById("movimientos").innerHTML = penalizacion;
                document.getElementById("total").innerHTML = puntosTotales - penalizacion;
                document.getElementById("win").style.visibility = "visible";
            }
            tablero.seleccionadas = [];
            tablero.comprobando = false;
        }
        },ms);
    }

    reiniciarJuego = () =>  {
        const nodoTablero = document.getElementById("tablero");
        contador = 0;
        tablero.aciertos = 0;
        while (nodoTablero.hasChildNodes()) {
            nodoTablero.removeChild(nodoTablero.firstChild);
        }
        document.getElementById("count").innerHTML = 0;
        document.getElementById("total").innerHTML = 0;
        document.getElementById("movimientos").innerHTML = 0;
        document.getElementById("win").style.visibility = "hidden";
        reiniciar.removeEventListener('click', reiniciarJuego);
        mute.removeEventListener('click', silenciarJuego);
        reglas.removeEventListener('click', reglasJuego);
        cerrar.removeEventListener('click', cerrarReglas);
        inicio();
    }

    silenciarJuego = () => {
        if (audio.muted) {
            audio.muted = false;
            mute.style.textDecoration = "";
        } else {
            audio.muted = true;
            mute.style.textDecoration = "line-through";
        }
    }

    reglasJuego = () => {
        const instrucciones = document.querySelector("#instrucciones");
        if (instrucciones.style.visibility == "hidden" || instrucciones.style.visibility == '') {
            instrucciones.style.visibility = "visible";
        }
    }

    cerrarReglas = () => {
        const instrucciones = document.querySelector("#instrucciones");
        if (instrucciones.style.visibility == "visible") {
            instrucciones.style.visibility = "hidden";
        }
    }
}

const desordenar = (array) => {
    let ld = array.sort(function() {return (Math.random()-0.5)});
    return [...ld];
}