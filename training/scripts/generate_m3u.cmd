@echo off
setlocal enabledelayedexpansion

:: Ruta base donde buscar las carpetas
set "BASE_DIR=%cd%"

:: Buscar carpetas que contengan "discos"
for /d /r "%BASE_DIR%" %%D in (*discos*) do (
    set "CHD_COUNT=0"
    set "CHD_LIST="
    pushd "%%D"
    for %%F in (*.chd) do (
        set /a CHD_COUNT+=1
        if defined CHD_LIST (
            set "CHD_LIST=!CHD_LIST!;%%F"
        ) else (
            set "CHD_LIST=%%F"
        )
    )
    popd

    if !CHD_COUNT! GTR 1 (
        set "M3U_NAME=%%~nD.m3u"
        (
            for %%F in ("!CHD_LIST:;=" "!") do (
                if not "%%~F"=="" echo %%~F
            )
        ) > "%BASE_DIR%\!M3U_NAME!"
        echo Generado: !M3U_NAME!
    )
)

echo M3U generados.
pause
