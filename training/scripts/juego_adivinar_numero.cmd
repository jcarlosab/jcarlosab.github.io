@echo off
:inicio
set /a resp=%random:~0,2%


echo ************************
echo *  ADIVINAR NUMERO     *
echo ************************

echo 1- JUGAR
echo 2- SALIR


set /p opcion=
if %opcion%==1 goto play
if %opcion%==2 goto salir

:play
echo Introduce Numero
set /p num=
if %num% GTR %resp% echo Introduce un numero mas bajo
if %num% LSS %resp% echo Introduce un numero mas alto
if %num% == %resp% goto win
goto play

:win
echo Has acertado
goto inicio

:Salir
Exit
