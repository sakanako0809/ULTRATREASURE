# Static Site Starter (Multi-page)

## Structure
- `components/` - shared header/footer
- `js/layout.js` - loads shared components via `fetch()`
- `css/style.css` - basic layout + sticky footer
- `index.html`, `about.html`, `contact.html` - sample pages

## Run locally
Because `fetch()` is blocked on `file://`, run a local server:

### VS Code
Install **Live Server**, then open `index.html` with Live Server.

### Python
```bash
python -m http.server 8000
```
Then open http://localhost:8000
