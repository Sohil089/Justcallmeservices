/* script.js
   Part 3 for Just Call Me Services
   - Attach to index.html with <script src="script.js"></script>
   - Uses only plain JS
*/

/* ---------- SAMPLE DATA ---------- */
/* Edit this object later to add companies, properties, photos etc. */
const DATA = {
  divisions: [
    { id: 'solar', title: 'Solar Projects' },
    { id: 'gov', title: 'Government Contracts' },
    { id: 'labour', title: 'Labour Supply' },
    { id: 'consult', title: 'Consulting' },
    { id: 'transport', title: 'Transport' },
    { id: 'real', title: 'Real Estate' }
  ],

  // Example solar brands (edit later)
  solarBrands: [
    {
      id: 'brandA',
      name: 'SunPrime',
      panels: [
        { kw: '3.6 kW', price: '₹75,000' },
        { kw: '5.0 kW', price: '₹1,00,000' }
      ],
      photos: [
        'https://via.placeholder.com/400x250?text=SunPrime+1',
        'https://via.placeholder.com/400x250?text=SunPrime+2'
      ],
      desc: 'High-efficiency modules suitable for residential roofs.'
    },
    {
      id: 'brandB',
      name: 'EcoVolt',
      panels: [
        { kw: '2.0 kW', price: '₹45,000' },
        { kw: '4.0 kW', price: '₹85,000' }
      ],
      photos: [
        'https://via.placeholder.com/400x250?text=EcoVolt+1',
        'https://via.placeholder.com/400x250?text=EcoVolt+2'
      ],
      desc: 'Cost-effective panels with good warranty.'
    }
  ],

  // Example real estate listings (edit later)
  realEstates: [
    {
      id: 'prop1',
      name: 'Sunrise Villa',
      price: '₹45,00,000',
      area: '1200 sqft',
      photos: ['https://via.placeholder.com/400x250?text=Villa+1']
    },
    {
      id: 'prop2',
      name: 'City Apartment',
      price: '₹75,00,000',
      area: '850 sqft',
      photos: ['https://via.placeholder.com/400x250?text=Apartment+1']
    }
  ]
};

/* ---------- HELPERS ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function qsParams() { // parse query string into object
  const params = {};
  const search = location.search.replace(/^\?/, '');
  if (!search) return params;
  search.split('&').forEach(pair => {
    const [k, v] = pair.split('=').map(decodeURIComponent);
    params[k] = v;
  });
  return params;
}

/* ---------- SETUP UI ELEMENTS ---------- */
function ensureElements() {
  // required elements (they should exist in index.html)
  const required = [
    '#divisionsContainer', // grid of division cards
    '#divisionTitle',
    '#divisionPage',
    '#divisionContent',
    '#modalEnquiry',
    '#enquiryForm'
  ];
  for (const s of required) {
    if (!$(s)) {
      console.warn('Missing element:', s);
    }
  }
}

/* ---------- RENDER DIVISIONS GRID ---------- */
function renderDivisions() {
  const grid = $('#divisionsContainer');
  if (!grid) return;
  grid.innerHTML = ''; // clear

  DATA.divisions.forEach(div => {
    const card = document.createElement('div');
    card.className = 'division-card';
    card.dataset.id = div.id;
    card.innerText = div.title;

    // ripple / liquid click effect
    card.addEventListener('click', ev => {
      createClickEffect(ev, card);
      openDivision(div.id);
    });

    grid.appendChild(card);
  });
}

/* ---------- CLICK EFFECT (LIQUID / RING) ---------- */
function createClickEffect(ev, el) {
  const circle = document.createElement('span');
  circle.style.position = 'absolute';
  circle.style.width = '0px';
  circle.style.height = '0px';
  circle.style.left = `${ev.offsetX}px`;
  circle.style.top = `${ev.offsetY}px`;
  circle.style.borderRadius = '50%';
  circle.style.background = 'rgba(0,255,255,0.12)';
  circle.style.transform = 'translate(-50%,-50%)';
  circle.style.pointerEvents = 'none';
  circle.style.transition = 'width 400ms ease, height 400ms ease, opacity 400ms';
  el.style.position = 'relative';
  el.appendChild(circle);
  // expand
  requestAnimationFrame(() => {
    circle.style.width = '300px';
    circle.style.height = '300px';
    circle.style.opacity = '0';
  });
  setTimeout(() => circle.remove(), 450);
}

/* ---------- OPEN DIVISION PAGE ---------- */
function openDivision(id) {
  const titleEl = $('#divisionTitle');
  const page = $('#divisionPage');
  const content = $('#divisionContent');
  if (!page || !content || !titleEl) return;

  // show page
  page.style.display = 'block';
  // set title
  const divInfo = DATA.divisions.find(d => d.id === id) || { title: id };
  titleEl.innerText = divInfo.title;

  // clear content
  content.innerHTML = '';

  if (id === 'solar') {
    renderSolar(content);
  } else if (id === 'real') {
    renderRealEstate(content);
  } else {
    // generic placeholder
    const g = document.createElement('div');
    g.className = 'glass';
    g.innerHTML = `<h3>${divInfo.title}</h3>
      <p class="desc">Add details for this division in the DATA object (script.js).</p>`;
    content.appendChild(g);
  }

  // scroll to top of division page
  page.scrollIntoView({ behavior: 'smooth' });
}

/* ---------- RENDER SOLAR COMPANIES ---------- */
function renderSolar(container) {
  const heading = document.createElement('h3');
  heading.innerText = 'Solar Brands';
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'division-grid';
  container.appendChild(grid);

  DATA.solarBrands.forEach(brand => {
    const box = document.createElement('div');
    box.className = 'division-card glass';
    box.style.position = 'relative';
    box.dataset.brandId = brand.id;

    // content
    const name = document.createElement('div');
    name.innerHTML = `<strong>${brand.name}</strong>`;
    const desc = document.createElement('div');
    desc.style.fontSize = '13px';
    desc.style.marginTop = '8px';
    desc.innerText = brand.desc;
    box.appendChild(name);
    box.appendChild(desc);

    // small photos preview
    if (brand.photos && brand.photos.length) {
      const img = document.createElement('img');
      img.src = brand.photos[0];
      img.style.width = '100%';
      img.style.marginTop = '8px';
      img.style.borderRadius = '10px';
      box.appendChild(img);
    }

    // on click -> open brand detail panel
    box.addEventListener('click', (ev) => {
      createClickEffect(ev, box);
      openBrandPanel(brand);
    });

    grid.appendChild(box);
  });
}

/* ---------- BRAND PANEL (DETAIL) ---------- */
function openBrandPanel(brand) {
  // create or replace panel in divisionContent
  const container = $('#divisionContent');
  if (!container) return;

  // remove any existing detail panel
  const existing = container.querySelector('.brand-panel');
  if (existing) existing.remove();

  const panel = document.createElement('div');
  panel.className = 'brand-panel glass';
  panel.style.marginTop = '20px';
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h3 style="margin:0">${brand.name}</h3>
      <button id="closeBrand" style="background:none;border:1px solid rgba(0,255,255,0.12);color:cyan;padding:6px 10px;border-radius:8px;cursor:pointer">Close</button>
    </div>
    <p style="margin-top:8px">${brand.desc}</p>
    <div id="brandPanels" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px"></div>
    <div id="brandPhotos" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"></div>
  `;

  container.appendChild(panel);
  $('#closeBrand').addEventListener('click', () => panel.remove());

  const panelArea = panel.querySelector('#brandPanels');
  brand.panels.forEach(p => {
    const item = document.createElement('div');
    item.className = 'division-card';
    item.style.minWidth = '160px';
    item.innerHTML = `<strong>${p.kw}</strong><div style="font-size:13px;margin-top:6px">${p.price}</div>
      <button class="selectPrice" style="margin-top:8px;padding:8px;border-radius:8px;border:none;background:cyan;color:#000;cursor:pointer">Select & Enquire</button>`;

    // on click select -> show Enquiry modal and pass details
    item.querySelector('.selectPrice').addEventListener('click', () => {
      openEnquiryModal({
        subject: `${brand.name} - ${p.kw}`,
        message: `Hi, I am interested in ${brand.name} ${p.kw}. Price: ${p.price}`
      });
    });

    panelArea.appendChild(item);
  });

  const photosArea = panel.querySelector('#brandPhotos');
  (brand.photos || []).forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '180px';
    img.style.borderRadius = '10px';
    photosArea.appendChild(img);
  });
}

/* ---------- RENDER REAL ESTATE ---------- */
function renderRealEstate(container) {
  const heading = document.createElement('h3');
  heading.innerText = 'Properties for Sale';
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'division-grid';
  container.appendChild(grid);

  DATA.realEstates.forEach(prop => {
    const card = document.createElement('div');
    card.className = 'division-card glass';
    card.innerHTML = `<strong>${prop.name}</strong><div style="font-size:13px;margin-top:6px">${prop.area} • ${prop.price}</div>
      <button class="viewProp" style="margin-top:8px;padding:8px;border-radius:8px;border:none;background:cyan;color:#000;cursor:pointer">Enquire</button>`;

    card.querySelector('.viewProp').addEventListener('click', () => {
      openEnquiryModal({
        subject: `${prop.name} Enquiry`,
        message: `I want details/visit for ${prop.name} (${prop.area}) priced at ${prop.price}.`
      });
    });

    grid.appendChild(card);
  });
}

/* ---------- ENQUIRY MODAL ---------- */
function openEnquiryModal(prefill = {}) {
  const modal = $('#modalEnquiry');
  const form = $('#enquiryForm');

  if (!modal || !form) {
    alert('Enquiry form not found. Please ensure #modalEnquiry and #enquiryForm exist in HTML.');
    return;
  }

  // prefill fields
  if (prefill.subject) {
    form.querySelector('input[name="subject"]')?.focus?.();
  }
  form.querySelector('input[name="name"]').value = '';
  form.querySelector('input[name="phone"]').value = '';
  form.querySelector('input[name="email"]').value = '';
  form.querySelector('textarea[name="message"]').value = prefill.message || '';

  modal.style.display = 'flex';

  // close buttons
  modal.querySelectorAll('.modalClose').forEach(btn => {
    btn.onclick = () => (modal.style.display = 'none');
  });
}

/* ---------- SUBMIT ENQUIRY (mailto + whatsapp) ---------- */
function setupEnquiryForm() {
  const form = $('#enquiryForm');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    const subject = encodeURIComponent(`Enquiry from ${name || 'Website'}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Open mail client
    const mailto = `mailto:info@example.com?subject=${subject}&body=${body}`;
    // Also prepare WhatsApp prefill
    const waText = encodeURIComponent(`Enquiry\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`);
    const waLink = `https://wa.me/?text=${waText}`;

    // Try open both: whatsapp and mail, user can close whichever not needed
    window.open(waLink, '_blank');
    window.location.href = mailto;

    // Hide modal
    $('#modalEnquiry').style.display = 'none';
  });
}

/* ---------- PRE-FILL FORM FROM QUERY STRING (when page opened with params) ---------- */
function prefillFromQuery() {
  const params = qsParams();
  if (!Object.keys(params).length) return;
  // open modal with values if any
  if (params.name || params.phone || params.email || params.message) {
    const modal = $('#modalEnquiry');
    const form = $('#enquiryForm');
    if (form && modal) {
      form.querySelector('input[name="name"]').value = params.name || '';
      form.querySelector('input[name="phone"]').value = params.phone || '';
      form.querySelector('input[name="email"]').value = params.email || '';
      form.querySelector('textarea[name="message"]').value = params.message || '';
      modal.style.display = 'flex';
    }
  }
}

/* ---------- CLOSE MODAL BY CLICKING OUTSIDE ---------- */
function modalOutsideClickClose() {
  const modal = $('#modalEnquiry');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

/* ---------- INIT / BIND ---------- */
function init() {
  ensureElements();
  renderDivisions();
  setupEnquiryForm();
  modalOutsideClickClose();
  prefillFromQuery();

  // close division page button (if exists in html)
  const closeBtn = $('#closeDivisionPage');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    const page = $('#divisionPage');
    if (page) page.style.display = 'none';
  });
}

/* Wait for DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
