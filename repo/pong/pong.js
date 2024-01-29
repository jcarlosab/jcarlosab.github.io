/*jslint devel: true */
/*jslint plusplus: true */

var game;

function ObjCampo(l, a) {
    "use strict";
    this.largo = l;
    this.ancho = a;
    
    this.verCampo = function () {
        var dibujarCampo = document.getElementById("campo");
        dibujarCampo.style.width = this.largo.toString() + "px";
        dibujarCampo.style.height = this.ancho.toString() + "px";
    };
}

function ObjPelota(pX, pY) {
    "use strict";
    var velocidad = 1, avanzaY = 0, avanzaX = 0, contUno = 0, contJ2 = 0;
    this.diametro = 20;
    this.posY = pY;
    this.posX = pX;
    this.verPelota = function () {
        var dibujarPelota = document.getElementById("pelota");
        dibujarPelota.style.width = this.diametro.toString() + "px";
        dibujarPelota.style.height = this.diametro.toString() + "px";
        this.posicion = this.posX.toString() + "px";
        dibujarPelota.style.left = this.posicion;
        this.posicion = this.posY.toString() + "px";
        dibujarPelota.style.top = this.posicion;
    };
    
    this.mover = function (cmpAncho, cmpLargo, colision) {
        
        this.campoAncho = cmpAncho;
        this.campoLargo = cmpLargo;
        this.choque = colision;
        
        if (this.choque === true) {
            avanzaX = 0;
        }
        
        if ((this.posY + this.diametro) === this.campoAncho) {
            avanzaY = 1;
        } else if (this.posY === 0) {
            avanzaY = 0;
        }
    
        if ((this.posX + this.diametro) === this.campoLargo) {
            avanzaX = 1;
            contUno++;
            document.getElementById("j1").innerHTML = "<h1>" + contUno + "</h1>";
        } else if (this.posX === 0) {
            avanzaX = 0;
        }
    
        if (avanzaX === 0) {
            this.posX = this.posX + velocidad;
        } else if (avanzaX === 1) {
            this.posX = this.posX - velocidad;
        }
    
        if (avanzaY === 0) {
            this.posY = this.posY + velocidad;
        } else if (avanzaY === 1) {
            this.posY = this.posY - velocidad;
        }
        this.verPelota();
    };
}

function ObjTab(pY, pX) {
    "use strict";
    this.largo = 10;
    var ancho = 60;
    this.posY = pY;
    this.posX = pX;
    
    this.mover = function (e) {
        var key = e.which;
        if (key === 87 && this.posY >= 10) {
            this.posY = this.posY - 2;
            document.getElementById("jugador").style.top = this.posY.toString() + "px";
        } else if (key === 83 && this.posY < 230) {
            this.posY = this.posY + 2;
            document.getElementById("jugador").style.top = this.posY.toString() + "px";
        }
    };
}

function ObjGame() {
    "use strict";
    var campo, pelota, jugador1, ia;
    campo = new ObjCampo(600, 300);
    pelota = new ObjPelota((campo.largo / 2) - 10, (campo.ancho / 2) - 10);
    jugador1 = new ObjTab((campo.ancho / 2) - 30, 10);
    ia = new ObjTab((campo.ancho / 2) - 30, 580);
    campo.verCampo();
    pelota.verPelota();
    this.moverTab = function (e) {
        jugador1.mover(e);
    };
 
    function moverPelota() {
        var datos = Math.sqrt(Math.pow((pelota.posX - jugador1.posX), 2) + Math.pow((pelota.posY - jugador1.posY), 2)), datosIa = Math.sqrt(Math.pow((pelota.posX - ia.posX), 2) + Math.pow((pelota.posY - ia.posY), 2)), colision = false;
        if ((jugador1.largo / 2 + pelota.diametro / 2) > datos || (ia.largo / 2 + pelota.diametro / 2) > datosIa) {
            colision = true;
        }
        pelota.mover(campo.ancho, campo.largo, colision);
    }
    setInterval(moverPelota, 1);
}

function inicio() {
    "use strict";
    game = new ObjGame();
}