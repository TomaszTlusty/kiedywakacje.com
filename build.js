#!/usr/bin/env node
// Generator statycznego HTML-a. `node build.js` -> dist/
const fs = require('fs');
const path = require('path');
const { events, winterBreakGroups, faqs, socials } = require('./data.js');
const { eventPages } = require('./content.js');
const { articles } = require('./articles.js');

const SITE = 'https://kiedywakacje.com';
const OUT = path.join(__dirname, 'dist');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const iso = d => d.toISOString();
const gcal = d => d.toISOString().replace(/-|:|\.\d{3}/g, '');
const plDate = d => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
const gcalUrl = (title, date, details) =>
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${gcal(date)}/${gcal(date)}&details=${encodeURIComponent(details || '')}`;

// Mini-markdown: akapity, pogrubienia i listy numerowane — tyle, ile używają artykuły.
function md(src) {
    return src.trim().split(/\n\s*\n/).map(block => {
        const lines = block.split('\n').map(l => l.trimEnd());
        const inline = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        if (/^\d+\.\s/.test(lines[0])) {
            const start = parseInt(lines[0], 10);
            const items = [];
            for (const line of lines) {
                const m = line.match(/^(\d+)\.\s+(.*)$/);
                if (m) items.push(inline(m[2]));
                else if (items.length && line.trim()) items[items.length - 1] += '<br>' + inline(line.trim());
            }
            return `<ol start="${start}">${items.map(i => `<li>${i}</li>`).join('')}</ol>`;
        }
        return `<p>${lines.map(inline).join('<br>')}</p>`;
    }).join('\n');
}

// `node build.js --check` — jedyny test, jaki ten plik potrzebuje: konwerter markdown.
if (process.argv[2] === '--check') {
    const assert = require('assert');
    assert.strictEqual(md('**A** i B'), '<p><strong>A</strong> i B</p>');
    assert.strictEqual(md('1. raz\n2. dwa'), '<ol start="1"><li>raz</li><li>dwa</li></ol>');
    assert.strictEqual(md('5. **X**\n   opis'), '<ol start="5"><li><strong>X</strong><br>opis</li></ol>');
    assert.strictEqual(md('a<b & "c"'), '<p>a&lt;b &amp; &quot;c&quot;</p>');
    assert.strictEqual(md('p1\n\np2'), '<p>p1</p>\n<p>p2</p>');
    console.log('md(): ok');
    process.exit(0);
}

const jsonLd = obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

function shell({ title, description, canonical, head = '', bg = 'hero', body, bodyClass = '' }) {
    return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Kiedy Wakacje">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:image" content="${SITE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/og-image.png">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lato:wght@300;400;700;900&display=swap">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="/styles.css">
<script>/* motyw przed pierwszym malowaniem — inaczej miga */
(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.className='dark';}catch(e){}})();</script>
${head}
</head>
<body class="${bodyClass}">
<img class="bg" src="/assets/${bg}-bg.svg" alt="" aria-hidden="true">
<a class="chip toggle-home" href="__HOME__"><span>__HOMELABEL__</span> <i class="fa-solid __HOMEICON__"></i></a>
<button class="chip toggle-theme" id="theme-toggle" title="zmień motyw" aria-label="zmień motyw">
  <i class="fa-solid fa-sun icon-sun"></i><i class="fa-solid fa-moon icon-moon"></i>
</button>
${body}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.14.1/jquery-ui.min.js"></script>
<script src="/app.js"></script>
</body>
</html>`;
}

const page = (o, isHome) => shell(o)
    .replace('__HOME__', isHome ? '/about' : '/')
    .replace('__HOMELABEL__', isHome ? 'Info' : 'Powrót')
    .replace('__HOMEICON__', isHome ? 'fa-circle-info' : 'fa-house');

const countdownBlock = (label, date, calTitle, calDetails) => `
<div class="countdown-card">
  <p class="countdown-lead outline">Do <span class="js-label">${esc(label)}</span> pozostało</p>
  <div class="countdown" data-countdown="${iso(date)}">
    <div class="unit"><span class="num js-days">000</span><span class="unit-label">dni</span></div>
    <div class="unit"><span class="num js-hours">00</span><span class="unit-label">godzin</span></div>
    <div class="unit"><span class="num js-minutes">00</span><span class="unit-label">minut</span></div>
    <div class="unit"><span class="num js-seconds">00</span><span class="unit-label">sekund</span></div>
  </div>
  <p class="countdown-done outline" hidden>🎉 Koniec odliczania, początek odpoczynku 🎉</p>
  <a class="cal-link outline js-cal" href="${esc(gcalUrl(calTitle, date, calDetails))}" target="_blank" rel="noopener">
    <span class="js-date">${plDate(date)}</span> <i class="fa-solid fa-calendar-days"></i>
  </a>
</div>`;

const eventLinks = (heading, list) => `
<section class="links">
  <div class="wrap-md">
    <h2>${heading}</h2>
    <p class="muted">Dedykowane strony z licznikiem dla każdego wydarzenia</p>
    <ul class="pill-list">
      ${list.map(e => `<li><a class="pill" href="/${e.slug}">${esc(e.breadcrumbLabel)}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

const footer = () => `
<footer class="site-footer">
  <a class="mail" href="mailto:lider@kiedywakacje.com"><span>Napisz do nas tutaj</span> <i class="fa-solid fa-envelope"></i></a>
  <div class="socials">
    ${socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('\n    ')}
  </div>
</footer>`;

// ── strona główna ──────────────────────────────────────────────
function homePage() {
    const first = events[0];
    const faqJsonLd = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    };
    const websiteJsonLd = {
        '@context': 'https://schema.org', '@type': 'WebSite', name: 'Kiedy Wakacje', url: SITE,
        description: 'Precyzyjne odliczanie do wakacji, ferii zimowych i innych dni wolnych od szkoły.', inLanguage: 'pl',
    };
    const orgJsonLd = {
        '@context': 'https://schema.org', '@type': 'Organization', name: 'Kiedy Wakacje', url: SITE,
        contactPoint: { '@type': 'ContactPoint', email: 'lider@kiedywakacje.com', contactType: 'customer support', availableLanguage: 'Polish' },
    };

    const eventBtn = e => `<button class="btn js-event" data-date="${iso(e.date)}"${e.endDate ? ` data-end-date="${iso(e.endDate)}"` : ''}${e.dateFn ? ` data-date-fn="${e.dateFn}"` : ''} data-label="${esc(e.label)}" data-end-label="${esc(e.endLabel)}" data-title="${esc(e.title)}"><i class="${e.icon}"></i><span>${esc(e.title)}</span></button>`;

    return page({
        title: 'Kiedy Wakacje? – Odliczanie do wakacji i ferii 2026/2027',
        description: 'Nie możesz doczekać się wakacji? Sprawdź precyzyjne odliczanie do końca roku szkolnego, ferii zimowych i innych dni wolnych. Ile dni, godzin i minut zostało?',
        canonical: SITE + '/',
        head: jsonLd(websiteJsonLd) + jsonLd(orgJsonLd) + jsonLd(faqJsonLd),
        body: `
<main class="hero">
  <div class="hero-text outline">
    <header><h1 class="anim-pop">Kiedy Wakacje?</h1></header>
    <h2 class="anim-drop">Nie musisz już pytać!</h2>
  </div>
  ${countdownBlock(first.label, first.date, first.title, first.label)}
  <div class="event-picker">
    <div class="btn-row">
      ${events.map(eventBtn).join('\n      ')}
      <button class="btn js-winter-toggle" aria-expanded="false" aria-controls="winter-menu">
        <i class="fa-solid fa-snowflake"></i><span>Ferie Zimowe</span><i class="fa-solid fa-chevron-down chevron"></i>
      </button>
    </div>
    <div class="winter-slot">
      <div id="winter-menu" class="winter-menu" hidden>
        ${winterBreakGroups.map(g => `<button class="winter-group js-winter-group" data-date="${iso(g.date)}" data-label="${esc(g.label)}" data-title="Ferie Zimowe" title="${g.id}">
          <div class="winter-title">${esc(g.title)}</div>
          <div class="winter-provinces">${esc(g.provinces)}</div>
        </button>`).join('\n        ')}
      </div>
    </div>
  </div>
</main>
${eventLinks('Odliczaj do…', eventPages)}
<section class="articles">
  <h3 class="outline">Brak pomysłu na wakacje? sprawdź tu!</h3>
  <div class="article-grid">
    ${articles.map(a => `<article class="article-card">
      <a href="/article/${a.id}" aria-label="${esc(a.title)}"></a>
      <span class="article-icon"><i class="${a.icon}"></i></span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.description)}</p>
      <span class="article-time">${esc(a.readTime)} czytania</span>
    </article>`).join('\n    ')}
  </div>
</section>
<section class="faq">
  <div class="wrap-sm">
    <div class="faq-head">
      <h3>FAQ</h3>
      <p>Najczęściej zadawane pytania o kiedywakacje.com</p>
    </div>
    <div class="card">
      <div id="faq-accordion">
        ${faqs.map((f, i) => `<h4 class="faq-q"><span class="faq-num">${String(i + 1).padStart(2, '0')}</span><span>${esc(f.question)}</span><i class="fa-solid fa-chevron-down faq-chev"></i></h4>
        <div class="faq-a"><p>${esc(f.answer)}</p></div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>
${footer()}`,
    }, true);
}

// ── strona wydarzenia ──────────────────────────────────────────
function eventPage(ep) {
    const breadcrumb = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE },
            { '@type': 'ListItem', position: 2, name: ep.breadcrumbLabel, item: `${SITE}/${ep.slug}` },
        ],
    };
    return page({
        title: ep.metaTitle,
        description: ep.metaDescription,
        canonical: `${SITE}/${ep.slug}`,
        head: jsonLd(breadcrumb),
        body: `
<main class="hero">
  <div class="hero-text outline">
    <h1 class="anim-pop">${esc(ep.h1)}</h1>
    <h2 class="anim-drop">Nie możesz się doczekać? Sprawdź!</h2>
  </div>
  ${countdownBlock(ep.label, ep.date, ep.breadcrumbLabel, ep.label)}
  <div class="hero-spacer"></div>
</main>
<section class="prose-section">
  <div class="wrap-sm">
    <div class="card card-pad">
      ${ep.content.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('\n      ')}
    </div>
  </div>
</section>
${eventLinks('Odliczaj też do…', eventPages.filter(e => e.slug !== ep.slug))}
${footer()}`,
    }, false);
}

// ── artykuł ────────────────────────────────────────────────────
function articlePage(a) {
    return page({
        title: `${a.title} | Kiedywakacje.com`,
        description: a.description,
        canonical: `${SITE}/article/${a.id}`,
        body: `
<main class="article-page">
  <header class="article-header outline">
    <h4>${esc(a.readTime)} | ${esc(a.date)}</h4>
    <h1>${esc(a.title)}</h1>
  </header>
  <div class="wrap-sm">
    <div class="card card-pad prose">
      ${md(a.content)}
    </div>
  </div>
</main>
${footer()}`,
    }, false);
}

// ── o nas ──────────────────────────────────────────────────────
function aboutPage() {
    return page({
        title: 'O nas – kiedywakacje.com',
        description: 'Dowiedz się więcej o kiedywakacje.com – stronie z odliczaniem do wakacji, ferii i końca roku szkolnego.',
        canonical: SITE + '/about',
        bg: 'about',
        bodyClass: 'about',
        body: `
<main class="about-main">
  <div class="about-text">
    <header class="anim-stagger">
      <h1 class="outline">Skąd się to wzięło?</h1>
      <h2 class="outline">Z nudów. I z miłości do wakacji.</h2>
    </header>
    <section class="anim-stagger">
      <blockquote class="outline">&quot;Ile jeszcze do wakacji?&quot; - usłyszałem to pytanie setki razy. Od kolegów, od siebie samego, gdzieś w środku marca kiedy zima nie chce odpuścić.</blockquote>
      <p class="outline">Zamiast za każdym razem liczyć w głowie,<br>zrobiłem stronę. Dla siebie, a potem dla was.</p>
    </section>
    <footer class="about-socials anim-stagger">
      ${socials.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('\n      ')}
    </footer>
  </div>
</main>`,
    }, false);
}

// ── zapis ──────────────────────────────────────────────────────
function write(route, html) {
    const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
    const dest = path.join(OUT, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
    return file;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const written = [write('/', homePage()), write('/about', aboutPage())];
eventPages.forEach(ep => written.push(write('/' + ep.slug, eventPage(ep))));
articles.forEach(a => written.push(write('/article/' + a.id, articlePage(a))));

fs.cpSync(path.join(__dirname, 'public'), OUT, { recursive: true });
fs.cpSync(path.join(__dirname, 'assets'), path.join(OUT, 'assets'), { recursive: true });
['styles.css', 'app.js'].forEach(f => fs.copyFileSync(path.join(__dirname, f), path.join(OUT, f)));

const now = new Date().toISOString();
const urls = [
    { loc: SITE, freq: 'weekly', pri: '1.0' },
    { loc: SITE + '/about', freq: 'yearly', pri: '0.4' },
    ...eventPages.map(ep => ({ loc: `${SITE}/${ep.slug}`, freq: 'weekly', pri: '0.9' })),
    ...articles.map(a => ({ loc: `${SITE}/article/${a.id}`, freq: 'monthly', pri: '0.6' })),
];
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${now}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.pri}</priority></url>`).join('\n') +
    `\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`dist/ — ${written.length} stron:\n  ${written.join('\n  ')}`);
