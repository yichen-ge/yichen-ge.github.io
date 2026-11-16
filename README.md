# Personal homepage

A static academic website, hosted on GitHub Pages.

## Local preview

```sh
python3 -m http.server 4000
```

Open <http://localhost:4000/>. On Windows, use `python -m http.server 4000`
if the Python executable is named `python`.

## Editing

- Homepage: `index.html`
- Publications: the `#publications` section in `index.html`
- Shared styles: `assets/css/academic.css`
- Shared scripts: `assets/js/academic.js`

Edit the HTML directly and refresh the browser. Navigation and profile markup
are included in each page.

## Publications

Edit or duplicate a `.publication-card` article in `index.html`.
Its title, authors, venue, and contribution notes are ordinary HTML. List papers
in the desired display order.

The optional resource buttons use these attributes on the article:

```html
<article class="paper-box publication-card paper-box--text-only"
         id="paper-id"
         data-paper-url="https://example.com/paper.pdf"
         data-code-url="https://github.com/username/project"
         data-project-url="https://example.com/project/">
  <!-- Title, authors, venue, and contribution notes -->
</article>
```

Use `data-paper-url`, `data-code-url`, and `data-project-url` for the **Paper**,
**Code**, and **Project Page** buttons. Leave any attribute empty or omit it to
hide that button. Links are updated automatically by the browser.

## Hosting

Publish the repository root as static files on GitHub Pages. Keep `.nojekyll`
at the root. Pages, styles, scripts, images, and fonts are served directly.

Third-party style licenses are included in `assets/css/`.
