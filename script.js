// ====== CONFIG: edit this data to add/update content easily ======
const DIVISIONS = [
  { id: "solar", title: "Solar Projects", description: "Rooftop & groundmount solar solutions" },
  { id: "govt", title: "Government Contracts", description: "Tendering & contract execution" },
  { id: "labour", title: "Labour Supply", description: "Skilled & unskilled manpower" },
  { id: "consult", title: "Consulting", description: "Project consulting & feasibility" },
  { id: "transport", title: "Transport", description: "Logistics & transportation" },
  { id: "real", title: "Real Estate", description: "Sales & property management" }
];

// Example solar companies list (editable)
const SOLAR_BRANDS = [
  { id:'tata', brand:'TATA', kw:3.39, price:181000, img:'assets/images/tata.png'},
  { id:'waree', brand:'WAREE', kw:3.24, price:166704, img:'assets/images/waree.png'},
  { id:'adani', brand:'ADANI', kw:3.30, price:170000, img:'assets/images/adani.png'}
];

// Example real estate properties (editable)
const PROPERTIES = [
  { id:'p1', title:'2BHK Ahmedabad', price:3500000, img:'assets/images/prop1.jpg', desc:'2BHK near highway, 1000 sqft' },
  { id:'p2', title:'Shop at Main Road', price:12000000, img:'assets/images/prop2.jpg', desc:'Commercial shop, heavy footfall' }
];

// ====== App logic ======
const divisionsGrid = document.getElementById('divisionsGrid');
const panel = document.getElementById('divisionPanel');
const panelTitle = document.getElementById('panelTitle');
const panelContent = document.getElementById('panelContent');
const backBtn = document.getElementById('backBtn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const enquiryModal = document.getElementById('enquiryModal');
const closeEnquiry = document.getElementById('closeEnquiry');
const enquiryForm = document.getElementById('enquiryForm');
const whatsappBtn = document.getElementById('whatsappBtn');

function init(){
  renderDivisions();
  backBtn.addEventListener('click', ()=>{ panel.classList.add('hidden'); document.querySelector('.home').scrollIntoView(); });
  closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
  closeEnquiry.addEventListener('click', ()=> enquiryModal.classList.add('hidden'));
  enquiryForm.addEventListener('submit', submitEnquiry);
  whatsappBtn.href = https://wa.me/919000000000?text=${encodeURIComponent('Hello, I want to enquire about your services')};
}
function renderDivisions(){
  divisionsGrid.innerHTML = '';
  DIVISIONS.forEach(d=>{
    const card = document.createElement('div'); card.className='card'; card.dataset.id = d.id;
    card.innerHTML = <h3>${d.title}</h3><div class="small-desc">${d.description}</div>;
    card.addEventListener('click', ()=>openDivision(d.id));
    divisionsGrid.appendChild(card);
  });
}

function openDivision(id){
  panel.classList.remove('hidden');
  const title = DIVISIONS.find(x=>x.id===id).title;
  panelTitle.textContent = title;
  panelContent.innerHTML = ''; // clear

  if(id === 'solar'){
    showSolarPanel();
  } else if(id === 'real'){
    showRealPanel();
  } else {
    // generic panel
    panelContent.innerHTML = <div class="panel-box"><p>Details for ${title}. You can edit content in script.js -> DIVISIONS or add custom HTML here.</p></div>;
  }
}

function showSolarPanel(){
  const list = document.createElement('div'); list.className='list';
  SOLAR_BRANDS.forEach(b=>{
    const el = document.createElement('div'); el.className='company';
    el.innerHTML = `<img class="thumb" src="${b.img}" onerror="this.style.display='none'"/>
      <div class="meta"><h4>${b.brand} — ${b.kw} kW</h4><p>Price: ₹ ${b.price.toLocaleString()}</p></div>
      <div><button class="btn" onclick="openCompany('${b.id}')">Details</button></div>`;
    list.appendChild(el);
  });
  panelContent.appendChild(list);
  // admin edit quick button
  const add = document.createElement('div'); add.style.marginTop='16px';
  add.innerHTML = <button class="btn" onclick="openAddSolar()">+ Add Brand</button>;
  panelContent.appendChild(add);
}

function showRealPanel(){
  const list = document.createElement('div'); list.className='list';
  PROPERTIES.forEach(p=>{
    const el = document.createElement('div'); el.className='company';
    el.innerHTML = `<img class="thumb" src="${p.img}" onerror="this.style.display='none'"/>
      <div class="meta"><h4>${p.title}</h4><p>${p.desc}</p><p>Price: ₹ ${p.price.toLocaleString()}</p></div>
      <div><button class="btn" onclick="openProperty('${p.id}')">View</button></div>`;
    list.appendChild(el);
  });
  panelContent.appendChild(list);
  const add = document.createElement('div'); add.style.marginTop='16px';
  add.innerHTML = <button class="btn" onclick="openAddProperty()">+ Add Property</button>;
  panelContent.appendChild(add);
}

// Modal openers
function openCompany(id){
  const b = SOLAR_BRANDS.find(x=>x.id===id);
  modalBody.innerHTML = `<img src="${b.img}" onerror="this.style.display='none'"/><h3>${b.brand}</h3>
    <p>Capacity: ${b.kw} kW</p><p>Price: ₹ ${b.price.toLocaleString()}</p>
    <div style="margin-top:10px">
      <button class="btn" onclick="openEnquiry('${b.brand}', ${b.price})">Get Enquiry</button>
      <a class="btn" href="https://wa.me/919000000000?text=${encodeURIComponent('Enquiry about '+b.brand)}" target="_blank">WhatsApp</a>
    </div>`;
  modal.classList.remove('hidden');
}
function openProperty(id){
  const p = PROPERTIES.find(x=>x.id===id);
  modalBody.innerHTML = `<img src="${p.img}" onerror="this.style.display='none'"/><h3>${p.title}</h3>
    <p>${p.desc}</p><p>Price: ₹ ${p.price.toLocaleString()}</p>
    <div style="margin-top:10px">
      <button class="btn" onclick="openEnquiry('${p.title}', ${p.price})">Get Enquiry</button>
      <a class="btn" href="https://wa.me/919000000000?text=${encodeURIComponent('Enquiry about property: '+p.title)}" target="_blank">WhatsApp</a>
    </div>`;
  modal.classList.remove('hidden');
}

function openEnquiry(subject, price){
  enquiryModal.classList.remove('hidden');
  enquiryForm.dataset.subject = subject;
  enquiryForm.dataset.price = price;
  modal.classList.add('hidden');
}

function submitEnquiry(e){
  e.preventDefault();
  const form = new FormData(enquiryForm);
  const name = form.get('name'); const phone = form.get('phone'); const email = form.get('email'); const msg = form.get('message') || '';
  const subject = enquiryForm.dataset.subject || 'General Enquiry';
  // create message and send via mailto fallback
  const body = Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${msg};
  const mailto = mailto:info@example.com?subject=${encodeURIComponent('Enquiry: '+subject)}&body=${encodeURIComponent(body)};
  window.location.href = mailto;
}

// admin helpers (quick add dialogs - simple prompt)
function openAddSolar(){
  const brand = prompt('Brand name'); if(!brand) return;
  const kw = parseFloat(prompt('kW value (e.g. 3.3)') || '0');
  const price = parseInt(prompt('Price (number)') || '0',10);
  const id = brand.toLowerCase().replace(/\s+/g,'_');
  SOLAR_BRANDS.push({id,brand,kw,price,img:''});
  showSolarPanel();
}
function openAddProperty(){
  const title = prompt('Property title'); if(!title) return;
  const desc = prompt('Short description')||'';
  const price = parseInt(prompt('Price')||'0',10);
  const id = 'p'+(PROPERTIES.length+1);
  PROPERTIES.push({id,title,desc,price,img:''});
  showRealPanel();
}

// init on load
window.onload = init;

// expose to global for inline onclick in generated HTML
window.openCompany = openCompany;
window.openProperty = openProperty;
window.openEnquiry = openEnquiry;
window.openAddSolar = openAddSolar;
window.openAddProperty = openAddProperty;
// ------------------ FIXED ENQUIRY FORM CODE --------------------

document.addEventListener("DOMContentLoaded", function () {
    
    const enquiryModal = document.getElementById("enquiryModal");
    const closeEnquiry = document.getElementById("closeEnquiry");
    const enquiryForm = document.getElementById("enquiryForm");

    // Open Enquiry Modal (Global Function)
    window.openEnquiryForm = function (serviceName) {
        document.getElementById("enquiryTitle").innerText = Get Enquiry - ${serviceName};
        enquiryModal.style.display = "flex";
    };

    // Close Modal
    closeEnquiry.addEventListener("click", () => {
        enquiryModal.style.display = "none";
    });

    // Background Click to Close
    enquiryModal.addEventListener("click", (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.style.display = "none";
        }
    });

    // Submit Form
    enquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("enqName").value;
        let phone = document.getElementById("enqPhone").value;
        let email = document.getElementById("enqEmail").value;
        let message = document.getElementById("enqMessage").value;

        if (!name || !phone || !email || !message) {
            alert("Please fill all fields.");
            return;
        }

        // WhatsApp Message Format
        let whatsappText = `New Enquiry:
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;

        let whatsappURL = https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(whatsappText)};

        window.open(whatsappURL, "_blank");

        // Close Form After Submit
        enquiryModal.style.display = "none";

        enquiryForm.reset();
    });

});
