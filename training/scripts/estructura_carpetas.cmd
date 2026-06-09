@echo off

:menu
echo *******************************
echo *  CREAR ESTRUCTURA CARPETAS  *
echo *******************************

echo 1 - Crear carpetas
echo 2 - Borrar todas las carpetas creadas
echo 0 - SALIR

echo --------------------------------
set /p opcion=Seleccionar una opcion: 
cls 
if %opcion%==1 goto md
if %opcion%==2 goto rd
if %opcion%==0 goto salir
 
:md
set a=Empresa
for %%i in (ACORUNA OURENSE PONTEVEDRA LUGO) do (
md %a%\%%i
for %%e in (VENTAS PERSONAL) do (
md %a%\%%i\%%e
for %%o in (JEFES EMPLE COMUN) do (
md %a%\%%i\PERSONAL\%%o
)
)
)
cls
pause
goto menu

:rd
rd /S Empresa
goto menu

:Salir
Exit
