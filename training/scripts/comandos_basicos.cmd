@echo off

Color 70

:Menu

echo ***************************
echo *  MENU COMANDOS BASICOS  *
echo ***************************

echo 1- CREAR UN FICHERO DE TEXTO CON EDIT
echo 2- CREAR UNA CARPETA
echo 3- ELIMINAR UNA CARPETA
echo 4- COPIAR FICHEROS CON UNA EXTENSION A UNA CARPETA
echo 5- BUSCAR UN FICHERO EN TODO EL DISCO
echo 6- SALIR

set /p opcion=Seleccionar una opcion: 
cls
if %opcion%==1 goto Op1
if %opcion%==2 goto Op2
if %opcion%==3 goto Op3
if %opcion%==4 goto Op4
if %opcion%==5 goto Op5
if %opcion%==6 goto Salir

:Op1
echo Crear Fichero de Texto
set /p texto=
edit %texto%.txt
echo >> %texto%.txt
pause
cls
goto Menu

:Op2
echo Indicar Nombre carpeta
set /p carpeta=
mkdir %carpeta%
pause
cls
goto Menu

:Op3
echo Indicar Nombre carpeta a Borrar
set /p carpeta=
if exist %carpeta% (
rd %carpeta%
) else (
echo Carpeta no existe
)
pause
cls
goto Menu

:Op4
dir /S C:
echo Indicar fichero a copiar
set /p cpy=
cls
dir
echo Indicar carpeta
set /p folder=
copy %cpy% %folder%
pause
cls
goto Menu

:Op5
echo Nombre de fichero a buscar
set /p search=
dir /S %search%
pause
cls
goto Menu

:Salir
Exit


