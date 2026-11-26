// NusaStat v2 data — Indonesia national statistics.
// All figures are real published figures, rounded for display. Every indicator
// carries its source and reference year; the Sources page lists the full
// publication references.
// Population: BPS (Statistics Indonesia), mid-year estimates 2015–2024.
// GDP and prices: BPS national accounts and CPI releases, 2015–2024.
// Labour: BPS Sakernas (National Labour Force Survey), August 2015–2024.
// Poverty: BPS, September 2015–2024. HDI and life expectancy: BPS, 2015–2024.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Ten-year series for the headline indicators. `format` renders a value the
// way the site shows it in charts, tables and KPI cards.
export const INDICATORS = [
  {
    key: 'population', label: 'Population', unit: 'million people',
    source: 'BPS, mid-year estimates 2015–2024',
    values: [255.6, 258.7, 261.9, 265.0, 268.1, 271.1, 274.2, 277.4, 279.4, 281.6],
    format: (v) => v.toFixed(1) + ' m',
  },
  {
    key: 'gdpGrowth', label: 'Real GDP growth', unit: '% per year',
    source: 'BPS national accounts 2015–2024',
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
    format: (v) => v.toFixed(2) + '%',
  },
  {
    key: 'gdpPerCapita', label: 'GDP per capita', unit: 'US dollars',
    source: 'BPS / World Bank 2015–2024',
    values: [3336, 3571, 3843, 3927, 4175, 3923, 4349, 4788, 4790, 4919],
    format: (v) => '$' + v.toLocaleString('en-US'),
  },
  {
    key: 'inflation', label: 'Consumer price inflation', unit: '% year on year',
    source: 'BPS CPI releases 2015–2024',
    values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
    format: (v) => v.toFixed(2) + '%',
  },
  {
    key: 'unemployment', label: 'Open unemployment rate', unit: '% of labour force',
    source: 'BPS Sakernas, August 2015–2024',
    values: [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.76],
    format: (v) => v.toFixed(2) + '%',
  },
  {
    key: 'poverty', label: 'Poverty rate', unit: '% of population',
    source: 'BPS, September 2015–2024',
    values: [11.13, 10.70, 10.12, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
    format: (v) => v.toFixed(2) + '%',
  },
  {
    key: 'lifeExpectancy', label: 'Life expectancy at birth', unit: 'years',
    source: 'BPS 2015–2024',
    values: [71.2, 71.5, 71.7, 71.9, 72.1, 72.3, 72.7, 73.5, 73.9, 74.2],
    format: (v) => v.toFixed(1) + ' yrs',
  },
  {
    key: 'hdi', label: 'Human Development Index', unit: 'index (0–100)',
    source: 'BPS 2015–2024',
    values: [69.6, 70.2, 70.8, 71.4, 71.9, 71.9, 72.3, 73.0, 74.4, 75.0],
    format: (v) => v.toFixed(2),
  },
];

export function indicator(key) {
  return INDICATORS.find((d) => d.key === key);
}

// Headline cards for the dashboard, all 2024.
export const KPI_2024 = [
  { key: 'population', value: '281.6 m', note: 'Population, 2024', detail: '+1.09% on 2023 · 4th largest in the world' },
  { key: 'gdpGrowth', value: '5.03%', note: 'Real GDP growth, 2024', detail: 'GDP Rp 22,139 trillion' },
  { key: 'gdpPerCapita', value: '$4,919', note: 'GDP per capita, 2024', detail: 'Rp 78.6 million per person' },
  { key: 'inflation', value: '1.57%', note: 'Inflation (yoy), Dec 2024', detail: 'Inside the 2.5% ± 1 target band' },
  { key: 'unemployment', value: '4.76%', note: 'Unemployment, Aug 2024', detail: 'Lowest since the 1998 crisis' },
  { key: 'poverty', value: '8.57%', note: 'Poverty rate, Sep 2024', detail: '24.06 million people below the line' },
];

// Age structure 2024 (% of population), BPS.
export const AGE_GROUPS = [
  { label: '0–14 years', value: 25.4 },
  { label: '15–24 years', value: 17.1 },
  { label: '25–54 years', value: 41.2 },
  { label: '55–64 years', value: 9.8 },
  { label: '65+ years', value: 6.5 },
];

// GDP by sector, share of GDP 2024 (%), BPS.
export const GDP_SECTORS = [
  { label: 'Manufacturing', value: 18.7 },
  { label: 'Wholesale & retail trade', value: 13.0 },
  { label: 'Agriculture, forestry & fishing', value: 12.5 },
  { label: 'Construction', value: 10.0 },
  { label: 'Mining & quarrying', value: 8.7 },
  { label: 'Transport & storage', value: 5.2 },
  { label: 'Information & communication', value: 4.1 },
  { label: 'Financial & insurance', value: 4.3 },
  { label: 'Other services', value: 23.5 },
];

// CPI basket weights and 2024 inflation by group (%, BPS).
export const CPI_GROUPS = [
  { label: 'Food, beverages & tobacco', weight: 25.0, inflation: 1.9 },
  { label: 'Housing, water & energy', weight: 19.1, inflation: 1.2 },
  { label: 'Transport', weight: 11.9, inflation: 0.9 },
  { label: 'Clothing & footwear', weight: 5.6, inflation: 1.1 },
  { label: 'Health', weight: 4.6, inflation: 2.1 },
  { label: 'Education', weight: 5.9, inflation: 1.8 },
  { label: 'Restaurants & hotels', weight: 9.7, inflation: 2.0 },
  { label: 'Other goods & services', weight: 18.2, inflation: 1.5 },
];

// Labour snapshot, August 2024 (BPS Sakernas). Millions of people unless noted.
export const LABOUR = {
  labourForce: 152.1,
  employed: 144.9,
  unemployed: 7.2,
  informalShare: 59.2, // % of employed
  participation: 70.2, // % labour-force participation rate
  bySector: [
    { label: 'Agriculture', value: 28.5 },
    { label: 'Trade & services', value: 47.3 },
    { label: 'Manufacturing', value: 13.7 },
    { label: 'Construction', value: 6.1 },
    { label: 'Other', value: 4.4 },
  ],
};

// Provinces: population 2024 (million, BPS mid-year estimate), poverty rate
// Sep 2024 (%), GRDP share of national GDP 2024 (%), unemployment Aug 2024 (%).
export const PROVINCES = [
  { slug: 'aceh', name: 'Aceh', island: 'Sumatra', pop: 5.55, poverty: 14.3, grdp: 1.0, unemp: 5.8 },
  { slug: 'north-sumatra', name: 'North Sumatra', island: 'Sumatra', pop: 15.59, poverty: 8.0, grdp: 4.6, unemp: 5.2 },
  { slug: 'west-sumatra', name: 'West Sumatra', island: 'Sumatra', pop: 5.73, poverty: 5.7, grdp: 1.5, unemp: 5.9 },
  { slug: 'riau', name: 'Riau', island: 'Sumatra', pop: 6.85, poverty: 6.5, grdp: 4.5, unemp: 4.3 },
  { slug: 'jambi', name: 'Jambi', island: 'Sumatra', pop: 3.63, poverty: 7.1, grdp: 1.2, unemp: 4.3 },
  { slug: 'south-sumatra', name: 'South Sumatra', island: 'Sumatra', pop: 8.84, poverty: 11.3, grdp: 2.9, unemp: 4.1 },
  { slug: 'bengkulu', name: 'Bengkulu', island: 'Sumatra', pop: 2.06, poverty: 13.0, grdp: 0.4, unemp: 3.8 },
  { slug: 'lampung', name: 'Lampung', island: 'Sumatra', pop: 9.22, poverty: 10.7, grdp: 1.8, unemp: 4.1 },
  { slug: 'bangka-belitung', name: 'Bangka Belitung', island: 'Sumatra', pop: 1.52, poverty: 4.5, grdp: 0.4, unemp: 5.0 },
  { slug: 'riau-islands', name: 'Riau Islands', island: 'Sumatra', pop: 2.17, poverty: 5.4, grdp: 1.2, unemp: 6.9 },
  { slug: 'jakarta', name: 'DKI Jakarta', island: 'Java', pop: 10.68, poverty: 4.3, grdp: 16.5, unemp: 6.2 },
  { slug: 'west-java', name: 'West Java', island: 'Java', pop: 49.94, poverty: 7.5, grdp: 14.4, unemp: 7.3 },
  { slug: 'central-java', name: 'Central Java', island: 'Java', pop: 37.89, poverty: 10.5, grdp: 8.4, unemp: 4.8 },
  { slug: 'yogyakarta', name: 'DI Yogyakarta', island: 'Java', pop: 3.76, poverty: 10.8, grdp: 0.9, unemp: 3.5 },
  { slug: 'east-java', name: 'East Java', island: 'Java', pop: 41.81, poverty: 9.8, grdp: 14.6, unemp: 4.5 },
  { slug: 'banten', name: 'Banten', island: 'Java', pop: 12.43, poverty: 5.9, grdp: 3.1, unemp: 6.6 },
  { slug: 'bali', name: 'Bali', island: 'Bali & Nusa Tenggara', pop: 4.41, poverty: 3.9, grdp: 1.1, unemp: 2.1 },
  { slug: 'west-nusa-tenggara', name: 'West Nusa Tenggara', island: 'Bali & Nusa Tenggara', pop: 5.60, poverty: 12.8, grdp: 0.7, unemp: 3.3 },
  { slug: 'east-nusa-tenggara', name: 'East Nusa Tenggara', island: 'Bali & Nusa Tenggara', pop: 5.66, poverty: 19.5, grdp: 0.6, unemp: 3.3 },
  { slug: 'west-kalimantan', name: 'West Kalimantan', island: 'Kalimantan', pop: 5.80, poverty: 6.8, grdp: 1.5, unemp: 4.3 },
  { slug: 'central-kalimantan', name: 'Central Kalimantan', island: 'Kalimantan', pop: 2.81, poverty: 5.1, grdp: 1.0, unemp: 3.8 },
  { slug: 'south-kalimantan', name: 'South Kalimantan', island: 'Kalimantan', pop: 4.27, poverty: 4.1, grdp: 1.6, unemp: 4.4 },
  { slug: 'east-kalimantan', name: 'East Kalimantan', island: 'Kalimantan', pop: 3.96, poverty: 6.0, grdp: 4.0, unemp: 5.4 },
  { slug: 'north-kalimantan', name: 'North Kalimantan', island: 'Kalimantan', pop: 0.73, poverty: 6.5, grdp: 0.7, unemp: 4.3 },
  { slug: 'north-sulawesi', name: 'North Sulawesi', island: 'Sulawesi', pop: 2.71, poverty: 7.4, grdp: 0.9, unemp: 6.2 },
  { slug: 'central-sulawesi', name: 'Central Sulawesi', island: 'Sulawesi', pop: 3.10, poverty: 11.7, grdp: 1.3, unemp: 3.0 },
  { slug: 'south-sulawesi', name: 'South Sulawesi', island: 'Sulawesi', pop: 9.36, poverty: 8.1, grdp: 3.1, unemp: 4.5 },
  { slug: 'southeast-sulawesi', name: 'Southeast Sulawesi', island: 'Sulawesi', pop: 2.79, poverty: 10.7, grdp: 0.9, unemp: 3.2 },
  { slug: 'gorontalo', name: 'Gorontalo', island: 'Sulawesi', pop: 1.25, poverty: 14.9, grdp: 0.3, unemp: 3.2 },
  { slug: 'west-sulawesi', name: 'West Sulawesi', island: 'Sulawesi', pop: 1.51, poverty: 11.0, grdp: 0.3, unemp: 2.7 },
  { slug: 'maluku', name: 'Maluku', island: 'Maluku & Papua', pop: 2.00, poverty: 16.2, grdp: 0.3, unemp: 6.4 },
  { slug: 'north-maluku', name: 'North Maluku', island: 'Maluku & Papua', pop: 1.45, poverty: 6.4, grdp: 0.4, unemp: 4.5 },
  { slug: 'southwest-papua', name: 'Southwest Papua', island: 'Maluku & Papua', pop: 0.61, poverty: 21.5, grdp: 0.5, unemp: 5.0 },
  { slug: 'papua', name: 'Papua', island: 'Maluku & Papua', pop: 1.13, poverty: 24.5, grdp: 0.8, unemp: 3.7 },
  { slug: 'south-papua', name: 'South Papua', island: 'Maluku & Papua', pop: 0.54, poverty: 20.8, grdp: 0.2, unemp: 3.4 },
  { slug: 'central-papua', name: 'Central Papua', island: 'Maluku & Papua', pop: 1.36, poverty: 29.6, grdp: 0.4, unemp: 3.9 },
  { slug: 'highland-papua', name: 'Highland Papua', island: 'Maluku & Papua', pop: 1.47, poverty: 34.1, grdp: 0.2, unemp: 4.1 },
  { slug: 'west-papua', name: 'West Papua', island: 'Maluku & Papua', pop: 0.58, poverty: 21.1, grdp: 0.3, unemp: 4.6 },
];

export function provinceBySlug(slug) {
  return PROVINCES.find((p) => p.slug === slug);
}

export function totalPopulation() {
  return PROVINCES.reduce((sum, p) => sum + p.pop, 0);
}
