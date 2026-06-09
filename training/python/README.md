# Comandos básicos python

## Indice

- [Comandos básicos python](#comandos-básicos-python)
  - [Indice](#indice)
  - [Operadores](#operadores)
  - [Tipos de datos](#tipos-de-datos)
    - [Strings](#strings)
  - [if](#if)
  - [for](#for)
  - [while](#while)
  - [Print](#print)
  - [Input](#input)
  - [Index](#index)
    - [Substrings](#substrings)
  - [Open, Read y Write](#open-read-y-write)
  - [Directorios](#directorios)
    - [Os - *Importado*](#os---importado)
    - [Path - *Importado*](#path---importado)


## Operadores

| Operador       | Símbolo |
| :------------- | :-----: |
| Suma           |    +    |
| Resta          |    -    |
| Multiplicación |   \*    |
| División       |    /    |
| Cociente       |   //    |
| Resto          |    %    |
| Potencia       |  \*\*   |
| Raíz cuadrada  | \*\*0.5 |

| Operadores lógicos | Símbolo |
| :----------------- | :-----: |
| Igual              |   ==    |
| Diferente          |   !=    |
| Mayor              |    >    |
| Menor              |    <    |
| Mayor igual        |   >=    |
| Menor igual        |   <=    |
| y                  |   and   |
| o                  |   or    |
| no                 |   not   |

## Tipos de datos

| Tipo de dato |      Operación       |
| :----------- | :------------------: |
| int          |      numero = 1      |
| float        |     numero = 1.2     |
| string       | texto = "Hola mundo" |
| boolean      |  valor= true/false   |

### Strings

La \ indica que debe ser tratado como un caracter especial.

| Carac. especiales | Operación |
| :---------------- | :-------: |
| Comillas          |    \"     |
| Salto de línea    |    \n     |
| Tabular           |    \t     |
| Barra             |    \\     |

**Notas:**
```python
type(variable) #Nos indica de que tipo es una variable.
float(variable) #Convierte un entero a decimal
int(variable) #Convierte un decimal a entero
```

## if
Estructuras condicionales:
```python
if 12 > 6:
  print("Test if 12 > 6")
elif false != true and true:
  print("Test elif")
else:
  print("Test else")
```
## for
```python
lista = ["Dato1", "Dato2", "Dato3"]
mi_tuple = (1, "dos", [3.33,"cuatro"], (5.0, 6))
mi_diccionario = {"Título":"Documento 1", "Formato":".doc", "Tamano":"15mb"}

for valor in lista:
  print(f"Valores lista: {valor}")

for t in mi_tuple:
  print(f"Valores tupla: {t}")

for d in mi_diccionario.values():
  print(f"Valores diccionario: {d}")

for k, v in mi_diccionario.items():
  print(f"Clave/Valor diccionario: {k} -> {v}")
```
## while
```python
i = 0
while 2 > i:
  print(f"Test while {i}")
  i = i + 1
else:
  print(f"Final while {i}")
```


## Print

```python
print("Hola mundo") #Pintar una línea de texto
print("""
Bloque
de
texto
""")
print("Hola" + " " + "mundo") #Concatenar cadenas de texto
print("Comillas: \" " + "Barra: \\ " + " \t Tabulador" + "\n Salto linea " )
print(100 + 120) #Pintar operaciones con print
```
Se pueden pintar variables dentro del print formateando la cádena usando print(f"{}") o print("texto {}".format(valor))

**Ejemplos:**
```python
#Formateo antiguo
print("Valor actual {} nuevo valor {}".format(valor_actual, valor_nuevo))
#Formateo actual
print(f"Permite pintar variables usando {variable}")
```

## Input

Muestra el texto y permite almacenar lo escrito

```python
input("Introduce texto: ")
```

## Index
Función: index(valor, inicio, fin)

**Ejemplos:**
```python
parrafo = """Utilizamos el método index( ) para explorar strings, ya que permite hallar el índice de aparición de un caracter o cadena de caracteres dentro de un texto dado."""
print(parrafo.index("explorar"))
print(parrafo.rindex("explorar"))
print(parrafo[2])
```

### Substrings
Selecciona los caracterés del texto comprendido entre dos indices

**Ejemplo:**
```python
mi_texto = "Hola_mundo"
mi_texto[0:4] #Muestra el texto de la posición dada "Hola"
mi_texto[2::3] #Muestra el texto de la posición dada "lmd"
mi_texto[::-1] #Muestra el texto al revés "odnum_aloH"
```
## Open, Read y Write
- Abrir un archivo: `open('archivo', 'modo')`
  - archivo -> documento a abrir
  - modo -> Parametros de apertura (r, a, w, x):
    - **Read**(Lectura): `open('archivo.txt', 'r')`
    - **Append**(Añadir): `open('archivo.txt', 'a')`
    - **Write**(Escritura): `open('archivo.txt', 'w')`
    - **Create**(Crear): `open('archivo.txt', 'x')`
La función `open()` devuelve un objeto de tipo archivo al que se le pueden aplicar los metodos:
- Leer un archivo de texto: `obj_archivo.read()`
- Pintar una linea del archivo: `obj_archivo.readline()`
- Devolver una lista con las lineas: `obj_archivo.readlines()` (Usar solo con archivos pequeños)
  
**Ejemplos read:**
```python
archivo = open('text.txt')
print(archivo.read()) #Pinta el contenido del fichero
print(archivo.readline()) #Pinta una linea del archivo por cada ejecución del readline
print(archivo.readline().rstrip()) #rstrip evita el salto de linea en los archivos
print(archivo.readline().upper()) #upper pinta la linea en mayúsculas 
print(archivo.readlines()) #Devuelve una lista 
archivo.close()
```
- Escribir en el archivo: `obj_archivo.write('Texto')`

**Ejemplos write:**
```python
archivo = open('text.txt', 'w') #Con w sustituye todo el archivo
#archivo = open('text.txt', 'a') #Con a añade al final del archivo
archivo.write("Nuevo texto") #Pinta en una línea
archivo.write('''Texto en
varias
líneas''')
archivo.close()
```                    
- Cerrar archivo abierto: `obj_archivo.close()`

**Nota:** El objeto obj_archivo una vez abierto se puede iterar con un bucle for: `for linea in obj_archivo:`

## Directorios

### Os - *Importado*
Se importa -> **import** os
Lo usamos para trabajar con archivos que están en dirtectorios diferentes a nuestro código.

- Obtener directorio actual: `os.getcwd()`
- Cambiar de directorio: `os.chdir(ruta)`

**Ejemplo:**
```python
import os

#Abrir archivo.txt en ruta C:\Users\Carpeta\archivo.txt
os.chdir('C:\\Users\\Carpeta') #Ejemplo ruta windows
archivo = open('archivo.txt') #Abre el archivo dentro del nuevo directorio
archivo.read() #Leemos el archivo

#Recuperar la siguiente ruta: C:\Users\Carpeta\archivo.txt
ruta = 'C:\\Users\\Carpeta\\archivo.txt'
os.path.basename(ruta) #Obtiene el valor archivo.txt
os.path.dirname(ruta) #Obtiene la ruta C:\\Users\\Carpeta
os.path.split(ruta) #Devuelve la ruta C:\\Users\\Carpeta y el nombre de base
``` 
- Borrar directorio: `os.rmdir(ruta)` (Indicar ruta completa de carpeta a borrar)
- Crear carpeta/carpetas: `os.makedirs(ruta)`

### Path - *Importado*
Se importa -> **from** pathlib **import** Path
La clase path permite leer estructuras de carpetas y archivos.

- Directorio raiz: `Path.home()`
- Ruta relativa: `Path("Carpeta_1", "Carpeta_2", "archivo.md")`
- Ruta absoluta: `Path(Path.home(), "Carpeta_1", "Carpeta_2", "archivo.md")`
- Devolver un nuevo objeto path cambiando el nombre de archivo: `Path.home().with_name('prueba.txt')`
```python
from pathlib import Path

base = Path.home()
ruta = Path("Carpeta", "mi_texto.txt") #Ruta completa con mi_texto.txt
ruta2 = ruta.with_name('prueba.txt') #Ruta completa con prueba.txt
```
- Devolver padre inmediato de una ruta de archivos: `ruta.parent` se pueden ir añadiendo más .parent para ir subiendo de carpeta.
- Buscar dentro de una ruta:
```python
from pathlib import Path

base = Path.home()
#Busca en la carpeta base archivos txt
for archivo in Path(base).glob("*.txt"):
  print(archivo)
#Busca en todas las carpetas y subcarpetas los archivos txt
for archivo in Path(base).glob("**/*.txt"): 
  print(archivo)
```
