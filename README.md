# kiedywakacje.com

Odliczanie do wakacji, ferii i innych dni wolnych. jQuery + jQuery UI, statyczny HTML, zero zależności runtime.

```sh
node build.js        # generuje dist/
node build.js --check # test konwertera markdown
npm run dev          # build + serwer lokalny
```

Deploy: wrzuć `dist/` na dowolny statyczny hosting.

| plik | co robi |
|---|---|
| `build.js` | generator — szablony + dane → `dist/*.html`, `sitemap.xml`, `robots.txt` |
| `data.js` | wydarzenia, ferie, FAQ, daty ruchome (Wielkanoc, majówka…) |
| `content.js` | treść stron wydarzeń (SEO) |
| `articles.js` | artykuły w markdown |
| `app.js` | jQuery/jQuery UI: licznik, motyw, wybór wydarzenia, FAQ |
| `styles.css` | style |
| `assets/*.svg` | tła (kreskowa grafika) |

Daty egzaminów i długich weekendów są wpisane ręcznie w `data.js` — aktualizować po ogłoszeniu kalendarza MEN/CKE.
