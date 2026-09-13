Static export of the portfolio. index.html is self-contained: React is inlined
(no unpkg fetch), there is no Babel and no browser-side JSX compilation.

assets/outage/states-10m.json  — U.S. state geometry, fetched at runtime by the
                                 Power Outage map (CDN is only a fallback).
assets/og.png                  — referenced by the absolute og:image URL.
assets/favicon.svg,
assets/apple-touch-icon.png    — icons.
doudou.html, cogs127.html      — legacy URL compatibility (→ /#doudou, /#work).
.nojekyll                      — serve files verbatim on GitHub Pages.
