@echo off

color 70

:menu
echo ********************
echo *     COMANDOS     *
echo ********************

echo 1 - Comandos Basicos
echo 2 - Teoria
echo 8 - Salir

echo Selecciona una opcion:
set /p opcion=
cls
if %opcion%==1 goto op1
if %opcion%==2 goto menu2
if %opcion%==8 goto exit

:menu2
echo ********************
echo *      TEORIA      *
echo ********************

echo 1 - Copias de Seguridad
echo 2 - RAIDS

echo Selecciona una opcion:
set /p opcion=
cls
if %opcion%==1 goto m1
if %opcion%==2 goto m2

:op1
echo **********************************************************************
echo * set /p nomVariable= * Inicia una variable con nomVariable          *
echo * edit:               * Crea un archivo                              *
echo * Estructura edit:    * edit nombreFichero                           *
echo * mkdir:              * Crea un directorio                           *
echo * Estructura mkdir:   * mkdir nombreCarpeta                          *
echo * rd:                 * Borra un directorio                          *
echo * Estructura rd:      * rd carpeta                                   *
echo * copy:               * copiar archivos                              *
echo * Estructura copy:    * copy origen \destino                         *
echo * dir:                * Muestra la lista de archivos y directorios   *
echo **********************************************************************
pause
cls
goto menu

:m2
echo ---- RAIDS ----
echo Raid 0: Distribuido //suma capacidad igual o la mas pequeña del disco
echo Raid 1: Espejo // pierde el 50% de capacidad
echo Raid 3: Distribuido con bloque de paridad //suma todos los discos excepto 1
echo Raid 5: Con paridad distribuida //suma todos los discos excepto 1
echo Raid 10: Espejo con distribucion 4 discos
echo Raid 01: Distribuido y espejo 4 discos
pause
cls
goto :menu

:m1
echo ---- Copias de Seguridad ----
echo Completa: Copia de todos los datos
echo Diferencial: Copia todo desde la ultima modificacion del total 
echo Incremental: Copia sólo lo que se modificase desde la ultima copia de cualquier tipo
pause
cls
goto menu

:exit
exit
