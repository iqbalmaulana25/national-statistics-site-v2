// NusaStat v2 charts — hand-rolled SVG charts. No libraries, no network.
// Every chart is a pure function of its data and returns an SVG string that
// the views drop into the page. Colours match the site stylesheet.

const TEAL = '#0f766e';
const AMBER = '#d97706';
const RED = '#b91c1c';
const INK = '#14273d';
const SOFT = '#43566d';

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const PALETTE = ['#0f766e', '#d97706', '#14273d', '#3b82a0', '#8a9ba8', '#c2410c', '#65a30d', '#7c3aed', '#e11d48', '#64748b'];

// Line chart with a soft area fill. `labels` are the x-axis captions (years),
// `format` renders axis values. Negative values are handled: the scale always
// includes zero when the data cross it.
export function lineChart(values, labels, format, options = {}) {
  const w = options.width ?? 640;
  const h = options.height ?? 250;
  const padL = 52, padR = 14, padT = 14, padB = 26;
  // Axis labels can use a shorter rendering than the data labels (e.g. no
  // cents on a dollars axis), so the left gutter never clips them.
  const yFormat = options.yFormat ?? format;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  const span = hi - lo || 1;
  const pad = span * 0.12;
  lo = lo < 0 ? Math.min(lo - pad, 0) : lo - pad;
  hi = hi + pad;
  const x = (i) => padL + (innerW * i) / (values.length - 1);
  const y = (v) => padT + innerH * (1 - (v - lo) / (hi - lo));
  const points = values.map((v, i) => [x(i), y(v)]);
  const line = points.map(([px, py], i) => (i === 0 ? `M${px.toFixed(1)},${py.toFixed(1)}` : `L${px.toFixed(1)},${py.toFixed(1)}`)).join(' ');
  const area = `${line} L${x(values.length - 1).toFixed(1)},${(padT + innerH).toFixed(1)} L${x(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;
  let grid = '';
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) * t) / 4;
    const gy = y(v);
    grid += `<line class="grid-line" x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}"/>`;
    grid += `<text class="axis-label" x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end">${esc(yFormat(v))}</text>`;
  }
  const zero = lo < 0 ? `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - padR}" y2="${y(0).toFixed(1)}" stroke="#b9b09a" stroke-width="1"/>` : '';
  const dots = points.map(([px, py]) => `<circle class="chart-dot" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.2"/>`).join('');
  const xLabels = labels.map((lb, i) => `<text class="axis-label" x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle">${esc(lb)}</text>`).join('');
  const last = values[values.length - 1];
  const lastTag = `<text x="${(w - padR).toFixed(1)}" y="${(y(last) - 10).toFixed(1)}" text-anchor="end" font-size="13" font-weight="700" fill="${TEAL}">${esc(format(last))}</text>`;
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart">${grid}${zero}<path class="chart-area" d="${area}"/><path class="chart-line" d="${line}"/>${dots}${xLabels}${lastTag}</svg>`;
}

// Horizontal bar chart. Each item: { label, value, note? }. `format` renders
// the value; bars are teal, amber when `item.accent` is set, red when negative.
export function barChart(items, format, options = {}) {
  const w = options.width ?? 640;
  const rowH = 30;
  const labelW = options.labelWidth ?? 190;
  const h = items.length * rowH + 12;
  const max = Math.max(...items.map((d) => Math.abs(d.value)), 1e-9);
  const barMax = w - labelW - 90;
  const rows = items.map((d, i) => {
    const y = 8 + i * rowH;
    const len = Math.max(2, (Math.abs(d.value) / max) * barMax);
    const cls = d.value < 0 ? 'bar-rect neg' : d.accent ? 'bar-rect alt' : 'bar-rect';
    const note = d.note ? ` <tspan fill="${SOFT}">(${esc(d.note)})</tspan>` : '';
    return `<text class="bar-label" x="0" y="${y + 15}">${esc(d.label)}</text>` +
      `<rect class="${cls}" x="${labelW}" y="${y + 3}" width="${len.toFixed(1)}" height="16" rx="3"/>` +
      `<text class="bar-label" x="${(labelW + len + 8).toFixed(1)}" y="${y + 15}" font-weight="700">${esc(format(d.value))}${note}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart">${rows}</svg>`;
}

// Donut chart with a legend. Each item: { label, value }. The centre shows
// the total; the caller renders the legend from the same items.
export function donutChart(items, options = {}) {
  const size = options.size ?? 220;
  const total = items.reduce((s, d) => s + d.value, 0);
  const r = 78, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segs = items.map((d, i) => {
    const frac = d.value / total;
    const dash = frac * circ;
    const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PALETTE[i % PALETTE.length]}" stroke-width="30" stroke-dasharray="${dash.toFixed(2)} ${(circ - dash).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += dash;
    return seg;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="Donut chart">${segs}` +
    `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">100%</text>` +
    `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${SOFT}">of GDP</text></svg>`;
}

export function legend(items) {
  return `<div class="legend">${items.map((d, i) => `<span><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(d.label)} — ${d.value.toFixed(1)}%</span>`).join('')}</div>`;
}

export { TEAL, AMBER, RED, INK };
