var game;
var LIMITE_VICTORIA = 10;

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
    var velocidadBase = 3, velocidad = 3, nivelVelocidad = 1;
    var avanzaY = 0, avanzaX = 0, contJ1 = 0, contJ2 = 0;
    this.diametro = 20;
    this.posY = pY;
    this.posX = pX;
    this.juegoTerminado = false;

    this.verPelota = function () {
        var dibujarPelota = document.getElementById("pelota");
        dibujarPelota.style.width = this.diametro.toString() + "px";
        dibujarPelota.style.height = this.diametro.toString() + "px";
        dibujarPelota.style.left = this.posX.toString() + "px";
        dibujarPelota.style.top = this.posY.toString() + "px";
    };

    this.getVelocidad = function () {
        return nivelVelocidad;
    };

    this.aumentarVelocidad = function () {
        nivelVelocidad++;
        velocidad = velocidadBase + (nivelVelocidad - 1) * 0.5;
        var info = document.getElementById("velocidad-info");
        if (info) {
            info.innerHTML = "Velocidad: " + nivelVelocidad;
        }
    };

    this.reiniciar = function (campoAncho, campoLargo) {
        this.posX = (campoLargo / 2) - (this.diametro / 2);
        this.posY = (campoAncho / 2) - (this.diametro / 2);
        avanzaX = 0;
        avanzaY = 0;
        nivelVelocidad = 1;
        velocidad = velocidadBase;
        var info = document.getElementById("velocidad-info");
        if (info) {
            info.innerHTML = "Velocidad: 1";
        }
        this.verPelota();
    };

    this.mover = function (campoAncho, campoLargo, colisionJugador, colisionIa) {
        if (this.juegoTerminado) {
            return;
        }

        if (colisionJugador) {
            avanzaX = 0;
            this.aumentarVelocidad();
        } else if (colisionIa) {
            avanzaX = 1;
            this.aumentarVelocidad();
        }

        if ((this.posY + this.diametro) >= campoAncho) {
            avanzaY = 1;
        } else if (this.posY <= 0) {
            avanzaY = 0;
        }

        if ((this.posX + this.diametro) >= campoLargo) {
            contJ1++;
            document.getElementById("j1").innerHTML = "<h1>" + contJ1 + "</h1>";
            if (contJ1 >= LIMITE_VICTORIA) {
                this.terminarJuego("Jugador");
                return;
            }
            this.reiniciar(campoAncho, campoLargo);
            return;
        } else if (this.posX <= 0) {
            contJ2++;
            document.getElementById("j2").innerHTML = "<h1>" + contJ2 + "</h1>";
            if (contJ2 >= LIMITE_VICTORIA) {
                this.terminarJuego("IA");
                return;
            }
            this.reiniciar(campoAncho, campoLargo);
            return;
        }

        if (avanzaX === 0) {
            this.posX = this.posX + velocidad;
        } else {
            this.posX = this.posX - velocidad;
        }

        if (avanzaY === 0) {
            this.posY = this.posY + velocidad;
        } else {
            this.posY = this.posY - velocidad;
        }
        this.verPelota();
    };

    this.terminarJuego = function (ganador) {
        this.juegoTerminado = true;
        var monitor = document.getElementById("monitor");
        if (monitor) {
            monitor.innerHTML = ganador + " gana! <button onclick='game.reiniciar()'>Jugar de nuevo</button>";
        }
    };

    this.resetearPuntos = function () {
        contJ1 = 0;
        contJ2 = 0;
        this.juegoTerminado = false;
        document.getElementById("j1").innerHTML = "<h1>0</h1>";
        document.getElementById("j2").innerHTML = "<h1>0</h1>";
    };
}

function ObjTab(pY, pX) {
    "use strict";
    this.largo = 12;
    this.ancho = 60;
    this.posY = pY;
    this.posX = pX;
    this.elementoId = null;

    this.setElementId = function (id) {
        this.elementoId = id;
    };

    this.mover = function (direccion) {
        var paso = 10;
        if (direccion === "arriba" && this.posY >= 10) {
            this.posY = this.posY - paso;
        } else if (direccion === "abajo" && this.posY <= 230) {
            this.posY = this.posY + paso;
        }
        document.getElementById(this.elementoId).style.top = this.posY.toString() + "px";
    };

    this.moverIA = function (pelotaY) {
        var centroPaleta = this.posY + (this.ancho / 2);
        var centroPelota = pelotaY + 10;
        var margen = 15;
        var velocidadIA = 3;
        if (centroPelota < centroPaleta - margen && this.posY >= 10) {
            this.posY = this.posY - velocidadIA;
        } else if (centroPelota > centroPaleta + margen && this.posY <= 230) {
            this.posY = this.posY + velocidadIA;
        }
        document.getElementById(this.elementoId).style.top = this.posY.toString() + "px";
    };

    this.colisionAABB = function (pelota) {
        var paletaTop = this.posY;
        var paletaBottom = this.posY + this.ancho;
        var paletaLeft = this.posX;
        var paletaRight = this.posX + this.largo;
        var pelotaTop = pelota.posY;
        var pelotaBottom = pelota.posY + pelota.diametro;
        var pelotaLeft = pelota.posX;
        var pelotaRight = pelota.posX + pelota.diametro;

        return pelotaRight >= paletaLeft && pelotaLeft <= paletaRight &&
               pelotaBottom >= paletaTop && pelotaTop <= paletaBottom;
    };
}

function ObjGame() {
    "use strict";
    var campo, pelota, jugador1, ia;
    var teclas = {};
    var touchY = null;
    var enEjecucion = false;

    campo = new ObjCampo(600, 300);
    pelota = new ObjPelota((campo.largo / 2) - 10, (campo.ancho / 2) - 10);
    jugador1 = new ObjTab((campo.ancho / 2) - 30, 10);
    ia = new ObjTab((campo.ancho / 2) - 30, 578);
    jugador1.setElementId("jugador");
    ia.setElementId("ia");
    campo.verCampo();
    pelota.verPelota();

    document.addEventListener("keydown", function (e) {
        teclas[e.key.toLowerCase()] = true;
        if (e.key === "w" || e.key === "s") {
            e.preventDefault();
        }
    });

    document.addEventListener("keyup", function (e) {
        teclas[e.key.toLowerCase()] = false;
    });

    var campoEl = document.getElementById("campo");

    campoEl.addEventListener("touchstart", function (e) {
        e.preventDefault();
        touchY = e.touches[0].clientY;
    }, { passive: false });

    campoEl.addEventListener("touchmove", function (e) {
        e.preventDefault();
        if (touchY !== null) {
            var nuevoTouchY = e.touches[0].clientY;
            var diferencia = nuevoTouchY - touchY;
            if (Math.abs(diferencia) > 5) {
                if (diferencia < 0) {
                    jugador1.mover("arriba");
                } else {
                    jugador1.mover("abajo");
                }
                touchY = nuevoTouchY;
            }
        }
    }, { passive: false });

    campoEl.addEventListener("touchend", function () {
        touchY = null;
    });

    function procesarEntrada() {
        if (teclas["w"]) {
            jugador1.mover("arriba");
        }
        if (teclas["s"]) {
            jugador1.mover("abajo");
        }
    }

    function gameLoop() {
        if (!enEjecucion) {
            return;
        }
        procesarEntrada();
        ia.moverIA(pelota.posY);

        var colisionJugador = false;
        var colisionIa = false;

        if (jugador1.colisionAABB(pelota) && pelota.posX < jugador1.posX + jugador1.largo) {
            colisionJugador = true;
        }
        if (ia.colisionAABB(pelota) && pelota.posX + pelota.diametro > ia.posX) {
            colisionIa = true;
        }

        pelota.mover(campo.ancho, campo.largo, colisionJugador, colisionIa);
        requestAnimationFrame(gameLoop);
    }

    this.iniciar = function () {
        enEjecucion = true;
        var pantallaInicio = document.getElementById("pantalla-inicio");
        if (pantallaInicio) {
            pantallaInicio.style.display = "none";
        }
        requestAnimationFrame(gameLoop);
    };

    this.reiniciar = function () {
        pelota.resetearPuntos();
        pelota.reiniciar(campo.ancho, campo.largo);
        var monitor = document.getElementById("monitor");
        if (monitor) {
            monitor.innerHTML = "";
        }
    };
}

function inicio() {
    "use strict";
    game = new ObjGame();
}

window.onload = inicio;
