# Marvel Explorer

Buscador de personajes de la API de Marvel con likes, infinite scroll y detalle de comics.

![React](https://img.shields.io/badge/react-v18-blue.svg)
![CRA](https://img.shields.io/badge/CRA-react--scripts-orange.svg)

## Caracteristicas

- Busqueda de personajes de Marvel
- Sistema de likes con contexto global
- Vista de detalle con comics del personaje
- Infinite scroll en el listado
- Pagina de error 404

## Stack

- **React 18** (Create React App)
- **React Router** - Navegacion SPA
- **React Context** - Estado global (likes)

## Instalacion

```bash
npm install
npm start
```

## Estructura

```
src/
├── pages/          # ListPage, DetailPage, LikeListPage, NoPage
├── components/     # Header, Card, CharacterInfo, Comics, Form, etc.
├── hooks/          # useCharacter, useCharacters, useComics, useLike
├── services/       # character, characters, comics (API calls)
└── context/        # LikeCard (reducer para likes)
```
