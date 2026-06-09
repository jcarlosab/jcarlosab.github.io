from random import *

# La primitiva
tambor_principal = list(range(1, 50))
tambor_reintrego = list(range(1, 10))

def obtener_resultado(tambor):
    resultado = []
    rango = 0
    if len(tambor) == 49:
        rango = 6
    else:
        rango = 1
    for num in range(rango):
        resultado.append(shuffle(tambor).pop(randint(0, len(tambor) - 1)))
    return sorted(resultado)

def apuesta():
    numeros = []
    reintegro = []
    print("Introduce 6 números del 1 al 49") #Pendiente de añadir comprobación
    for num in range(6):
        numeros.append(int(input(f"Número {num}: ")))
    reintegro.append(int(input("Introduce un número del 1 al 9 para reintegro: ")))
    return numeros, reintegro

def comprobar_resultado(numeros, reintegro, tambor_1, tambor_2):
    print(f"Resultados, números: {tambor_1} | reintrego: {tambor_2}")
    print(f"Tu apuesta, números: {numeros} | reintrego: {reintegro}")
    resultado_1 = set(tambor_1).intersection(set(numeros))
    resultado_2 = set(tambor_2).intersection(set(reintegro))
    print(f"Resultado: Números acertados {len(resultado_1)} Reintegro {len(resultado_2)}")

numeros,reintegro = apuesta()
tambor_1 = obtener_resultado(tambor_principal)
tambor_2 = obtener_resultado(tambor_reintrego)
comprobar_resultado(numeros, reintegro, tambor_1, tambor_2)
