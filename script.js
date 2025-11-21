
// safe DOM helpers
function $(id){ return document.getElementById(id); }

// Open division view by id
function openDivision(name){
  // hide all division pages
  var pages = document.querySelectorAll('.division-page');
  pages.forEach(p => p.classList.add('hidden'));

  if(name === 'solar'){
    var el = $('solar');
    if(el) el.classList.remove('hidden');
  } else {
    // if other pages not built yet, show alert
    alert('This division page not created yet: ' + name);
  }

  // scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// go back to main (hide all)
function goHome(){
  var pages = document.querySelectorAll('.division-page');
  pages.forEach(p => p.classList.add('hidden'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// open enquiry modal and prefill message
function openEnquiry(prefill){
  var modal = $('modalEnquiry');
  if(!modal){
    alert('Enquiry modal not found in HTML. Please ensure #modalEnquiry exists.');
    return;
  }
  modal.classList.remove('hidden');

  // prefill message
  var m = $('enqMsg');
  if(m) m.value = prefill || '';
}

// close modal
function closeEnquiry(){
  var modal = $('modalEnquiry');
  if(modal) modal.classList.add('hidden');
}

// send enquiry (client side only — currently logs and shows success)
function sendEnquiry(){
  var name = $('enqName') ? $('enqName').value.trim() : '';
  var phone = $('enqPhone') ? $('enqPhone').value.trim() : '';
  var email = $('enqEmail') ? $('enqEmail').value.trim() : '';
  var msg = $('enqMsg') ? $('enqMsg').value.trim() : '';

  if(!name || !phone){
    alert('Name and Phone are required.');
    return;
  }

  // format for developer — you can replace this with actual email API later
  var payload = {
    name: name,
    phone: phone,
    email: email,
    message: msg
  };

  console.log('Enquiry payload:', payload);

  // temporary success UI
  alert('Enquiry sent (local demo). Check console for payload.');
  closeEnquiry();
}
