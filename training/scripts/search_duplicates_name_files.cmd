@echo off
chcp 65001 >nul
setlocal

echo Comparador de nombres de archivos
echo ============================================
echo Este script busca archivos con nombres similares en un directorio y sus subdirectorios.
echo.
set /p rootPath="Introduce la ruta del directorio raíz (e.g., C:\carpeta\test): "
if not exist "%rootPath%\" (
    echo Error: La ruta '%rootPath%' no existe o no es válida.
    pause
    exit /b 1
)

set "outputFile=FileList.txt"
set "similarityReport=SimilarFiles.txt"
set "psLog=tempPowerShellLog.txt"

if exist "%outputFile%" del "%outputFile%"
if exist "%similarityReport%" del "%similarityReport%"
if exist "%psLog%" del "%psLog%"

:choiceLoop
echo.
echo =================================================================================================
echo Selecciona el nivel de coincidencia para los nombres de archivo:
echo 1. Coincidencia exacta (nombre completo, sin distinguir mayúsculas, ignorando 'The' al inicio)
echo 2. Alta similitud (primeros 10 caracteres)
echo 3. Media similitud (primeros 5 caracteres)
echo 4. Baja similitud (primeros 3 caracteres)
echo =================================================================================================
set /p choice="Introduce la opción (1-4): "
if "%choice%"=="1" set "prefixLength=0" & set "matchDesc=Coincidencia exacta" & goto validChoice
if "%choice%"=="2" set "prefixLength=10" & set "matchDesc=Alta similitud (primeros 10 caracteres)" & goto validChoice
if "%choice%"=="3" set "prefixLength=5" & set "matchDesc=Media similitud (primeros 5 caracteres)" & goto validChoice
if "%choice%"=="4" set "prefixLength=3" & set "matchDesc=Baja similitud (primeros 3 caracteres)" & goto validChoice
echo Error: Opción inválida. Por favor, selecciona 1, 2, 3 o 4.
goto choiceLoop

:validChoice
echo Procesando con nivel de coincidencia: %matchDesc%

echo Generando FileList.txt...
powershell -NoProfile -NoLogo -ExecutionPolicy Bypass -Command "try { $ErrorActionPreference = 'Stop'; $rootPath = '%rootPath%'; $outputFile = '%outputFile%'; if (-not (Test-Path $rootPath)) { throw 'Ruta no existe.' }; $files = Get-ChildItem -Path $rootPath -Recurse -File -Exclude '*.sbi' | Select-Object Name, @{Name='Directory';Expression={$_.Directory.FullName}}; if (-not $files) { throw 'No se encontraron archivos.' }; 'Contenido de Carpetas' | Out-File -FilePath $outputFile -Encoding UTF8; $currentDir = ''; foreach ($file in $files | Sort-Object Directory) { if ($file.Directory -ne $currentDir) { '' | Out-File -FilePath $outputFile -Append -Encoding UTF8; $file.Directory | Out-File -FilePath $outputFile -Append -Encoding UTF8; $currentDir = $file.Directory; }; '    ' + $file.Name | Out-File -FilePath $outputFile -Append -Encoding UTF8; }; } catch { $_.Exception.Message | Out-File -FilePath '%psLog%' -Encoding UTF8; exit 1; }" >nul 2>&1

if %ERRORLEVEL% neq 0 (
    echo Error al generar FileList.txt. Detalles:
    if exist "%psLog%" (
        type "%psLog%"
    ) else (
        echo No se generó el archivo de log.
    )
    pause
    exit /b 1
)

echo Generando SimilarFiles.txt...
powershell -NoProfile -NoLogo -ExecutionPolicy Bypass -Command "try { $ErrorActionPreference = 'Stop'; $rootPath = '%rootPath%'; $prefixLength = %prefixLength%; $similarityReport = '%similarityReport%'; $csvReport = 'SimilarFiles.csv'; $matchDesc = '%matchDesc%'; $files = Get-ChildItem -Path $rootPath -Recurse -File -Exclude '*.sbi' | Select-Object Name, BaseName, @{Name='Directory';Expression={$_.Directory.FullName}}, @{Name='CompareName';Expression={ if ($prefixLength -eq 0) { $name = $_.BaseName; if ($name -match '^(?i)The\\s+') { $name = $name -replace '^(?i)The\\s+', '' }; $name.ToLower() } else { $_.BaseName.Substring(0, [Math]::Min($prefixLength, $_.BaseName.Length)).ToLower() } }}; $groups = $files | Group-Object -Property CompareName; $duplicates = $groups | Where-Object { $_.Count -gt 1 }; 'Archivos Duplicados' | Out-File -FilePath $similarityReport -Encoding UTF8; ('Nivel de Coincidencia: ' + $matchDesc) | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $matchCount = 0; $csvRows = @(); foreach ($group in $duplicates | Sort-Object Name) { $matchCount++; $header = ($group.Group | Select-Object -ExpandProperty BaseName | Sort-Object -Unique) -join ', '; '' | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $header | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $prevDir = ''; foreach ($file in $group.Group | Sort-Object Directory) { if ($file.Directory -ne $prevDir) { '    ' + $file.Directory | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $prevDir = $file.Directory; }; '        ' + $file.Name | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $csvRows += [PSCustomObject]@{Grupo=$matchCount;Nombre=$file.Name;Directorio=$file.Directory} }; }; if ($matchCount -eq 0) { 'No se encontraron nombres de archivo duplicados para ' + $matchDesc | Out-File -FilePath $similarityReport -Append -Encoding UTF8; } else { ('\nResumen: Se encontraron ' + $matchCount + ' grupo(s) de archivos duplicados/similares.') | Out-File -FilePath $similarityReport -Append -Encoding UTF8; $csvRows | Export-Csv -Path $csvReport -Encoding UTF8 -NoTypeInformation }; $totalFiles = $files.Count; $totalDup = 0; foreach ($g in $duplicates) { $totalDup += $g.Count }; Write-Host ('Resumen rápido: Archivos analizados: ' + $totalFiles + ' | Archivos en grupos duplicados: ' + $totalDup) } catch { $_.Exception.Message | Out-File -FilePath '%psLog%' -Encoding UTF8; exit 1; }" >nul 2>&1

if %ERRORLEVEL% neq 0 (
    echo Error al generar SimilarFiles.txt. Detalles:
    if exist "%psLog%" (
        type "%psLog%"
    ) else (
        echo No se generó el archivo de log.
    )
    pause
    exit /b 1
)

del /q "%psLog%" 2>nul

echo.
echo Procesamiento completado.
echo Lista de archivos guardada en %outputFile%
echo Informe de similitud guardado en %similarityReport%
echo Informe CSV guardado en SimilarFiles.csv
echo.

echo.
echo Presiona cualquier tecla para salir.
pause
goto :eof