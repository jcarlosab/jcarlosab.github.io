from random import choice

# lista con palabras
# vidas
# Inicio juego
# Funcion seleccionar palabra
# Funcion para pedir letra
# Funcion para comprobar si existe letra
# Funcion para validar victoria
# Fin juego

lista_palabras = ["coche", "animal", "tortuga", "juego", "ordenador", "teclado", "portatil"]
vidas = "♥♥♥♥♥♥"
aux = []

def inicio_juego(lstPalabras):
    lstLetras = list(choice(lista_palabras))
    palabraOculta = ocultar_revelar_letra("",lstLetras)
    print(f"Vidas iniciales: {vidas}")
    print(f"Adivina la siguiente palabra: {palabraOculta}")
    return lstLetras

def ocultar_revelar_letra(valor, lstLetras):
    palabraOculta = "[  "
    for letra in lstLetras:
        if valor == letra:
            palabraOculta += letra
        else:
            palabraOculta += "_"
    palabraOculta += "  ]"
    return palabraOculta

def pedir_letra():
    valor = ""
    while len(valor) != 1:
        valor = input("Indica una letra: ")
        if len(valor) != 1:
            print("Valor no valido")
    return valor

def comprobar(valor, lstLetrasPalabra):
    palabraOculta = ocultar_revelar_letra(valor, lstLetrasPalabra)
    if valor in lstLetrasPalabra:
        print(palabraOculta)
    else:
        print(palabraOculta)
        return restar_vidas(1)

def restar_vidas(num):
    print(f"Vidas actuales: {vidas[0:len(vidas) - num]}")
    return vidas[0:len(vidas) - num]

def fin_juego(vidas):
    if len(vidas) > 0:
        print("HAS GANADO")
    else:
        print("HAS PERDIDO")

lstLetrasPalabra = inicio_juego(lista_palabras)

while len(vidas) > 0:
    vidas = comprobar(pedir_letra(), lstLetrasPalabra)

fin_juego()