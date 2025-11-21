// script.js

// Show Enquiry
function openEnquiry() {
  document.getElementById('enquiryModal').classList.remove('hidden');
}

function closeEnquiry() {
  document.getElementById('enquiryModal').classList.add('hidden');
}

// Attach to buttons dynamically (example for Solar product)
document.querySelectorAll('.select-enquire').forEach(btn => {
  btn.addEventListener('click', openEnquiry);
});
// Admin Panel CRUD (demo structure)
let solarProducts = [];
let realEstates = [];
// Example: Add/Edit/Delete logic can use in-memory objects, connect to backend APIs for real use.
function addSolarProduct(product) {
  solarProducts.push(product);
  renderSolarProducts();
}

function editSolarProduct(idx, product) {
  solarProducts[idx] = product;
  renderSolarProducts();
}

function deleteSolarProduct(idx) {
  solarProducts.splice(idx,1);
  renderSolarProducts();
}

function renderSolarProducts() {
  // Rerender product list in admin panel—update DOM accordingly.
}

// Similar logic for realEstates...

// Image Upload Demo
function uploadImage(input, type, idx) {
  const file = input.files[0];
  // Use FileReader to preview or send file to server (backend required for actual storing)
}
