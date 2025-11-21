// script.js - Admin editable + modal behavior
document.addEventListener('DOMContentLoaded', () => {
  // selectors
  const divisionModal = document.getElementById('divisionModal');
  const enquiryModal = document.getElementById('enquiryForm');
  const closeButtons = document.querySelectorAll('.modal-box .close');
  const viewButtons = document.querySelectorAll('.view-more');
  const enquireButtons = document.querySelectorAll('.select-enquire');
  const divisionTitle = document.getElementById('divisionTitle');
  const divisionContent = document.getElementById('divisionContent');
  const divisionGallery = document.getElementById('divisionGallery');
  const enquiryDivision = document.getElementById('enquiryDivision');
  const enquiryForm = document.getElementById('enquiryFormForm');
  const adminBtn = document.getElementById('adminBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const logoFile = document.getElementById('logoFile');
  const siteLogo = document.getElementById('siteLogo');

  // Admin password (simple client-side). Change this to your chosen password.
  const ADMIN_PASSWORD = 'admin123'; // change this

  let isAdmin = false;

  // Utility open/close
  function openOverlay(el) { if(!el) return; el.style.display = 'flex'; el.setAttribute('aria-hidden','false'); }
  function closeOverlay(el) { if(!el) return; el.style.display = 'none'; el.setAttribute('aria-hidden','true'); }

  // Close buttons
  closeButtons.forEach(b => b.addEventListener('click', ()=> {
    const parent = b.closest('.overlay'); closeOverlay(parent);
  }));

  // Click outside to close
  document.querySelectorAll('.overlay').forEach(ov => {
    ov.addEventListener('click', (e) => { if(e.target === ov) closeOverlay(ov); });
  });

  // Show division modal (use real content if available)
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.division || 'Division';
      divisionTitle.textContent = name;
      // load content - in admin mode allow editing
      // try to find existing saved content in DOM or fallback
      const card = document.querySelector(`.card[data-division="${name}"]`);
      const desc = card ? (card.querySelector('.desc')?.textContent || '') : '';
      divisionContent.innerHTML = `<p class="big">${desc}</p>`;
      // load placeholder gallery
      divisionGallery.innerHTML = '';
      openOverlay(divisionModal);
    });
  });

  // Enquiry buttons - only open modal on click
  enquireButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.division || 'Enquiry';
      if (enquiryDivision) enquiryDivision.value = name;
      openOverlay(enquiryModal);
    });
  });

  // On form submit - open mail client (mailto) with details so you get enquiry by email
  // You can replace this with an API call in future
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const email = formData.get('email') || '';
      const message = formData.get('message') || '';
      const division = formData.get('division') || '';

      const subject = encodeURIComponent(`Enquiry: ${division} - ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nDivision: ${division}\n\nMessage:\n${message}`);
      // change the email address to your real contact
      const mailTo = `mailto:info@example.com?subject=${subject}&body=${body}`;
      window.location.href = mailTo;
      closeOverlay(enquiryModal);
    });
  }

  // ADMIN: login toggle
  adminBtn.addEventListener('click', async () => {
    if (!isAdmin) {
      const pass = prompt('Enter admin password:');
      if (pass === ADMIN_PASSWORD) {
        isAdmin = true;
        adminBtn.textContent = 'Admin: ON';
        adminBtn.style.background = 'rgba(19,209,255,0.06)';
        enableAdminMode();
      } else {
        alert('Wrong password');
      }
    } else {
      // logout
      isAdmin = false;
      adminBtn.textContent = 'Admin Login';
      adminBtn.style.background = '';
      disableAdminMode();
    }
  });

  function enableAdminMode(){
    // show download and logo upload
    downloadBtn.style.display = 'inline-block';
    logoFile.style.display = 'inline-block';
    // allow contenteditable on headings / descriptions
    document.querySelectorAll('.card h3, .card .desc, #siteTitle, #siteTag, #contactInfo').forEach(el => {
      el.contentEditable = 'true';
      el.style.outline = '1px dashed rgba(19,209,255,0.12)';
    });
    // logo upload handler
    logoFile.addEventListener('change', handleLogoFile);
    logoFile.style.display = 'inline-block';
  }

  function disableAdminMode(){
    downloadBtn.style.display = 'none';
    logoFile.style.display = 'none';
    document.querySelectorAll('.card h3, .card .desc, #siteTitle, #siteTag, #contactInfo').forEach(el => {
      el.contentEditable = 'false';
      el.style.outline = 'none';
    });
  }

  function handleLogoFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      siteLogo.src = evt.target.result;
    };
    reader.readAsDataURL(f);
  }

  // Download current page HTML (so admin can save changes and re-upload to GitHub)
  downloadBtn.addEventListener('click', () => {
    // Build HTML string: take document.documentElement.outerHTML but we must inline current logo src, edits etc.
    const docClone = document.documentElement.cloneNode(true);

    // If logo has data URL, set it in clone
    const cloneLogo = docClone.querySelector('#siteLogo');
    if (cloneLogo && siteLogo.src) cloneLogo.setAttribute('src', siteLogo.src);

    // Remove script tag (so downloaded file remains static)
    const scripts = docClone.querySelectorAll('script[src="script.js"]');
    scripts.forEach(s => s.remove());

    // Serialize and create blob
    const html = '<!doctype html>\n' + docClone.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // OPTIONAL: close overlay with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay(divisionModal); closeOverlay(enquiryModal);
    }
  });

});
