# 💾 Retro M3U Organizer

Generador universal de archivos `.m3u` para juegos multidisco de consolas clásicas (PSX, SEGA Saturn, Dreamcast).

Esta herramienta automatiza el proceso de organización, asegurando la **continuidad del guardado** y la **compatibilidad total** con *custom firmwares* basados en Linux y RetroArch, como **Garlic OS, Onion OS, ArkOS, Batocera**, y **MinOS**.

---

## ✨ Características Clave

* **Compatibilidad Universal:** Diseñado para **PlayStation 1 (PSX), SEGA Saturn y Dreamcast**, soportando múltiples formatos de disco (`.chd`, `.bin`, `.cue`, `.iso`, etc.).
* **Modo Automático:** Escanea directorios, identifica juegos multidisco por marcadores de disco (`(Disc 1)`, `[CD 2]`, etc.) y agrupa automáticamente los archivos para su procesamiento.
* **Modo Manual:** Permite al usuario seleccionar y ordenar los archivos de disco para crear `.m3u` personalizados, incluyendo funciones para mover discos hacia arriba y abajo en la lista.
* **Rutas Relativas y Compatibilidad:** Genera rutas de archivo estilo Linux (`NombreJuego/disco.chd`) dentro del `.m3u`, que son esenciales para el correcto funcionamiento en sistemas operativos portátiles como **Garlic OS**.
* **Organización Limpia:** Mueve automáticamente los archivos de disco originales a una **subcarpeta** nombrada con el juego, dejando el archivo `.m3u` limpio en la carpeta principal de ROMs (Ej: `/roms/psx/Final Fantasy VII.m3u`).

---

## 🚀 Instalación y Uso (Desde Código Fuente)

### Requisitos

Necesitas tener **Python 3.x** instalado.

### Pasos para Ejecutar

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/TuUsuario/retro-m3u-organizer.git](https://github.com/TuUsuario/retro-m3u-organizer.git)
    cd retro-m3u-organizer
    ```

2.  **Crea y activa el entorno virtual:**
    ```bash
    python -m venv .venv
    # Linux/macOS
    source .venv/bin/activate
    # Windows
    .venv\Scripts\activate
    ```

3.  **Instala las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Ejecuta la GUI:**
    ```bash
    python run.py
    ```

---

## 📦 Generar el Ejecutable (EXE)

Si deseas crear un archivo ejecutable independiente (`.exe` para Windows), utiliza PyInstaller.

1.  Asegúrate de tener PyInstaller instalado (`pip install pyinstaller`).
2.  Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
pyinstaller --onefile --windowed --name "Retro M3U Organizer" --icon="images/m3u-logo.ico" --add-data "images:images" run.py
