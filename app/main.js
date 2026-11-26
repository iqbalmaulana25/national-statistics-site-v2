// NusaStat v2 shell — hash router, navigation state, and control wiring.
// The pages live in pages.js, the charts in charts.js, the figures in data.js.
// No network requests: every module is a file under app/.

import {
  pageHome, pagePopulation, pageEconomy, pagePrices, pageJobs, pageWelfare,
  pageProvinces, pageProvince, pageSources, pageNotFound, provinceCsv,
} from './pages.js';

const app = document.getElementById('app');

// UI state that survives re-renders: the population indicator switcher and
// the province table's search, filter and sort.
const state = { popKey: 'population', q: '', island: 'All islands', sort: 'pop-desc' };

const TITLES = {
  '': 'NusaStat — Statistik Indonesia',
  penduduk: 'Penduduk — NusaStat',
  ekonomi: 'Ekonomi — NusaStat',
  harga: 'Harga & Inflasi — NusaStat',
  kerja: 'Ketenagakerjaan — NusaStat',
  sejahtera: 'Kesejahteraan — NusaStat',
  provinsi: 'Provinsi — NusaStat',
  sumber: 'Sumber & Metode — NusaStat',
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [name, arg] = hash.split('/');
  return { name: name || '', arg: arg || '' };
}

function render() {
  const { name, arg } = currentRoute();
  let html;
  if (name === '') html = pageHome();
  else if (name === 'penduduk') html = pagePopulation(state.popKey);
  else if (name === 'ekonomi') html = pageEconomy();
  else if (name === 'harga') html = pagePrices();
  else if (name === 'kerja') html = pageJobs();
  else if (name === 'sejahtera') html = pageWelfare();
  else if (name === 'provinsi' && !arg) html = pageProvinces(state);
  else if (name === 'provinsi' && arg) html = pageProvince(arg);
  else if (name === 'sumber') html = pageSources();
  else html = pageNotFound();
  app.innerHTML = html;
  document.title = TITLES[name] ?? 'NusaStat — Statistik Indonesia';
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === name);
  });
  bindControls(name);
  window.scrollTo(0, 0);
}

// Wire the controls of the page just rendered. Controls re-render the page
// from `state`, so the table and the switcher always agree with the inputs.
function bindControls(name) {
  if (name === 'penduduk') {
    app.querySelectorAll('[data-indicator]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.popKey = btn.dataset.indicator;
        render();
      });
    });
  }
  if (name === 'provinsi') {
    const q = app.querySelector('#q');
    const island = app.querySelector('#island');
    const sort = app.querySelector('#sort');
    const csv = app.querySelector('#downloadCsv');
    if (q) {
      q.addEventListener('input', () => {
        state.q = q.value;
        render();
        // Re-rendering rebuilds the input; put the caret back where it was.
        const next = app.querySelector('#q');
        next.focus();
        next.setSelectionRange(next.value.length, next.value.length);
      });
    }
    if (island) island.addEventListener('change', () => { state.island = island.value; render(); });
    if (sort) sort.addEventListener('change', () => { state.sort = sort.value; render(); });
    if (csv) {
      csv.addEventListener('click', () => {
        const blob = new Blob([provinceCsv()], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nusastat-provinces-2024.csv';
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }
}

window.addEventListener('hashchange', render);
render();
