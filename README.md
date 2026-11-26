# NusaStat v2 — National Statistics Explorer

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/iqbalmaulana25/national-statistics-site-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/iqbalmaulana25/national-statistics-site-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An entry for the [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539) bounty on make.fun.

**NusaStat** is an original, fully offline national statistics explorer for Indonesia. It runs
from static files with no build step and no network request: open `app/index.html` in desktop
Chrome or on a phone and everything works.

## What it covers

- **Dashboard** — 2024 headline indicators (population 281.6 m, GDP growth 5.03%, inflation 1.57%,
  unemployment 4.76%, poverty 8.57%), population and GDP-growth charts, key findings, and a
  2024-vs-2023 releases table.
- **Population** — switchable indicator charts (population, life expectancy, HDI, GDP per capita),
  age structure, and the ten largest provinces.
- **Economy** — GDP growth and GDP-per-capita series, GDP-by-sector donut chart, and the largest
  regional economies.
- **Prices** — inflation trend 2015–2024, inflation by CPI group, and the full CPI basket with weights.
- **Jobs** — labour-force snapshot (152.1 m, August 2024), unemployment trend, employment by
  sector, and the highest-unemployment provinces.
- **Welfare** — poverty and HDI trends, and the highest- and lowest-poverty provinces.
- **Provinces** — all 38 provinces with live search, island filter, sorting, per-province profile
  pages, and a working "Download table as CSV" button.
- **Sources & methods** — every figure is labelled with its source and year (BPS, Bank Indonesia,
  World Bank).

## How it works

- Static files under `app/` — `index.html`, `style.css`, `main.js` (hash router + control wiring),
  `pages.js` (one function per page), `charts.js` (hand-rolled SVG line, bar and donut charts),
  `data.js` (published figures with sources). No libraries, no frameworks, no external requests.
- Hash routes (`#/`, `#/penduduk`, `#/ekonomi`, `#/harga`, `#/kerja`, `#/sejahtera`, `#/provinsi`,
  `#/provinsi/<slug>`, `#/sumber`) — every page is reached by a link and every control works.
- `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and
  writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.

## Run locally

```sh
# serve app/ and open http://localhost:8080
python3 -m http.server 8080 --directory app
# build the hand-in
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## About this version

This is the v2 build of NusaStat, rebuilt from scratch after the competition opened on
2026-11-26 (the v1 repository predated the opening, so this fresh repository carries the
entry). The README badge block above uses this competition's three live make.fun badges.

## License

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=hhk4ynvx&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
