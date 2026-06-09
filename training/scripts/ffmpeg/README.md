# RemoveVideoMetadata

## Requisitos

- Windows (10 o superior).
- `ffmpeg.exe` en la carpeta del script (descarga desde ffmpeg.org).
- PowerShell (incluido en Windows).

## Instalación

1. Descargar el script
2. Descargar `ffmpeg.exe`
   **Nota**: `ffmpeg.exe` no está incluido; descárgalo por separado.
3. Copiar `ffmpeg.exe` en la misma carpeta donde esté ubicado el script `RemoveVideoMetadata.bat`.

## Uso

1. Arrastra uno o más videos (`.mp4`, `.mkv`, etc.) sobre `RemoveVideoMetadata.bat`.
2. El script:
   - Elimina metadatos con `ffmpeg`.
   - Verifica el tamaño del archivo procesado (±5%).
   - Reemplaza el original si es válido.
   - Limpia archivos temporales.

## Estructura

- `RemoveVideoMetadata.bat`: Script batch.
- `README.md`: Este archivo.
