from random import *

#test git
lista_juegos = ["Final Fantasy", "Super Mario", "Sonic"]
mi_tuple = (1, "dos", [3.33,"cuatro"], (5.0, 6))
mi_diccionario = {"Título":"Final Fantasy", "Genero":"rpg", "Desarrolladora":"SquareEnix"}
def ejemplos_print():
    #Print - print()
    print("-------- PRINT --------")
    print("Hola Mundo")
    print("Hola" + " " + "Mundo")
    print("Comillas: \" " + "Barra: \\ " + " \t Tabulador" + "\n Salto linea " )
    print(100 + 120)
    print("-------- FIN PRINT -------- \n")
def ejemplos_input():
    #Inputs
    print("Texto introducido:" + input("Introduce texto: "))
def ejemplos_operadores():
    #Operadores
    print("-------- OPERADORES --------")
    print("""Suma: +
    Resta: -
    Multiplicación: *
    División: /
    Cociente: //
    Resto: %
    Potencia: **
    Raíz cuadrada: **0.5""")
    print("-------- FIN OPERADORES -------- \n")
def ejemplos_operadores_logicos():
    #Operadores lógicos
    print("-------- OPERADORES LOGICOS --------")
    print("""Igual a: ==
    Diferente a: !=
    Mayor que: >
    Menor que: <
    Mayor o igual que: >=
    Menor o igual que: <=
    y: and
    o: or
    no: not""")
    print("-------- FIN OPERADORES LOGICOS -------- \n")
def ejemplos_tipos_datos():
    #Tipos de datos
    print("-------- TIPOS DE DATOS --------")
    num1 = 7
    num2 = 7.7
    text = "Hola"
    val = False
    print(f"Valor número entero {num1} tipo {type(num1)}")
    print(f"Valor número decimal {num2} tipo {type(num2)}")
    print(f"Valor texto {text} tipo {type(text)}")
    print(f"Valor boolean {val} tipo {type(val)}")
    print(f"Conversión número entero {num1} a decimal [float()] {float(num1)} tipo {type(float(num1))}")
    print(f"Conversión número decimal {num2} a entero [int()] {int(num2)} tipo {type(int(num2))}")
    print("-------- FIN TIPOS DE DATOS -------- \n")
def ejemplos_formatear_cadenas():
    #Formatear cadenas
    print("-------- FORMATEAR CADENAS --------")
    valor_actual = 99
    valor_nuevo = "XX"
    print("Valor actual {} nuevo valor {}".format(valor_actual, valor_nuevo))
    print(f"Valor actual {valor_actual} nuevo valor {valor_nuevo}")
    print("-------- FIN FORMATEAR CADENAS -------- \n")

def ejemplos_redondeo():
    #Redondeo - round(num, ndigits)
    print("-------- REDONDEO --------")
    print(f"100/3 = {100/3} redondeo [round()] {round(100/3)}")
    print(f"100/3 = {12/7,2} redondeo [round()] {round(12/7,2)}")
    print(f"100/3 = {100/3} redondeo [round(num, ndigits)] {round(100/3, 3)}")
    print("-------- FIN REDONDEO -------- \n")

def ejemplos_index():
    #Index - index(value, start, end)
    print("-------- INDEX --------")
    parrafo = """Utilizamos el método index( ) para explorar strings, ya que
    permite hallar el índice de aparición de un caracter o cadena de
    caracteres dentro de un texto dado."""
    print(parrafo.index("explorar"))
    print(parrafo.rindex("explorar"))
    print(parrafo[2])
    print("-------- FIN INDEX -------- \n")

def ejemplos_substrings():
    #Substrings
    print("-------- SUBSTRINGS --------")
    substrText = "Hola_mundo"
    print(f"Substring de substrText[0:4] {substrText[0:4]}")
    print(f"Substring de substrText[2::3] {substrText[2::3]}")
    print(f"Substring de substrText[::-1] {substrText[::-1]}")
    print("-------- FIN SUBSTRINGS -------- \n")

def ejemplos_strings():
    #Metodos Strings
    print("-------- METODOS STRINGS --------")
    hola_mundo = "Hola mundo"
    numeros = "123456"
    alfabetico = "abcdefg"
    cadena = "Hola \n mundo"
    parrafo = "Prueba texto para funcion"
    mituple = ("ps1", "ps2", "ps3")
    midict = {"nombre":"Jose", "apellidos":"Barros"}
    print("----- Análisis -----")
    print(f"Método count() | Test cuenta repeticiones de 'Hola' en 'Hola mundo': {hola_mundo.count('Hola')}")
    print(f"Método find() | Test buscar 'Hola' en 'Hola mundo': {hola_mundo.find('Hola')}")
    print(f"Método find() | Test buscar '123' en 'Hola mundo': {hola_mundo.find('123')}")
    print(f"Método rfind() | Test buscar desde el final 'Hola' en 'Hola mundo': {hola_mundo.rfind('Hola')}")
    print(f"Método index() | Test buscar 'Hola' en 'Hola mundo': {hola_mundo.index('Hola')}")
    print(f"Método rindex() | Test buscar desde el final 'Hola' en 'Hola mundo': {hola_mundo.rindex('Hola')}")
    print(f"Método startswith() | Test 'Hola mundo' empieza con 'Hola': {hola_mundo.startswith('Hola')}")
    print(f"Método endswith() | Test 'Hola mundo' acaba con 'Hola': {hola_mundo.endswith('Hola')}")
    print(f"Método isdigit() | Test dígitos '123456': {numeros.isdigit()}")
    print(f"Método isnumeric() | Test números '123456': {numeros.isnumeric()}")
    print(f"Método isdecimal() | Test decimales '123456': {numeros.isdecimal()}")
    print(f"Método isalnum() | Test alfanuméricos '123456': {numeros.isalnum()}")
    print(f"Método isalpha() | Test alfabéticos 'abcdefg': {alfabetico.isalpha()}")
    print(f"Método islower() | Test todo minúsculas 'abcdefg': {alfabetico.islower()}")
    print(f"Método isupper() | Test todo mayúsculas 'abcdefg': {alfabetico.isupper()}")
    print(f"Método isprintable() | Test imprimibles 'abcdefg' (no son caracteres especiales): {alfabetico.isprintable()}")
    print(f"Método isspace() | Test espacios '   ' solo espacios: {'  '.isspace()}")
    print("--------------------")
    print("----- Transformación -----")
    print(f"Método capitalize() | Test primera letra en mayúscula 'abcdefg': {alfabetico.capitalize()}")
    print(f"Método encode() | Test codifica la cadena con el mapa de caracteres especificado y retorna una instancia del tipo byte 'abcdefg': {alfabetico.encode('utf-8')}")
    print(f"Método replace() | Test reemplazar 'mundo' por 'mundo2' en 'Hola mundo': {hola_mundo.replace('mundo', 'mundo2')}")
    print(f"Método lower() | Test todo a minúsculas 'ABC': {'ABC'.lower()}")
    print(f"Método upper() | Test todo a mayúsculas 'abc': {'abc'.upper()}")
    print(f"Método swapcase() | Test cambia minúsculas por mayúsculas 'Ja Ja Ja Ja Ja': {'Ja Ja Ja Ja Ja'.swapcase()}")
    print(f"Método strip() | Test quita espacios en blanco izquierda y derecha en '  Hola   ': {'  Hola   '.strip()} FIN")
    print(f"Método lstrip() | Test quita espacios en blanco izquierda  en '  Hola   ': {'  Hola   '.lstrip()} FIN")
    print(f"Método rstrip() | Test quita espacios en blanco derecha  en '  Hola   ': {'  Hola   '.rstrip()} FIN")
    print(f"Método center() | Test alinear al centro 'abc': {'abc'.center(20, ' ')}")
    print(f"Método ljust() | Test alinear a la izquierda 'abc': {'abc'.ljust(20, ' ')}")
    print(f"Método rjust() | Test alinear a la derecha 'abc': {'abc'.rjust(20, ' ')}")
    print("--------------------------")
    print("----- Separación y unión -----")
    print(f"Método split() | Test separar cadena por defecto ('1 2 3 4 5 6'.split()) '1 2 3 4 5 6': {'1 2 3 4 5 6'.split()}")
    print(f"Método split() | Test separar cadena por guiones ('1-2-3'.split('-')) '1-2-3': {'1-2-3'.split('-')}")
    print(f"Método splitlines() | Test dividir con salto de linea 'Hola \\n mundo': {cadena.splitlines()}")
    print(f"Método partition() | Test partition parte texto en tres partes {parrafo.partition('texto')}")
    print(f"Método rpartition() | Test rpartition parte texto en tres partes {parrafo.rpartition('texto')}")
    print(f"Método join() | Test join tuple sin separador {''.join(mituple)}")
    print(f"Método join() | Test join tuple con separador '#' {'#'.join(mituple)}")
    print(f"Método join() | Test join diccionario con separador '#' {'#'.join(midict)}")
    print("------------------------------")
    print("-------- FIN METODOS STRINGS -------- \n")

def ejemplos_prop_strings(hola_mundo):
    #Propiedades Strings
    print("-------- PROPIEDADES STRINGS --------")
    print(f"Concatenar esta cadena con +" + " cadena nueva")
    print(f"Multiplicar linea *3 \n"*3)
    print(f"Determinar su longitud con len('Hola mundo'): {len(hola_mundo)}")
    print(f"Verificar su contenido  in 'Hola' in 'Hola mundo': {'Hola' in hola_mundo}")
    print(f"Verificar su contenido  not in 'Hola' not in 'Hola mundo': {'Hola' not in hola_mundo}")
    print("-------- FIN PROPIEDADES STRINGS -------- \n")

def ejemplos_listas():
    #Listas
    print("-------- LISTAS --------")
    lista_juegos = ["Final Fantasy", "Super Mario", "Sonic"]
    lista_consolas = ["PS5", "XBOX", "SW"]
    print(f"Listas: juegos -> {lista_juegos} y consolas -> {lista_consolas}")
    print(f"Indexado juegos: {lista_juegos[0:2]}")
    print(f"Número de elementos consolas: {len(lista_consolas)}")
    print(f"Concatenación: {lista_consolas + lista_juegos}")
    lista_juegos.append('Death Stranding')
    print(f"Método append() | Test append añadir 'Death Stranding' a la lista de juegos {lista_juegos}")
    lista_juegos.pop(1)
    print(f"Método pop() | Test pop eliminar elemento de la posición 1 {lista_juegos}")
    lista_juegos.sort()
    print(f"Método sort() | Test sort ordenar lista {lista_juegos}")
    lista_juegos.reverse()
    print(f"Método reverse() | Test reverse invertir orden de la lista {lista_juegos}")
    print("-------- FIN LISTAS -------- \n")

def ejemplos_diccionarios():
    #Diccionarios
    print("-------- DICCIONARIOS --------")
    print(mi_diccionario)
    print(f"Acceso a Desarrolladora en el diccionario {mi_diccionario['Desarrolladora']}")
    print("-------- FIN DICCIONARIOS -------- \n")

def ejemplos_tuples():
    #Tuples
    lista_tuple = list(mi_tuple)
    a, b, c, d = mi_tuple
    print("-------- TUPLES --------")
    print(mi_tuple)
    print(f"Pintar posición 3: {mi_tuple[2]}")
    print(f"Transformar a lista list(mi_tuple): {lista_tuple}")
    print(f"Pintar unpacking a: {a}")
    print(f"Pintar unpacking b: {b}")
    print(f"Pintar unpacking c: {c}")
    print(f"Pintar unpacking d: {d}")
    print("-------- FIN TUPLES -------- \n")
def ejemplos_sets():
    #Sets
    print("-------- SETS --------")
    mi_set_a = {1, 2,"tres"}
    mi_set_b = {3,"tres"}
    print(mi_set_a)
    mi_set_a.add(5)
    print(f"Método add() | Test add {mi_set_a}")
    mi_set_c = mi_set_a.copy()
    print(f"Método copy() | Test copy {mi_set_c}")
    mi_set_c.clear()
    print(f"Método clear() | Test clear {mi_set_c}")
    print(f"Método difference() | Test clear {mi_set_c}")
    print(f"Método difference_update() | Test clear {mi_set_c}")
    print(f"Método discard() | Test clear {mi_set_c}")
    print(f"Método intersection() | Test clear {mi_set_c}")
    print(f"Método intersection_update() | Test clear {mi_set_c}")
    print(f"Método isdisjoint() | Test clear {mi_set_c}")
    print(f"Método issubset() | Test clear {mi_set_c}")
    print(f"Método issuperset() | Test clear {mi_set_c}")
    print(f"Método pop() | Test clear {mi_set_c}")
    print(f"Método remove() | Test clear {mi_set_c}")
    print(f"Método symmetric_difference() | Test clear {mi_set_c}")
    print(f"Método symmetric_difference_update() | Test clear {mi_set_c}")
    print(f"Método union() | Test clear {mi_set_c}")
    print(f"Método update() | Test clear {mi_set_c}")
    print("-------- FIN SETS -------- \n")

def ejemplos_if():
    #If
    print("-------- IF --------")
    if 12 > 6:
        print("Test if 12 > 6")
    elif false != true and true:
        print("Test elif")
    else:
        print("Test else")
    print("-------- FIN IF -------- \n")
def ejemplos_for():
    #Bucles for
    print("-------- FOR --------")
    for lj in lista_juegos:
        print(f"Valores lista: {lj}")

    for t in mi_tuple:
        print(f"Valores tupla: {t}")

    for d in mi_diccionario.values():
        print(f"Valores diccionario: {d}")

    for k, v in mi_diccionario.items():
        print(f"Clave/Valor diccionario: {k} -> {v}")
    print("-------- FIN FOR -------- \n")

def ejemplos_while():
    #Bucles while
    print("-------- WHILE --------")
    i = 0
    while 2 > i:
        print(f"Test while {i}")
        i = i + 1
    else:
        print(f"Final while {i}")

    print("-------- FIN WHILE -------- \n")

def ejemplos_range():
    #range()
    print("-------- RANGE --------")
    rangos = range(5, 30, 2)
    print(f"range(5, 30, 2) {list(rangos)}")
    print("-------- FIN RANGE -------- \n")

def ejemplos_enumerate():
    #enumerate()
    print("-------- ENUMERATE --------")
    enum1 = enumerate("Final")
    enum2 = enumerate("Fantasy", 2)
    enum3 = enumerate([4.25, 7, 2])
    print(f"enumerate('Final') {list(enum1)}")
    print(f"enumerate('Fantasy',2) {list(enum2)}")
    for i, n in enum3:
        print(f"Enumerate recorrido con for Indice/Numero {i} -> {n}")
    print("-------- FIN ENUMERATE -------- \n")

def ejemplos_zip():
    #zip()
    print("-------- ZIP --------")
    palabras = ["hola", "Metro", "Consola", "Tablet"]
    lst_numeros = [20, 30, 26]
    for palabra, num in zip(palabras, lst_numeros):
        print(f'Palabra: {palabra}, y Número: {num}')
    print("-------- FIN ZIP -------- \n")

def ejemplos_min_max():
    #min() and max()
    print("-------- MIN & MAX --------")
    ciudades_habitantes = {"Tijuana":1810645, "León":1579803}
    lista_valores = [5**5, 12**2, 3050, 475*2]
    print(f"Lista de ciudades: {ciudades_habitantes}")
    print(f"Lista de valores: {lista_valores}")
    print(f"Mínimo [min()] habitantes key: {min(ciudades_habitantes.keys())}")
    print(f"Máximo [max()] habitantes value: {max(ciudades_habitantes.values())}")
    print(f"Máximo [max()] lista valores: {max(lista_valores)}")
    print("-------- FIN MIN & MAX -------- \n")

def ejemplos_random():
    #random
    print("-------- RANDOM --------")
    print("Importar madulo: from random import *")
    print(f"Método randint() | Test rango int entre dos valores 10 y 30: {randint(10, 30)}")
    print(f"Método uniform() | Test rango float entre dos valores 2.8 y 3.9: {uniform(2.8, 3.9)}")
    print(f"Método random() | Test random float entre 0 y 1: {random()}")
    print(f"Lista juegos: {lista_juegos}")
    print(f"Método choice() | Test choize elemento al hazar de lista_juegos: {choice(lista_juegos)}")
    print(f"Lista juegos antes del shuffle: {lista_juegos}")
    shuffle(lista_juegos)
    print(f"Método shuffle() | Test shuffle {lista_juegos}")
    print("-------- FIN RANDOM -------- \n")

def ejemplos_compresion_listas():
    #Compresión de listas
    print("-------- COMPRESION DE LISTAS --------")
    nueva_lista = [num**2 for num in range(10) if num < 5]
    print(nueva_lista)
    print("-------- FIN COMPRESION DE LISTAS -------- \n")

#Funciones return
def saludo(palabra):
    if palabra == 'Hola':
        a = "Hola"
    else:
        a = "Dime 'Hola'"
    return a
def saludo_cpu_1(a):
    if a == 'Hola':
        b = "cpu 1"
    else:
        b = "cpu 1: ..."
    return b

def saludo_cpu_2(a,b):
    if a == 'Hola':
        c = "Hola " + b
    else:
        c = "cpu 2: ..."
    return c

#*args
def ejemplo_funcion_args(dato_1, dato_2, *args):
    print(f"Dato 1: {dato_1}")
    print(f"Dato 2: {dato_2}")
    print(f"Args: {args}")

# *kwargs
def ejemplo_funcion_kwargs(**kwargs):
    print(f"kwargs: {kwargs}")



ejemplos_print()
#ejemplos_input()
ejemplos_operadores()
ejemplos_operadores_logicos()
ejemplos_tipos_datos()

ejemplos_formatear_cadenas()
ejemplos_redondeo()
ejemplos_index()
ejemplos_strings()
ejemplos_substrings()
ejemplos_prop_strings("Hola mundo")

ejemplos_listas()
ejemplos_compresion_listas()
ejemplos_diccionarios()
ejemplos_tuples()
ejemplos_sets()

ejemplos_if()
ejemplos_for()
ejemplos_while()
ejemplos_range()
ejemplos_enumerate()
ejemplos_zip()
ejemplos_min_max()
ejemplos_random()

print(saludo("Hola"))
print(saludo("??"))
print(saludo_cpu_1(saludo("H")))
print(saludo_cpu_2(saludo("Hola"), saludo_cpu_1(saludo("Hola"))))

print("Llamada a función sin pasar args")
ejemplo_funcion_args(7, "Final")
print("Llamada a función pasando args")
ejemplo_funcion_args(7, "Final", 45, 456, "Otros")
print("Llamada a función pasando kwargs")
ejemplo_funcion_kwargs(color="rojo", ruedas=4, puertas=5, motor="Gasolina")

#Template
print("-------- TEMPLATE --------")
print("-------- FIN TEMPLATE -------- \n")
