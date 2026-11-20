# Tumbao Revolver Club — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias) para la discoteca **Tumbao Revolver Club**.

## Estructura
- `index.html` — página principal (inicio, el club, menú, redes, visítanos)
- `css/styles.css` — estilos con los colores del logo (amarillo `#fff200` sobre negro) y tonos cobre de la fachada
- `js/main.js` — menú interactivo por categorías (los precios se editan en el arreglo `MENU`), navegación móvil y vista ampliada de la carta
- `assets/menu-carta.pdf` — menú original descargable
- `assets/img/` — logo, fachada y carta

## Ver localmente
Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
```

## Publicar
Al ser un sitio estático puede publicarse gratis con GitHub Pages (Settings → Pages → rama `main`, carpeta `/`), Netlify o Vercel.
