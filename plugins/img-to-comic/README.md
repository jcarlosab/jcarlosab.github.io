# ImgToComic: Web Image to PDF/CBZ

Extension para Chrome que extrae, selecciona y empaqueta imagenes de cualquier pagina web en formato PDF o Comic Book Archive (CBZ).

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extension-orange.svg)

## Caracteristicas

- Extrae todas las imagenes de la pagina actual
- Seleccion visual con grid de miniaturas
- Exportar a **PDF** (via jsPDF)
- Exportar a **CBZ** (Comic Book Archive via JSZip)
- Seleccionar/deseleccionar imagenes individuales
- Barra de progreso durante la generacion

## Instalacion

1. Descarga las dependencias locales (ver seccion Dependencias)
2. Abre `chrome://extensions/`
3. Activa el **Modo desarrollador**
4. Clica **Cargar extension sin empaquetar**
5. Selecciona la carpeta `img-to-comic`

## Dependencias

Debido a las restricciones de Manifest V3, las librerias se deben instalar localmente:

1. **jsPDF**: Descarga `jspdf.umd.min.js` desde [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js) y colocalo en esta carpeta
2. **JSZip**: Descarga `jszip.min.js` desde [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js) y colocalo en esta carpeta

## Archivos

- `manifest.json` - Configuracion de la extension
- `popup.html` - Interfaz del popup
- `popup.js` - Logica de seleccion y generacion
- `background.js` - Service worker (extraccion de imagenes)
- `content.js` - Inyeccion en la pagina activa
- `rules.json` - Reglas de declarativeNetRequest
- `icon.png` - Icono de la extension

## Licencia

**GPLv3**
