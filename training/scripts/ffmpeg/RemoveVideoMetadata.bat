@echo off
setlocal EnableDelayedExpansion

:: Verifica si ffmpeg.exe está en la misma carpeta que el script
if not exist "%~dp0ffmpeg.exe" (
    echo [ERROR] El archivo ffmpeg.exe no se encuentra en la carpeta del script.
    pause
    exit /b
)

:: Verifica si se han proporcionado archivos para procesar
if "%~1"=="" (
    echo [ERROR] No se ha proporcionado ningun archivo. Arrastra uno o mas archivos al script.
    pause
    exit /b
)

:: Procesa cada archivo de video
for %%I in (%*) do (
    echo %date% %time% procesando, espera un momento... "%%~I"

    if exist "%%~I" (
        set "originalSize=%%~zI"
        :: Crea una carpeta temporal en la ubicación del archivo
        mkdir "%%~dpItemp" 2>nul
        :: Elimina los metadatos del archivo de video y lo guarda en la carpeta temp
        "%~dp0ffmpeg.exe" -i "%%~I" -map 0 -map_metadata -1 -c copy -loglevel quiet "%%~dpItemp\%%~nxI"
        
        :: Verifica si el archivo procesado existe en la carpeta temp
        if exist "%%~dpItemp\%%~nxI" (

            :: Compara el tamaño de los archivos por si hay algun error
            for /f %%s in ('powershell -nologo -noprofile -command "$o = (Get-Item -LiteralPath '%%~I').Length; $t = (Get-Item -LiteralPath '%%~dpItemp\%%~nxI').Length; $l = [math]::Floor($o * 0.95); $u = [math]::Ceiling($o * 1.05); if ($t -ge $l -and $t -le $u) { 1 } else { 0 }"') do (
                if %%s==1 (
                    echo [INFO] Tamano valido. Reemplazando archivo...
                    del /f /q "%%~I"
                    move /Y "%%~dpItemp\%%~nxI" "%%~I"
                    echo %date% %time% Archivo generado correctamente: %%~nxI
                ) else (
                    echo [ERROR] Tamano no valido, no se reemplaza el archivo.
                )
            )
        ) else (
            echo [ERROR] No existe el archivo en la carpeta tewmporal: %%~nxI
        )
        :: Limpia la carpeta temporal
        rd /s /q "%%~dpItemp"
    ) else (
        echo [ERROR] El archivo no se encuentra: %%~I
    )
)

echo %date% %time% completadas todas las tareas. Presiona enter para terminar
pause
endlocal
