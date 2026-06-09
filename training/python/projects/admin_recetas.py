#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ----------------------------------------------------------------------------
# Created By  : J.Carlos
# Created Date: 19/12/2023
# version ='0.5'
# ---------------------------------------------------------------------------

import os
from pathlib import Path
from os import system

ruta = Path(os.getcwd(), "Recetas")


def inicio(ruta):
    opcion = 'x'

    while not opcion.isnumeric() or int(opcion) not in range(1, 7):
        limpiar_consola()
        print("-" * 120)
        print("\t Hola, bienvenido a tu recetario.")
        print(f"\t La ruta actual del recetarío es: {ruta}")
        print(f"\t El número actual de recetas es: {total_recetas(ruta)}")
        print("-" * 120)
        print("""
                ------------
                | Opciones |
                ------------    
                [1] Leer receta
                [2] Crear receta
                [3] Crear categoría
                [4] Eliminar receta
                [5] Eliminar categoría
                [6] Cerrar
            """)
        opcion = input("Selecciona una opción numérica de 1 - 6: ")

    return opcion


def listar_categorias(ruta):
    opcion = 'x'
    categorias = os.listdir(ruta)

    while not opcion.isnumeric() or int(opcion) not in range(1, len(categorias) + 1):
        limpiar_consola()
        contador = 1
        for categoria in categorias:
            print(f"[{contador}] - {categoria}")
            contador += 1
        opcion = input("Selecciona el número de categoría: ")

    return categorias[(int(opcion) - 1)]


def crear_categoria(ruta):
    existe = False

    while not existe:
        limpiar_consola()
        nombre_categoria = input("Introduce un nombre de catagoría: ")
        ruta_nueva = Path(ruta, nombre_categoria)
        if not os.path.exists(ruta_nueva):
            Path.mkdir(ruta_nueva)
            input(f"Tu nueva categoria {nombre_categoria} ha sido creada ...presiona enter para volver a inicio")
            existe = True
        else:
            input("Lo siento, esa categoria ya existe ...presiona enter para volver")



def eliminar_categoria(ruta):
    print("Eliminar categoría\n")
    ruta = Path(ruta, listar_categorias(ruta))
    Path.rmdir(ruta)


def listar_recetas(ruta):
    opcion = 'x'
    directorio = Path(ruta)

    while not opcion.isnumeric() or int(opcion) not in range(1, total_recetas(directorio) + 1):
        limpiar_consola()
        contador = 1
        for archivo in directorio.glob("**/*.txt"):
            print(f"[{contador}] {archivo.stem}")
            contador += 1
        opcion = input("Indica el número de receta: ")

    ruta = Path(ruta, os.listdir(directorio)[int(opcion) - 1])

    return ruta


def leer_receta(ruta):
    ruta_categoria = Path(ruta, listar_categorias(ruta))
    if total_recetas(ruta_categoria) != 0:
        ruta_receta = Path(listar_recetas(ruta_categoria))
        archivo = open(ruta_receta)
        print(archivo.read())  # Pinta el contenido del fichero
        input("\n Presiona enter para volver a inicio")
        archivo.close()
    else:
        input("Categoría vacía presiona enter para volver a inicio")


def crear_receta(ruta):
    existe = False

    while not existe:
        limpiar_consola()
        categoria = listar_categorias(ruta)
        nombre_receta = input("Nombre de la receta: ") + '.txt'
        ruta_nueva = Path(ruta, categoria, nombre_receta)
        if not os.path.exists(ruta_nueva):
            print("Escribe tu nueva receta: ")
            contenido_receta = input()
            Path.write_text(ruta_nueva, contenido_receta)
            input(f"Tu receta {nombre_receta} ha sido creada ...presiona enter para volver a inicio")
            existe = True
        else:
            input("Lo siento, esa receta ya existe ...presiona enter para volver")


def eliminar_receta(ruta):
    ruta_categoria = Path(ruta, listar_categorias(ruta))
    if total_recetas(ruta_categoria) != 0:
        receta_eliminada = Path(listar_recetas(ruta_categoria))
        input(f"Eliminada receta {receta_eliminada.name} ...presiona enter para volver a inicio")
        receta_eliminada.unlink()
    else:
        input("Categoría vacía presiona enter para volver a inicio")


def total_recetas(ruta):
    cantidad = 0

    for path in Path(ruta).glob("**/*.txt"):
        cantidad += 1

    return cantidad


def limpiar_consola():
    return system("cls" if os.name in ("nt", "dos") else "clear")


finalizar_programa = False

while not finalizar_programa:
    opcion_menu = inicio(ruta)

    if opcion_menu == '1':
        leer_receta(ruta)
    elif opcion_menu == '2':
        crear_receta(ruta)
    elif opcion_menu == '3':
        crear_categoria(ruta)
    elif opcion_menu == '4':
        eliminar_receta(ruta)
    elif opcion_menu == '5':
        eliminar_categoria(ruta)
    elif opcion_menu == '6':
        finalizar_programa = True
        print("Cerrando programa... ")