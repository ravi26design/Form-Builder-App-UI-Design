// Mock data ported from the FES Form Builder web app (buildSeedForms + seed markup)

export const ROLES = [
  { name: 'Super Admin', icon: 'shield-checkmark', color: '#7C3AED', bg: '#F1ECFE' },
  { name: 'Org Admin', icon: 'person-circle', color: '#1F4397', bg: '#E7EDFB' },
  { name: 'Field User', icon: 'person', color: '#39A248', bg: '#E8F5EA' },
];

export const ORGS = [
  'India Observatory',
  'Wildlife Conservation Trust',
  'Forest Research Institute',
  'Rural Development Foundation',
];

// ---- Field palette (builder left rail) ----
export const FIELD_PALETTE = [
  {
    group: 'Structure',
    items: [
      { type: 'Section', icon: 'layers' },
      { type: 'Templates', icon: 'documents' },
    ],
  },
  {
    group: 'Basic',
    items: [
      { type: 'Short Text', icon: 'text' },
      { type: 'Long Text', icon: 'reorder-four' },
      { type: 'Number', icon: 'calculator' },
      { type: 'Email', icon: 'mail' },
      { type: 'Phone', icon: 'call' },
      { type: 'Date', icon: 'calendar' },
      { type: 'Date & Time', icon: 'time' },
      { type: 'Percentage', icon: 'stats-chart' },
    ],
  },
  {
    group: 'Choice',
    items: [
      { type: 'Dropdown', icon: 'chevron-down-circle' },
      { type: 'Multiple Choice', icon: 'radio-button-on' },
      { type: 'Checkboxes', icon: 'checkbox' },
    ],
  },
  {
    group: 'Media',
    items: [
      { type: 'Photo Upload', icon: 'image' },
      { type: 'File Upload', icon: 'cloud-upload' },
      { type: 'Signature', icon: 'create' },
    ],
  },
  {
    group: 'Advanced',
    items: [
      { type: 'Location', icon: 'location' },
      { type: 'Map Data', icon: 'map' },
      { type: 'Website URL', icon: 'link' },
      { type: 'Rating', icon: 'star' },
    ],
  },
];

export const CHOICE_TYPES = ['Dropdown', 'Multiple Choice', 'Checkboxes'];

export function defaultOpts(type) {
  return CHOICE_TYPES.includes(type) ? ['Option 1', 'Option 2', 'Option 3'] : null;
}

export function placeholderFor(type) {
  const map = {
    'Short Text': 'Enter text',
    'Long Text': 'Enter details',
    Number: 'Enter a number',
    Email: 'name@example.com',
    Phone: '+91 00000 00000',
    Date: 'Select a date',
    'Date & Time': 'Select date & time',
    Percentage: 'Enter percentage',
    Dropdown: 'Select an option',
    'Website URL': 'https://',
    Location: 'Capture current location',
  };
  return map[type] || 'Enter value';
}

// ---- Program / form type templates (from TYPES in buildSeedForms) ----
const TYPES = [
  { n: 'Watershed Assessment Survey', cat: 'water', prog: 'Watershed Management Initiative', org: 'India Observatory', d: 'Monthly monitoring of water resources in rural communities', ind: ['Water Quality Index', 'Rainfall Measurement', 'Soil Moisture'] },
  { n: 'Groundwater Monitoring', cat: 'water', prog: 'Watershed Management Initiative', org: 'India Observatory', d: 'Groundwater level and recharge tracking', ind: ['Groundwater Level', 'Water Quality Index'] },
  { n: 'Biodiversity Monitoring Form', cat: 'bio', prog: 'Biodiversity Program', org: 'Wildlife Conservation Trust', d: 'Track species diversity and habitat health', ind: ['Species Diversity Count', 'Community Participation'] },
  { n: 'Wildlife Sighting Report', cat: 'bio', prog: 'Biodiversity Program', org: 'Wildlife Conservation Trust', d: 'Field wildlife sightings and counts', ind: ['Species Diversity Count', 'Habitat Quality'] },
  { n: 'Forest Health Assessment', cat: 'forest', prog: 'Forest Health Monitoring', org: 'Forest Research Institute', d: 'Tree density, canopy cover and regeneration status', ind: ['Forest Canopy Cover %', 'Tree Regeneration Count', 'Biomass'] },
  { n: 'Tree Plantation Tracking', cat: 'forest', prog: 'Forest Health Monitoring', org: 'Forest Research Institute', d: 'Plantation progress and survival rate', ind: ['Tree Survival Rate %', 'Forest Canopy Cover %'] },
  { n: 'Soil Conservation Practices', cat: 'land', prog: 'Land & Soil Management', org: 'Rural Development Foundation', d: 'Erosion control and land management survey', ind: ['Soil Erosion Rate', 'Community Participation'] },
  { n: 'Community Livelihood Survey', cat: 'live', prog: 'Sustainable Livelihood Project', org: 'Rural Development Foundation', d: 'Household income and livelihood indicators', ind: ['Household Income Level', 'Community Participation'] },
  { n: 'Farmer Field Assessment', cat: 'live', prog: 'Sustainable Livelihood Project', org: 'Rural Development Foundation', d: 'Farm practices and yield assessment', ind: ['Household Income Level', 'Crop Yield'] },
  { n: 'Rainfall Data Collection', cat: 'climate', prog: 'Climate Adaptation Strategy', org: 'India Observatory', d: 'Daily rainfall measurement log', ind: ['Rainfall Measurement (mm)'] },
];

const REGIONS = ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'];
const BY = ['Priya Sharma', 'Rajesh Kumar', 'Arun Krishnan', 'Lakshmi Iyer', 'Meera Patel', 'Vikram Reddy', 'Suresh Nair', 'Anjali Nair'];
const MOD = ['2 hours ago', '1 day ago', '3 days ago', '5 days ago', '1 week ago', '2 weeks ago', '1 month ago', '3 months ago'];
const pad = (n) => (n < 10 ? '0' : '') + n;

export function buildSeedForms() {
  const out = [];
  for (let i = 0; i < 50; i++) {
    const t = TYPES[i % TYPES.length];
    const reg = REGIONS[Math.floor(i / TYPES.length) % REGIONS.length];
    const s = i % 9 === 0 ? 'archived' : i % 4 === 0 ? 'draft' : 'active';
    const r = s === 'draft' ? (i * 3) % 45 : s === 'archived' ? 300 + (i * 7) % 220 : 48 + (i * 37) % 470;
    out.push({
      id: 'f' + i,
      n: t.n + ' — ' + reg,
      d: t.d,
      v: 'v1.' + (i % 9),
      prog: t.prog,
      org: t.org,
      cat: t.cat,
      ind: t.ind,
      s,
      r,
      by: BY[i % BY.length],
      dt: '2024-' + pad(6 + (i % 6)) + '-' + pad(1 + (i % 27)),
      mod: MOD[i % MOD.length],
      star: i < 3 ? 1 : 0,
      // field user due dates for pending items
      due: s !== 'active' ? '2026-03-' + pad(20 + (i % 9)) : null,
    });
  }
  return out;
}

export const SEED_FORMS = buildSeedForms();

// ---- Programs (derived) ----
export const PROGRAMS = [
  { id: 'p1', name: 'Watershed Management Initiative', org: 'India Observatory', cat: 'water', forms: 8, responses: 1240, indicators: 6, desc: 'Restoring water security across rural watersheds through community monitoring.' },
  { id: 'p2', name: 'Biodiversity Program', org: 'Wildlife Conservation Trust', cat: 'bio', forms: 6, responses: 980, indicators: 4, desc: 'Tracking species diversity and habitat health across protected zones.' },
  { id: 'p3', name: 'Forest Health Monitoring', org: 'Forest Research Institute', cat: 'forest', forms: 7, responses: 1520, indicators: 5, desc: 'Assessing canopy cover, regeneration and biomass in managed forests.' },
  { id: 'p4', name: 'Land & Soil Management', org: 'Rural Development Foundation', cat: 'land', forms: 4, responses: 610, indicators: 3, desc: 'Erosion control and sustainable land management practices.' },
  { id: 'p5', name: 'Sustainable Livelihood Project', org: 'Rural Development Foundation', cat: 'live', forms: 5, responses: 890, indicators: 4, desc: 'Household income, agriculture and community participation tracking.' },
  { id: 'p6', name: 'Climate Adaptation Strategy', org: 'India Observatory', cat: 'climate', forms: 4, responses: 340, indicators: 2, desc: 'Rainfall and climate resilience data collection.' },
];

// ---- Templates ----
export const TEMPLATES = [
  { id: 't1', name: 'Water Quality Survey', cat: 'water', fields: 12, uses: 34, desc: 'Standard water quality parameters with sampling location.' },
  { id: 't2', name: 'Species Count Sheet', cat: 'bio', fields: 9, uses: 21, desc: 'Rapid biodiversity assessment with photo evidence.' },
  { id: 't3', name: 'Canopy Cover Assessment', cat: 'forest', fields: 14, uses: 18, desc: 'Forest density and regeneration measurement grid.' },
  { id: 't4', name: 'Household Income Survey', cat: 'live', fields: 20, uses: 42, desc: 'Livelihood indicators and income source breakdown.' },
  { id: 't5', name: 'Soil Erosion Log', cat: 'land', fields: 8, uses: 12, desc: 'Erosion severity and conservation measures.' },
  { id: 't6', name: 'Daily Rainfall Log', cat: 'climate', fields: 5, uses: 27, desc: 'Simple daily precipitation recording.' },
];

// ---- Submissions ----
export const SUBMISSIONS = [
  { id: 's1', form: 'Watershed Assessment Survey', program: 'Watershed Management Initiative', cat: 'water', by: 'Rajesh Kumar', at: '2026-03-18 09:24', location: 'Village Kadur, Karnataka', status: 'submitted', gps: '13.2257° N, 76.0119° E' },
  { id: 's2', form: 'Biodiversity Monitoring Form', program: 'Biodiversity Program', cat: 'bio', by: 'Priya Sharma', at: '2026-03-17 14:02', location: 'Bandipur Buffer Zone', status: 'submitted', gps: '11.6650° N, 76.6340° E' },
  { id: 's3', form: 'Forest Health Assessment', program: 'Forest Health Monitoring', cat: 'forest', by: 'Arun Krishnan', at: '2026-03-16 11:47', location: 'Nilgiris North Division', status: 'draft', gps: '11.4916° N, 76.7337° E' },
  { id: 's4', form: 'Community Livelihood Survey', program: 'Sustainable Livelihood Project', cat: 'live', by: 'Meera Patel', at: '2026-03-15 16:30', location: 'Anekal Block', status: 'submitted', gps: '12.7108° N, 77.6957° E' },
  { id: 's5', form: 'Rainfall Data Collection', program: 'Climate Adaptation Strategy', cat: 'climate', by: 'Vikram Reddy', at: '2026-03-15 08:10', location: 'Hassan District', status: 'draft', gps: '13.0068° N, 76.0996° E' },
];

// A representative filled submission (for the detail screen)
export const SUBMISSION_DETAIL_FIELDS = [
  { section: 'General Information', rows: [
    { label: 'Village/Community Name', value: 'Kadur' },
    { label: 'Water Source Type', value: 'Borewell' },
    { label: 'Water Table Depth (meters)', value: '42' },
  ] },
  { section: 'Assessment', rows: [
    { label: 'Water Quality Index', value: '78 / 100' },
    { label: 'Rainfall (last 30 days)', value: '112 mm' },
    { label: 'Community Participation', value: 'High' },
  ] },
  { section: 'Evidence', rows: [
    { label: 'Site Photo', value: '1 image attached' },
    { label: 'GPS Location', value: '13.2257° N, 76.0119° E' },
    { label: 'Field Signature', value: 'Signed' },
  ] },
];

// ---- Dashboard stats ----
export const DASH_STATS = [
  { label: 'Total Forms', value: '50', delta: '+12% from last month', icon: 'document-text', up: true },
  { label: 'Total Responses', value: '5,580', delta: '+156 this week', icon: 'people', up: true },
  { label: 'Active Programs', value: '34', delta: '+3% new this month', icon: 'checkmark-done-circle', up: true },
  { label: 'Avg Response Time', value: '4.2m', delta: '-0.3m vs last month', icon: 'time', up: false },
];

// ---- Field-user "fill form" question set (from mobile mockup, expanded) ----
export const FILL_QUESTIONS = [
  { id: 'q1', label: 'Village/Community Name', type: 'Short Text', required: true, ph: 'Enter village name' },
  { id: 'q2', label: 'Water Source Type', type: 'Dropdown', required: true, ph: 'Select primary water source', opts: ['Borewell', 'Open Well', 'River/Stream', 'Pond/Lake', 'Piped Supply'] },
  { id: 'q3', label: 'Water Table Depth (meters)', type: 'Number', required: true, ph: 'Enter depth' },
  { id: 'q4', label: 'Water Quality Observations', type: 'Multiple Choice', required: true, opts: ['Clear', 'Turbid', 'Coloured', 'Odour present'] },
  { id: 'q5', label: 'Issues Observed', type: 'Checkboxes', required: false, opts: ['Contamination', 'Seasonal shortage', 'Salinity', 'Encroachment'] },
  { id: 'q6', label: 'Site Photo', type: 'Photo Upload', required: false },
  { id: 'q7', label: 'Overall Site Rating', type: 'Rating', required: false },
  { id: 'q8', label: 'Field Location', type: 'Location', required: true },
  { id: 'q9', label: 'Additional Notes', type: 'Long Text', required: false, ph: 'Any observations...' },
  { id: 'q10', label: 'Surveyor Signature', type: 'Signature', required: true },
];

export const FIELD_USER = {
  name: 'Rajesh Kumar',
  role: 'Field User',
  district: 'Karnataka District',
  initials: 'RK',
  stats: { submitted: 3, pending: 2, responses: 35, programs: 5 },
};

export const ADMIN_USER = {
  name: 'Jay',
  role: 'FES Admin',
  initials: 'JA',
};

export const ACTIVITY = [
  { title: 'Watershed Assessment Survey', program: 'Water Conservation', status: 'pending', meta: 'Due: 2026-03-25' },
  { title: 'Biodiversity Monitoring', program: 'Forest Conservation', status: 'submitted', meta: 'Last: 2026-03-18' },
  { title: 'Agricultural Practice Assessment', program: 'Sustainable Agriculture', status: 'pending', meta: 'Due: 2026-03-22' },
];

export const TEAM = [
  { name: 'Priya Sharma', role: 'Org Admin', email: 'priya@indiaobs.org', initials: 'PS', online: true },
  { name: 'Rajesh Kumar', role: 'Field User', email: 'rajesh@indiaobs.org', initials: 'RK', online: true },
  { name: 'Arun Krishnan', role: 'Field User', email: 'arun@fri.org', initials: 'AK', online: false },
  { name: 'Lakshmi Iyer', role: 'Org Admin', email: 'lakshmi@rdf.org', initials: 'LI', online: false },
  { name: 'Meera Patel', role: 'Field User', email: 'meera@rdf.org', initials: 'MP', online: true },
];

export const INTEGRATIONS = [
  { name: 'Google Sheets', desc: 'Export responses to spreadsheets', icon: 'grid', connected: true },
  { name: 'Power BI', desc: 'Live dashboards & analytics', icon: 'bar-chart', connected: true },
  { name: 'Webhooks', desc: 'Push submissions to any endpoint', icon: 'git-network', connected: false },
  { name: 'Slack', desc: 'Notify channels on new submissions', icon: 'chatbubbles', connected: false },
  { name: 'KoboToolbox', desc: 'Sync offline field data', icon: 'sync', connected: true },
  { name: 'REST API', desc: 'Programmatic access to all data', icon: 'code-slash', connected: false },
];
