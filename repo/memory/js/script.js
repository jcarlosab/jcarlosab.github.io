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
        this.puntos = 0;
        this.cartas = cartas;
    }
}

const inicio = () => {
    const reiniciar = document.querySelector("#reiniciar");
    const mute = document.querySelector("#mute");
    const reglas = document.querySelector("#reglas");
    const cerrar = document.querySelector(".cerrar");
    let valor = 0, listaCartas = [], listaComparar = [], aux = 0;;
    let contador = 1;
    let audio = document.getElementById("audio");
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
    let divTablero = document.getElementById("tablero");
    
    tablero.cartas.forEach(carta => {
        let divCarta = document.createElement("div");
        divCarta.setAttribute("data-valor", aux);
        divCarta.addEventListener('click', () => {
            voltear(divCarta, carta);
        });
        divTablero.appendChild(divCarta);
        aux++;
    });

    reiniciar.addEventListener('click', (event) => {
        reiniciarJuego();
    });

    mute.addEventListener('click', (event) => {
        silenciarJuego();
    });

    reglas.addEventListener('click', (event) => {
        reglasJuego();
    });

    cerrar.addEventListener('click', (event) => {
        cerrarReglas();
    });

    voltear = (div, carta) => {
        if (!carta.girada) {
            if (listaComparar.length != 2) {
                listaComparar.push(div);
                carta.girada = true;
                div.style.backgroundImage = 'url(' + carta.imagen + ')';
            }
        }
        if (listaComparar.length == 2) {
            document.getElementById("count").innerHTML = contador++;
            audio.play();
            setTimeout(comparar, 200);
        }     
    }

    comparar = () => {
        let carta1 = tablero.cartas[parseInt(listaComparar[0].getAttribute('data-valor'))];
        let carta2 =  tablero.cartas[parseInt(listaComparar[1].getAttribute('data-valor'))];
        if (carta1.valor == carta2.valor) {
            tablero.aciertos++;
            listaComparar = [];
        } else {
            listaComparar[0].style.backgroundImage = null;
            listaComparar[1].style.backgroundImage = null;
            listaComparar[0].getAttribute('data-valor');
            listaComparar[1].getAttribute('data-valor');
            carta1.girada = false;
            carta2.girada = false;
            listaComparar = [];
        }
        if (tablero.aciertos == listaImg.length) {
            tablero.puntos = ((tablero.aciertos + 1) * 150) - ((contador - tablero.aciertos + 1) * 25); 
            document.getElementById("puntos").innerHTML = tablero.puntos;
            document.getElementById("win").style.visibility = "visible";
        }
    }

    reiniciarJuego = () =>  {
        "use strict";
        var eliminarNodos;
        contador = 0;
        tablero.puntos = 0;
        tablero.aciertos = 0;
        eliminarNodos = document.getElementById("tablero");
        while (eliminarNodos.hasChildNodes()) {
            eliminarNodos.removeChild(eliminarNodos.firstChild);
        }
        document.getElementById("count").innerHTML = 0;
        document.getElementById("puntos").innerHTML = 0;
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
        let instrucciones = document.querySelector("#instrucciones");
        if (instrucciones.style.visibility == "hidden" || instrucciones.style.visibility == '') {
            instrucciones.style.visibility = "visible";
        }
    }

    cerrarReglas = () => {
        let instrucciones = document.querySelector("#instrucciones");
        if (instrucciones.style.visibility == "visible") {
            instrucciones.style.visibility = "hidden";
        }
    }
}

const desordenar = (array) => {
    let ld = array.sort(function() {return (Math.random()-0.5)});
    return [...ld];
}