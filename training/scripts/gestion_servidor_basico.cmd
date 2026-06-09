@echo off

Color 70

:menu
echo ----------------------------------------------
echo 1 - CREAR USUARIOS                        
echo 2 - CREAR GRUPOS                           
echo 3 - AGREGAR USUARIOS A GRUPOS 
echo 4 - SALIR															
echo ----------------------------------------------

set /p option= SELECCIONA UNA OPCION: 
echo ----------------------------------------------
cls
if %option%==1 goto Op1
if %option%==2 goto Op2
if %option%==3 goto Op3
if %option%==4 goto Exit

:Op1
echo USUARIOS CREADOS
net user | more
echo CREAR USUARIOS 
set /p name= Introduce nombre de usuario: 
set /p pass= Introduce password: 
net user %name% %pass% /add
:respUser
echo Introducir mas usuarios: S/N
set /p resp=
cls
if %resp%==s goto Op1
if %resp%==n goto menu

:Op2
echo GRUPOS ACTUALES
net localgroup | more
echo CREAR GRUPO
set /p ngroup= Introduce nombre de grupo:  
net localgroup %ngroup% /add 
echo Crear mas grupos: S/N
set /p resp=
cls
if %resp%==S goto Op2
if %resp%==N goto menu


:Op3
echo GRUPOS ACTUALES
net localgroup | more
echo SELECCIONA GRUPO
set /p ngroup= Seleccionar grupo: 
echo USUARIOS ACTUALES
net user | more
set /p name= Nombre de usuario: 
net localgroup %ngroup% %name% /add
set /p resp= Quieres agregar mas usuarios: S/N
cls
if %resp%==S goto op3
if %resp%==N goto menu


:Exit
Exit
