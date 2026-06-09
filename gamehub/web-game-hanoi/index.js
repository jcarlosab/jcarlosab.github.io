"use strict";

var nube, torres = new Array(3);
var cantidadFichas = 0, contadorMovimientos = 0;
var anchoFichas = [];

function ObjNube() {
    this.hueco = null;

    this.ponerFichaNube = function (ficha) {
        this.hueco = ficha;
        document.getElementById("nube").innerHTML = this.hueco.datosFicha;
    };

    this.sacarFichaNube = function (num) {
        var torre = torres[num];
        if (torre.fichas.length === 0 || this.hueco.numeroFicha < torre.fichas[0].numeroFicha) {
            torre.ponerFicha(this.hueco);
            this.hueco = null;
            document.getElementById("nube").innerHTML = "";
            document.getElementById("monitor").innerHTML = "";
            contadorMovimientos++;
            document.getElementById("movimientos").innerHTML = "Movimientos: " + contadorMovimientos;
            comprobarVictoria();
        } else {
            document.getElementById("monitor").innerHTML = "No se puede realizar movimiento";
        }
    };
}

function ObjFicha(num, dat) {
    this.numeroFicha = num;
    this.datosFicha = dat;
}

function ObjTorre(num) {
    var p, posicion;
    this.fichas = [];
    this.numeroTorre = num;
    posicion = "t" + this.numeroTorre.toString();

    this.sacarFicha = function () {
        nube.ponerFichaNube(this.fichas.shift());
        this.verTorre();
    };

    this.ponerFicha = function (ficha) {
        this.fichas.unshift(ficha);
        this.verTorre();
    };

    this.verTorre = function () {
        var espacio, textoCompleto;
        espacio = (7 * 20) - (this.fichas.length * 20);
        textoCompleto = "<div style='height:" + espacio + "px'></div>";
        for (p = 0; p < this.fichas.length; p++) {
            textoCompleto += this.fichas[p].datosFicha;
        }
        document.getElementById(posicion).innerHTML = textoCompleto;
    };
}

function calcularAnchoFichas() {
    var torreEl = document.getElementById("t1");
    var torreAncho = torreEl.offsetWidth - 4;
    var base = torreAncho * 0.9;
    var paso = (torreAncho * 0.7) / (cantidadFichas - 1);
    anchoFichas = [];
    for (var i = 0; i < cantidadFichas; i++) {
        anchoFichas[i] = Math.round(base - i * paso);
    }
}

function comprobarVictoria() {
    if (torres[2].fichas.length === cantidadFichas) {
        document.getElementById("monitor").innerHTML = "Felicidades! Completado en " + contadorMovimientos + " movimientos";
    }
}

function iniciar() {
    var f, ficha, datos;

    cantidadFichas = 6;
    contadorMovimientos = 0;
    document.getElementById("movimientos").innerHTML = "Movimientos: 0";
    document.getElementById("monitor").innerHTML = "";

    torres[0] = new ObjTorre(1);
    torres[1] = new ObjTorre(2);
    torres[2] = new ObjTorre(3);
    nube = new ObjNube();

    calcularAnchoFichas();

    for (f = cantidadFichas; f > 0; f--) {
        ficha = new ObjFicha(f);
        datos = "<div class='ficha' style='width:" + anchoFichas[cantidadFichas - f] + "px'></div>";
        ficha.datosFicha = datos;
        torres[0].ponerFicha(ficha);
    }
}

function mover(posicion) {
    var n = posicion, index;
    if (torres[2].fichas.length === cantidadFichas) {
        return;
    }
    if (nube.hueco !== null) {
        nube.sacarFichaNube(n);
    } else {
        index = torres[n].fichas.length;
        if (index > 0) {
            torres[n].sacarFicha();
            document.getElementById("monitor").innerHTML = "";
        } else {
            document.getElementById("monitor").innerHTML = "Torre vacia";
        }
    }
}

function reiniciar() {
    document.getElementById("nube").innerHTML = "";
    iniciar();
}

window.onload = iniciar;
