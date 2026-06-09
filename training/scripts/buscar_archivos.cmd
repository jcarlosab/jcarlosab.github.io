@echo off
REM by JCarlos
color 70

:menu
echo ********************************
echo *  BUSCAR DOCUMENTOS DE TEXTO  *
echo ********************************

echo 1 - Buscar archivos .txt
echo 2 - Ver contenido
echo 3 - Copiar los archivos encontrados
echo 4 - Borrar todo lo anterior
echo 0 - Salir

set /p opcion= Selecciona una opcion: 
cls
if %opcion%==1 goto search
if %opcion%==2 goto ver
if %opcion%==3 goto copy
if %opcion%==4 goto erase
if %opcion%==0 goto salir

REM dir \*.txt Busca en la raiz todos los txt
REM dir \*.txt /S Busca en la raiz y todos los subdirectorios
REM /S busca en todos los subdirectorios
REM /B Lo convierte en formato simple
REM dir /S /B C:A????.txt busca en todo el disco C: los archivos txt que empiecen por A
:search
echo Buscando...
IF EXIST backup.txt (
    Echo Deleting backup.txt
    Del backup.txt
 ) ELSE ( 
    set a = backup.txt
 )
dir \*.txt /S /B > backup.txt
set count = 0
for /f "tokens=*" %%i in (backup.txt) do set /a count+=1
echo Numero de archivos encontrados: %count%
set /a count=0
pause
cls
goto menu

:ver
type backup.txt | MORE
for /f "tokens=*" %%i in (backup.txt) do type "%%i" | more
cls
goto menu

:copy
md copia
for /f "tokens=*" %%i in (backup.txt) do copy "%%i" copia
pause
cls
goto menu

:erase
echo Borrando...
rd /S /Q copia
del *.txt
cls
goto menu

:Salir
Exit
