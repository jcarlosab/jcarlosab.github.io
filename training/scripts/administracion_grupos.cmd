@echo off
color 70
:Menu

echo ----------------------------------------------
echo EJERCICIO 1
echo 1 - DEFINIR USUARIOS
echo EJERCICIO 2                        
echo 2 - CREAR USUARIOS                           
echo 3 - ELIMINAR USUARIOS
echo EJERCICIO 3 
echo 4 - CREAR GRUPOS
echo 5 - ELIMINAR GRUPOS
echo EJERCICIO 4
echo 6 - AGREGAR USUARIOS A GRUPOS
echo 7 - ELIMINAR USUARIOS DE GRUPOS
echo EJERCICIO 5
echo 8 - CREAR CARPETAS
echo 9 - Eliminar txt y salir														
echo ----------------------------------------------
set /p option= SELECCIONA UNA OPCION: 
echo ----------------------------------------------

if %option%==1 goto Op1
if %option%==2 goto Op2
if %option%==3 goto Op3
if %option%==4 goto Op4
if %option%==5 goto Op5
if %option%==6 goto Op6
if %option%==7 goto Op7
if %option%==8 goto Op8
if %option%==9 goto Op9


:Op1
for /l %%a in (1,1,3) do echo asir%%a >> asir.txt 
for /l %%b in (1,1,3) do echo dam%%b >> dam.txt 
for /l %%c in (1,1,3) do echo daw%%c >> daw.txt 
for /l %%d in (1,1,3) do echo sire%%d >> sire.txt 
for /l %%e in (1,1,3) do echo analisis%%e >> analisis.txt
for /l %%f in (1,1,3) do echo enfer%%f >> enfer.txt
for /f %%g in (asir.txt,dam.txt,daw.txt) do echo %%g >> info.txt
for /f %%h in (sire.txt,analisis.txt,enfer.txt) do echo %%h >> sani.txt
for /f %%j in (info.txt,sani.txt) do echo %%j >> alumnos.txt
goto Menu

:Op2
for /f %%a in (alumnos.txt) do net user %%a abc123. /add
goto Menu

:Op3
for /f %%a in (alumnos.txt) do net user %%a /delete
goto Menu

:Op4
echo insti >> grupos.txt
echo infor >> grupos.txt
echo sani >> grupos.txt
echo analisis >> grupos.txt
echo enfer >> grupos.txt
echo asir >> grupos.txt
echo sire >> grupos.txt
echo daw >> grupos.txt
echo dam >> grupos.txt
for /f %%a in (grupos.txt) do net localgroup %%a /add
goto Menu

:Op5
for /f %%a in (grupos.txt) do net localgroup %%a /delete
goto Menu

:Op6
echo GRUPOS ACTUALES
net localgroup | more
echo SELECCIONA GRUPO
set /p grupo= Seleccionar grupo para la creacion de usuarion: 
for /f %%b in (%grupo%.txt) do net localgroup %grupo% %%b /add
goto Menu

:Op7
echo GRUPOS ACTUALES
net localgroup | more
echo SELECCIONA GRUPO
set /p grupo= Seleccionar grupo para eliminar usuarios: 
for /f %%b in (%grupo%.txt) do net localgroup %grupo% %%b /delete
goto Menu

REM Estructura de carpetas:
:Op8
md Insti
md Insti\Infor
md Insti\Sani
for %%a in (asir dam daw sire) do (
md Insti\Infor\%%a
for %%e in (apuntes profes) do (
md Insti\Infor\%%a\%%e
)
)
for %%i in (analisis enfer) do (
md Insti\Sani\%%i
for %%e in (apuntes profes) do (
md Insti\Sani\%%i\%%e
)
)
tree insti
goto Menu

:Op9
del *.txt
exit

