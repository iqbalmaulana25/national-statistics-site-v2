// NusaStat v2 views — one function per page. Each returns an HTML string;
// main.js injects it into #app and then calls bindPage() to wire the controls.
// All figures come from data.js; every number on a page names its source.

import {
  YEARS, INDICATORS, indicator, KPI_2024, AGE_GROUPS, GDP_SECTORS,
  CPI_GROUPS, LABOUR, PROVINCES, provinceBySlug, totalPopulation,
} from './data.js';
import { lineChart, barChart, donutChart, legend, esc } from './charts.js';

function sourceLine(text) {
  return `<p class="source-note">Source: ${esc(text)}</p>`;
}

function pageHead(kicker, title, lede) {
  return `<p class="page-kicker">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lede">${lede}</p>`;
}

function kpiCards() {
  return `<div class="kpis">${KPI_2024.map((k, i) =>
    `<div class="kpi${i % 3 === 2 ? ' amber' : ''}"><div class="kpi-value">${esc(k.value)}</div>` +
    `<div class="kpi-label">${esc(k.note)}</div><div class="kpi-detail">${esc(k.detail)}</div></div>`).join('')}</div>`;
}

function changeCell(values, format) {
  const now = values[values.length - 1];
  const prev = values[values.length - 2];
  const diff = now - prev;
  const sign = diff >= 0 ? '+' : '';
  return `${format(now)} <span style="color:#43566d">(${sign}${format(diff)} vs 2023)</span>`;
}

// ---------------------------------------------------------------- home
export function pageHome() {
  const pop = indicator('population');
  const growth = indicator('gdpGrowth');
  const releases = INDICATORS.map((d) => {
    const now = d.values[d.values.length - 1];
    const prev = d.values[d.values.length - 2];
    const diff = now - prev;
    const sign = diff >= 0 ? '+' : '';
    return `<tr><td>${esc(d.label)}</td><td class="num">${esc(d.format(now))}</td>` +
      `<td class="num">${esc(d.format(prev))}</td><td class="num">${sign}${esc(d.format(diff))}</td>` +
      `<td>${esc(d.source)}</td></tr>`;
  }).join('');
  return `
  ${pageHead('Indonesia · 2015–2024', 'Indonesia in numbers', 'The headline statistics of the world’s fourth-largest country — population, output, prices, jobs and welfare — from the publications of BPS, Bank Indonesia and the World Bank. Every figure names its source and year.')}
  ${kpiCards()}
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Population, 2015–2024</p>
      <p class="chart-sub">${esc(pop.label)} · ${esc(pop.unit)}</p>
      ${lineChart(pop.values, YEARS, pop.format)}
      ${sourceLine(pop.source)}
    </section>
    <section class="card">
      <p class="chart-title">Real GDP growth, 2015–2024</p>
      <p class="chart-sub">Annual change in real GDP · the 2020 contraction was the pandemic year</p>
      ${barChart(YEARS.map((y, i) => ({ label: String(y), value: growth.values[i], accent: growth.values[i] === 5.31 })), (v) => v.toFixed(2) + '%', { labelWidth: 60 })}
      ${sourceLine(growth.source)}
    </section>
  </div>
  <section class="card">
    <h2 style="margin-top:0">What the numbers say</h2>
    <ul class="findings">
      <li><strong>281.6 million people</strong> in 2024 — growth has slowed to about 1% a year as fertility falls.</li>
      <li><strong>5.03% GDP growth</strong> in 2024, the fifth straight year at or above 5% outside the pandemic.</li>
      <li><strong>1.57% inflation</strong> in December 2024 — the lowest year-end rate in the decade, inside Bank Indonesia’s target band.</li>
      <li><strong>4.76% unemployment</strong> in August 2024, the lowest since the 1998 crisis, and <strong>8.57% poverty</strong> in September 2024, the lowest on record.</li>
    </ul>
  </section>
  <section class="card">
    <h2 style="margin-top:0">Latest releases — 2024 against 2023</h2>
    <table class="data">
      <thead><tr><th>Indicator</th><th class="num">2024</th><th class="num">2023</th><th class="num">Change</th><th>Source</th></tr></thead>
      <tbody>${releases}</tbody>
    </table>
    ${sourceLine('BPS releases, 2015–2024. Change is in the indicator’s own units (percentage points where the unit is %).')}
  </section>
  <section>
    <h2>Explore the data</h2>
    <div class="quick-links">
      <a href="#/penduduk"><b>Population</b><span>Age structure and all 38 provinces</span></a>
      <a href="#/ekonomi"><b>Economy</b><span>GDP, growth and sectors</span></a>
      <a href="#/harga"><b>Prices</b><span>Inflation and the CPI basket</span></a>
      <a href="#/kerja"><b>Jobs</b><span>Labour force and unemployment</span></a>
      <a href="#/sejahtera"><b>Welfare</b><span>Poverty and human development</span></a>
      <a href="#/provinsi"><b>Provinces</b><span>Searchable table of all 38</span></a>
      <a href="#/sumber"><b>Sources</b><span>Publications and methods</span></a>
      <a href="#/provinsi/jakarta"><b>Jakarta profile</b><span>The largest regional economy</span></a>
    </div>
  </section>`;
}

// ----------------------------------------------------------- population
export function pagePopulation(selectedKey) {
  const d = indicator(selectedKey) ?? indicator('population');
  const chips = INDICATORS.filter((x) => ['population', 'lifeExpectancy', 'hdi', 'gdpPerCapita'].includes(x.key))
    .map((x) => `<button class="chip${x.key === d.key ? ' active' : ''}" data-indicator="${x.key}">${esc(x.label)}</button>`).join('');
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const rows = top.map((p, i) => `<tr><td>${i + 1}</td><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td>${esc(p.island)}</td><td class="num">${p.pop.toFixed(2)}</td></tr>`).join('');
  return `
  ${pageHead('Penduduk', 'Population', 'Indonesia passed 281 million people in 2024. Growth is slowing, the working-age share is at its peak, and Java still holds more than half the country.')}
  <div class="chip-row" role="group" aria-label="Choose indicator">${chips}</div>
  <section class="card">
    <p class="chart-title">${esc(d.label)}, 2015–2024</p>
    <p class="chart-sub">${esc(d.unit)} · ${esc(d.source)}</p>
    ${lineChart(d.values, YEARS, d.format)}
    ${sourceLine(d.source)}
  </section>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Age structure, 2024</p>
      <p class="chart-sub">Share of population by age group · BPS</p>
      ${barChart(AGE_GROUPS, (v) => v.toFixed(1) + '%', { labelWidth: 130 })}
      <p class="source-note">A young country: 42.5% of Indonesians are under 25, and 41.2% are in the prime working ages of 25–54.</p>
    </section>
    <section class="card">
      <p class="chart-title">Largest provinces by population, 2024</p>
      <p class="chart-sub">Million people · BPS mid-year estimates</p>
      <table class="data">
        <thead><tr><th>#</th><th>Province</th><th>Island</th><th class="num">Population</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="source-note"><a href="#/provinsi">See all 38 provinces →</a></p>
    </section>
  </div>
  <div class="callout"><p><strong>Why it matters:</strong> West Java alone (49.94 m) holds more people than Spain; the five provinces of Java together hold about 152 million — 54% of the country on 7% of its land. ${''}Provinces sum to ${totalPopulation().toFixed(2)} m, matching the national estimate.</p></div>`;
}

// -------------------------------------------------------------- economy
export function pageEconomy() {
  const growth = indicator('gdpGrowth');
  const cap = indicator('gdpPerCapita');
  const top = [...PROVINCES].sort((a, b) => b.grdp - a.grdp).slice(0, 5);
  const rows = top.map((p) => `<tr><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td class="num">${p.grdp.toFixed(1)}%</td><td class="num">${p.pop.toFixed(2)} m</td></tr>`).join('');
  return `
  ${pageHead('Ekonomi', 'Economy', 'A $1.4 trillion economy that has grown at about 5% a year for a decade — manufacturing first, services close behind, and Jakarta the single largest regional economy.')}
  <div class="stat-strip">
    <div class="stat"><b>5.03%</b><span>Real GDP growth, 2024</span></div>
    <div class="stat"><b>$4,919</b><span>GDP per capita, 2024</span></div>
    <div class="stat"><b>Rp 22,139 tn</b><span>Nominal GDP, 2024</span></div>
    <div class="stat"><b>18.7%</b><span>Manufacturing share of GDP</span></div>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Real GDP growth, 2015–2024</p>
      <p class="chart-sub">% per year · BPS national accounts</p>
      ${barChart(YEARS.map((y, i) => ({ label: String(y), value: growth.values[i] })), (v) => v.toFixed(2) + '%', { labelWidth: 60 })}
      ${sourceLine(growth.source)}
    </section>
    <section class="card">
      <p class="chart-title">GDP per capita, 2015–2024</p>
      <p class="chart-sub">US dollars · BPS / World Bank</p>
      ${lineChart(cap.values, YEARS, cap.format, { yFormat: (v) => '$' + Math.round(v).toLocaleString('en-US') })}
      ${sourceLine(cap.source)}
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">GDP by sector, 2024</p>
      <p class="chart-sub">Share of GDP · BPS</p>
      <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">${donutChart(GDP_SECTORS)}<div style="flex:1;min-width:220px">${legend(GDP_SECTORS)}</div></div>
      ${sourceLine('BPS national accounts, 2024.')}
    </section>
    <section class="card">
      <p class="chart-title">Largest regional economies, 2024</p>
      <p class="chart-sub">Share of national GDP · BPS</p>
      <table class="data">
        <thead><tr><th>Province</th><th class="num">GRDP share</th><th class="num">Population</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="source-note">Jakarta (16.5%), East Java (14.6%) and West Java (14.4%) together produce 45.5% of national GDP.</p>
    </section>
  </div>`;
}

// --------------------------------------------------------------- prices
export function pagePrices() {
  const inf = indicator('inflation');
  const rows = CPI_GROUPS.map((g) => `<tr><td>${esc(g.label)}</td><td class="num">${g.weight.toFixed(1)}%</td><td class="num">${g.inflation.toFixed(1)}%</td></tr>`).join('');
  return `
  ${pageHead('Harga', 'Prices & inflation', 'Inflation ended 2024 at 1.57% — the lowest in a decade. Food is the heaviest item in the basket and the one that moves the index most.')}
  <div class="stat-strip">
    <div class="stat"><b>1.57%</b><span>Inflation (yoy), Dec 2024</span></div>
    <div class="stat"><b>2.5% ± 1</b><span>Bank Indonesia target band</span></div>
    <div class="stat"><b>5.51%</b><span>Peak inflation, 2022</span></div>
    <div class="stat"><b>25.0%</b><span>Food weight in the CPI basket</span></div>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Consumer price inflation, 2015–2024</p>
      <p class="chart-sub">% year on year · BPS CPI releases</p>
      ${lineChart(inf.values, YEARS, inf.format)}
      ${sourceLine(inf.source)}
    </section>
    <section class="card">
      <p class="chart-title">Inflation by CPI group, 2024</p>
      <p class="chart-sub">% year on year · BPS</p>
      ${barChart(CPI_GROUPS.map((g) => ({ label: g.label, value: g.inflation, note: 'weight ' + g.weight.toFixed(1) + '%' })), (v) => v.toFixed(1) + '%', { labelWidth: 190 })}
      ${sourceLine('BPS CPI releases, 2024.')}
    </section>
  </div>
  <section class="card">
    <h2 style="margin-top:0">The CPI basket — weights and 2024 inflation</h2>
    <table class="data">
      <thead><tr><th>Group</th><th class="num">Basket weight</th><th class="num">Inflation 2024</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${sourceLine('BPS, CPI basket weights and group inflation, 2024. Weights sum to 100%.')}
  </section>`;
}

// ----------------------------------------------------------------- jobs
export function pageJobs() {
  const un = indicator('unemployment');
  const worst = [...PROVINCES].sort((a, b) => b.unemp - a.unemp).slice(0, 8);
  const rows = worst.map((p) => `<tr><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td>${esc(p.island)}</td><td class="num">${p.unemp.toFixed(1)}%</td></tr>`).join('');
  return `
  ${pageHead('Ketenagakerjaan', 'Jobs & unemployment', '152.1 million Indonesians were in the labour force in August 2024. Unemployment is at its lowest since 1998 — but 6 in 10 workers are still informal.')}
  <div class="stat-strip">
    <div class="stat"><b>152.1 m</b><span>Labour force, Aug 2024</span></div>
    <div class="stat"><b>144.9 m</b><span>Employed, Aug 2024</span></div>
    <div class="stat"><b>70.2%</b><span>Participation rate</span></div>
    <div class="stat"><b>59.2%</b><span>Informal share of jobs</span></div>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Open unemployment rate, 2015–2024</p>
      <p class="chart-sub">% of labour force · BPS Sakernas, August</p>
      ${lineChart(un.values, YEARS, un.format)}
      ${sourceLine(un.source)}
    </section>
    <section class="card">
      <p class="chart-title">Employment by sector, Aug 2024</p>
      <p class="chart-sub">Share of employed · BPS Sakernas</p>
      ${barChart(LABOUR.bySector, (v) => v.toFixed(1) + '%', { labelWidth: 150 })}
      ${sourceLine('BPS Sakernas, August 2024.')}
    </section>
  </div>
  <section class="card">
    <h2 style="margin-top:0">Highest unemployment by province, Aug 2024</h2>
    <table class="data">
      <thead><tr><th>Province</th><th>Island</th><th class="num">Unemployment</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${sourceLine('BPS Sakernas, August 2024. National rate 4.76%. Bali has the lowest at 2.1%.')}
  </section>`;
}

// -------------------------------------------------------------- welfare
export function pageWelfare() {
  const pov = indicator('poverty');
  const hdi = indicator('hdi');
  const worst = [...PROVINCES].sort((a, b) => b.poverty - a.poverty).slice(0, 8);
  const best = [...PROVINCES].sort((a, b) => a.poverty - b.poverty).slice(0, 5);
  const worstRows = worst.map((p) => `<tr><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.pop.toFixed(2)} m</td></tr>`).join('');
  const bestRows = best.map((p) => `<tr><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.pop.toFixed(2)} m</td></tr>`).join('');
  return `
  ${pageHead('Kesejahteraan', 'Welfare & poverty', 'Poverty fell to 8.57% in September 2024 — the lowest on record — and human development reached 75.02. The gains are real, and they are unevenly spread.')}
  <div class="stat-strip">
    <div class="stat"><b>8.57%</b><span>Poverty rate, Sep 2024</span></div>
    <div class="stat"><b>24.06 m</b><span>People below the line</span></div>
    <div class="stat"><b>75.02</b><span>Human Development Index</span></div>
    <div class="stat"><b>74.2 yrs</b><span>Life expectancy, 2024</span></div>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Poverty rate, 2015–2024</p>
      <p class="chart-sub">% of population · BPS, September</p>
      ${lineChart(pov.values, YEARS, pov.format)}
      ${sourceLine(pov.source)}
    </section>
    <section class="card">
      <p class="chart-title">Human Development Index, 2015–2024</p>
      <p class="chart-sub">Index 0–100 · BPS</p>
      ${lineChart(hdi.values, YEARS, hdi.format)}
      ${sourceLine(hdi.source)}
    </section>
  </div>
  <div class="grid-2">
    <section class="card">
      <p class="chart-title">Highest poverty by province, Sep 2024</p>
      <table class="data">
        <thead><tr><th>Province</th><th class="num">Poverty</th><th class="num">Population</th></tr></thead>
        <tbody>${worstRows}</tbody>
      </table>
    </section>
    <section class="card">
      <p class="chart-title">Lowest poverty by province, Sep 2024</p>
      <table class="data">
        <thead><tr><th>Province</th><th class="num">Poverty</th><th class="num">Population</th></tr></thead>
        <tbody>${bestRows}</tbody>
      </table>
    </section>
  </div>
  <div class="callout"><p><strong>The gap:</strong> Highland Papua’s poverty rate (34.1%) is nearly nine times Bali’s (3.9%). Six of the eight highest-poverty provinces are in Maluku &amp; Papua. ${''}Source: BPS, September 2024.</p></div>`;
}

// ------------------------------------------------------------- provinces
const ISLANDS = ['Sumatra', 'Java', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];

const SORTS = {
  'pop-desc': (a, b) => b.pop - a.pop,
  'pop-asc': (a, b) => a.pop - b.pop,
  'poverty-desc': (a, b) => b.poverty - a.poverty,
  'poverty-asc': (a, b) => a.poverty - b.poverty,
  'grdp-desc': (a, b) => b.grdp - a.grdp,
  'unemp-desc': (a, b) => b.unemp - a.unemp,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
};

export function pageProvinces(state) {
  const q = (state.q ?? '').trim().toLowerCase();
  const island = state.island ?? 'All islands';
  const sort = state.sort ?? 'pop-desc';
  let list = PROVINCES.filter((p) => (island === 'All islands' || p.island === island) && (!q || p.name.toLowerCase().includes(q)));
  list = [...list].sort(SORTS[sort] ?? SORTS['pop-desc']);
  const rows = list.map((p) => `<tr><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td>${esc(p.island)}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.grdp.toFixed(1)}%</td><td class="num">${p.unemp.toFixed(1)}%</td></tr>`).join('');
  const islandOpts = ['All islands', ...ISLANDS].map((i) => `<option value="${esc(i)}"${i === island ? ' selected' : ''}>${esc(i)}</option>`).join('');
  const sortOpts = [['pop-desc', 'Population (largest first)'], ['pop-asc', 'Population (smallest first)'], ['poverty-desc', 'Poverty (highest first)'], ['poverty-asc', 'Poverty (lowest first)'], ['grdp-desc', 'GRDP share (largest first)'], ['unemp-desc', 'Unemployment (highest first)'], ['name-asc', 'Name (A–Z)']]
    .map(([v, l]) => `<option value="${v}"${v === sort ? ' selected' : ''}>${l}</option>`).join('');
  return `
  ${pageHead('Provinsi', 'All 38 provinces', 'Search, filter and sort every province — population, poverty, share of the economy and unemployment, each with its own profile page.')}
  <div class="controls">
    <div><label for="q">Search province</label><input id="q" type="search" placeholder="e.g. Java, Papua…" value="${esc(state.q ?? '')}"></div>
    <div><label for="island">Island group</label><select id="island">${islandOpts}</select></div>
    <div><label for="sort">Sort by</label><select id="sort">${sortOpts}</select></div>
    <div><button class="btn ghost" id="downloadCsv" type="button">Download table as CSV</button></div>
  </div>
  <section class="card">
    <p class="chart-title">${list.length} of 38 provinces shown</p>
    <table class="data">
      <thead><tr><th>Province</th><th>Island</th><th class="num">Population (m)</th><th class="num">Poverty</th><th class="num">GRDP share</th><th class="num">Unemployment</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="6">No province matches that search.</td></tr>'}</tbody>
    </table>
    ${sourceLine('BPS mid-year population estimates 2024; poverty September 2024; GRDP shares 2024; unemployment Sakernas August 2024.')}
  </section>`;
}

export function provinceCsv() {
  const head = 'Province,Island,Population (million),Poverty rate (%),GRDP share (%),Unemployment (%)';
  const lines = PROVINCES.map((p) => [p.name, p.island, p.pop.toFixed(2), p.poverty.toFixed(1), p.grdp.toFixed(1), p.unemp.toFixed(1)].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
  return [head, ...lines].join('\n');
}

// ------------------------------------------------------- province page
export function pageProvince(slug) {
  const p = provinceBySlug(slug);
  if (!p) return pageNotFound();
  const byPop = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === slug) + 1;
  const byPov = [...PROVINCES].sort((a, b) => b.poverty - a.poverty).findIndex((x) => x.slug === slug) + 1;
  return `
  ${pageHead(`${esc(p.island)} · Province profile`, esc(p.name), `${esc(p.name)} is the ${ordinal(byPop)} largest province by population and ranks ${ordinal(byPov)} of 38 on poverty (lowest first). Figures are BPS 2024 unless noted.`)}
  <div class="stat-strip">
    <div class="stat"><b>${p.pop.toFixed(2)} m</b><span>Population, 2024</span></div>
    <div class="stat"><b>${p.poverty.toFixed(1)}%</b><span>Poverty rate, Sep 2024</span></div>
    <div class="stat"><b>${p.grdp.toFixed(1)}%</b><span>Share of national GDP</span></div>
    <div class="stat"><b>${p.unemp.toFixed(1)}%</b><span>Unemployment, Aug 2024</span></div>
  </div>
  <section class="card">
    <h2 style="margin-top:0">In context</h2>
    <ul class="findings">
      <li><strong>Population:</strong> ${p.pop.toFixed(2)} million people — ${(p.pop / totalPopulation() * 100).toFixed(1)}% of Indonesia.</li>
      <li><strong>Poverty:</strong> ${p.poverty.toFixed(1)}% against a national 8.57% (September 2024).</li>
      <li><strong>Economy:</strong> ${p.grdp.toFixed(1)}% of national GDP, against Jakarta’s 16.5% — the largest share.</li>
      <li><strong>Jobs:</strong> ${p.unemp.toFixed(1)}% unemployment against a national 4.76% (August 2024).</li>
    </ul>
    ${sourceLine('BPS mid-year estimates 2024; poverty September 2024; GRDP 2024; Sakernas August 2024.')}
  </section>
  <p><a href="#/provinsi">← Back to all provinces</a></p>`;
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// --------------------------------------------------------------- sources
export function pageSources() {
  return `
  ${pageHead('Sumber & metode', 'Sources & methods', 'Every figure on this site comes from a named publication. Figures are rounded for display; the publications below hold the exact values.')}
  <section class="card">
    <h2 style="margin-top:0">Publications</h2>
    <ul class="findings">
      <li><strong>BPS — Statistical Yearbook of Indonesia 2025</strong> (population, HDI, life expectancy).</li>
      <li><strong>BPS — National Accounts (GDP) 2015–2024</strong> (real GDP growth, GDP per capita, sector shares, GRDP shares).</li>
      <li><strong>BPS — Consumer Price Index releases, 2015–2024</strong> (annual inflation, CPI basket weights and group inflation).</li>
      <li><strong>BPS — National Labour Force Survey (Sakernas), August 2024</strong> (labour force, employment, unemployment, informality).</li>
      <li><strong>BPS — Poverty profile, September 2024</strong> (poverty rates, national and provincial; 24.06 million people below the line).</li>
      <li><strong>World Bank — World Development Indicators</strong> (GDP per capita in US dollars, cross-checked with BPS).</li>
    </ul>
  </section>
  <section class="card">
    <h2 style="margin-top:0">Methods &amp; notes</h2>
    <ul class="findings">
      <li>Population figures are BPS mid-year estimates; provincial figures sum to ${totalPopulation().toFixed(2)} million, matching the national estimate of 281.6 million.</li>
      <li>Growth rates are year-on-year changes in real (constant-price) GDP; inflation is the December year-on-year CPI change.</li>
      <li>Unemployment is the open unemployment rate from Sakernas, August of each year; the poverty line is BPS’s September 2024 line.</li>
      <li>Provincial poverty and GRDP figures use the 38 provinces as of 2024, including the four new Papuan provinces.</li>
      <li>This site is an original presentation of public statistics. It is not affiliated with BPS, Bank Indonesia or the World Bank.</li>
    </ul>
  </section>`;
}

export function pageNotFound() {
  return `<div class="not-found"><p class="page-kicker">404</p><h1>Page not found</h1><p class="lede" style="margin:0 auto">That page isn’t part of this site. Try the dashboard or the province table.</p><p><a class="btn" href="#/">Back to the dashboard</a></p></div>`;
}
