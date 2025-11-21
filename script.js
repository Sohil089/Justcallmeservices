/* ============================================================
   JUST CALL ME SERVICES — FULL SITE JS (SPA MODE)
   All divisions editable, solar system dynamic, settings panel,
   gallery, FAQ, ripple effect, localStorage saving, etc.
===============================================================*/

/* =========================
   RIPPLE EFFECT
========================= */
document.addEventListener("click", function (e) {
    const el = e.target.closest(".btn, .division-card, .brand-card");
    if (!el) return;

    const circle = document.createElement("span");
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    circle.classList.add("ripple");

    el.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
});

/* =========================
   SETTINGS MANAGEMENT
========================= */
let SETTINGS = {
    phone: "+91 90000 00000",
    whatsapp: "+91 90000 00000",
    email: "info@example.com",
    instagram: "https://instagram.com",
    logo: "",
};

loadSettings();

function openSettings() {
    document.getElementById("settingsOverlay").style.display = "flex";

    document.getElementById("setPhone").value = SETTINGS.phone;
    document.getElementById("setWhatsApp").value = SETTINGS.whatsapp;
    document.getElementById("setEmail").value = SETTINGS.email;
    document.getElementById("setInstagram").value = SETTINGS.instagram;
    document.getElementById("setLogo").value = SETTINGS.logo;
}

function closeSettings() {
    document.getElementById("settingsOverlay").style.display = "none";
}

function saveSettings() {
    SETTINGS.phone = document.getElementById("setPhone").value;
    SETTINGS.whatsapp = document.getElementById("setWhatsApp").value;
    SETTINGS.email = document.getElementById("setEmail").value;
    SETTINGS.instagram = document.getElementById("setInstagram").value;
    SETTINGS.logo = document.getElementById("setLogo").value;

    localStorage.setItem("JCS_SETTINGS", JSON.stringify(SETTINGS));

    applySettings();
    closeSettings();
}

function loadSettings() {
    const saved = localStorage.getItem("JCS_SETTINGS");
    if (saved) SETTINGS = JSON.parse(saved);

    applySettings();
}

function applySettings() {
    document.getElementById("callButton").href =
        "tel:" + SETTINGS.phone.replace(/[^0-9]/g, "");

    document.getElementById("whButton").href =
        "https://wa.me/" +
        SETTINGS.whatsapp.replace(/[^0-9]/g, "");

    document.getElementById("footerPhone").innerText =
        "Phone: " + SETTINGS.phone;

    document.getElementById("footerEmail").innerText =
        "Email: " + SETTINGS.email;

    document.getElementById("footerInsta").href = SETTINGS.instagram;
    document.getElementById("footerWA").href =
        "https://wa.me/" + SETTINGS.whatsapp.replace(/[^0-9]/g, "");

    if (SETTINGS.logo) {
        document.getElementById("siteLogo").src = SETTINGS.logo;
    }
}

/* =========================
   PAGE NAVIGATION
========================= */

const pages = document.querySelectorAll(".page");

function goHome() {
    pages.forEach((p) => (p.style.display = "none"));
    document.getElementById("home").style.display = "block";
    window.scrollTo(0, 0);
}

document.querySelectorAll(".division-card").forEach((card) => {
    card.addEventListener("click", () => {
        let target = card.getAttribute("data-target");

        pages.forEach((p) => (p.style.display = "none"));

        if (target === "solar") {
            document.getElementById("solarPage").style.display = "block";
            loadSolarBrands();
        } else {
            openDivisionPage(target);
        }
    });
});

/* =========================
   DIVISION PAGE GENERATOR
========================= */

const DIVISION_DATA = {
    govt: "Government Contracts",
    labour: "Labour Supply",
    transport: "Transport",
    realestate: "Real Estate",
    consult: "Consulting",
};

function openDivisionPage(div) {
    const container = document.getElementById("dynamicPages");

    container.innerHTML = `
        <section class="page active">
            <button class="back-btn" onclick="goHome()">← Back</button>

            <h2 class="section-title">${DIVISION_DATA[div]}</h2>

            <img src="" class="banner-img" id="banner_${div}">

            <h3>Description</h3>
            <p contenteditable="true" class="editable-text">This is a placeholder description. You can edit it later.</p>

            <h3>What We Do</h3>
            <div class="feature-boxes">
                <div class="feature-box"><h3>Feature 1</h3><p contenteditable="true">Lorem ipsum text</p></div>
                <div class="feature-box"><h3>Feature 2</h3><p contenteditable="true">Lorem ipsum text</p></div>
                <div class="feature-box"><h3>Feature 3</h3><p contenteditable="true">Lorem ipsum text</p></div>
            </div>

            <h3>Services</h3>
            <ul id="services_${div}">
                <li contenteditable="true">Placeholder service 1</li>
                <li contenteditable="true">Placeholder service 2</li>
                <li contenteditable="true">Placeholder service 3</li>
            </ul>

            <h3>Gallery</h3>
            <input type="file" multiple id="galleryInput_${div}">
            <div id="gallery_${div}" class="gallery"></div>

            <h3>FAQ</h3>
            <div id="faq_${div}">
                <div class="faq-item"><h4 contenteditable="true">Question 1</h4><p contenteditable="true">Answer</p></div>
                <div class="faq-item"><h4 contenteditable="true">Question 2</h4><p contenteditable="true">Answer</p></div>
            </div>

            <br>

            <a href="${document.getElementById("callButton").href}" class="btn call-btn">Call</a>
            <a href="${document.getElementById("whButton").href}" class="btn whatsapp-btn">WhatsApp</a>
            <a href="${SETTINGS.instagram}" class="btn">Instagram</a>

        </section>
    `;

    container.style.display = "block";

    document.getElementById(galleryInput_${div}).addEventListener("change", (e) => {
        const gallery = document.getElementById(gallery_${div});
        gallery.innerHTML = "";

        [...e.target.files].forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement("img");
                img.src = reader.result;
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });

    window.scrollTo(0, 0);
}

/* =========================
   SOLAR BRANDS
========================= */

const SOLAR_BRANDS = [
    { name: "ADANI", price: "₹170,000", kw: "3.3kW" },
    { name: "TATA", price: "₹181,000", kw: "3.39kW" },
    { name: "WAAREE", price: "₹166,704", kw: "3.24kW" },
    { name: "APS", price: "₹160,000", kw: "3.20kW" },
];

function loadSolarBrands() {
    const grid = document.getElementById("solarBrandGrid");
    grid.innerHTML = "";

    SOLAR_BRANDS.forEach((brand) => {
        const card = document.createElement("div");
        card.className = "brand-card";

        card.innerHTML = `
            <h3>${brand.name}</h3>
            <p>${brand.kw}</p>
            <p>${brand.price}</p>
        `;

        card.addEventListener("click", () => {
            loadBrandDetail(brand);
        });

        grid.appendChild(card);
    });
}

function loadBrandDetail(brand) {
    const box = document.getElementById("solarBrandDetail");

    box.innerHTML = `
        <h2>${brand.name} Details</h2>

        <p>KW: ${brand.kw}</p>
        <p>Price: ${brand.price}</p>

        <button class="btn whatsapp-btn" onclick="sendSolarWA('${brand.name}', '${brand.price}')">WhatsApp</button>
        <button class="btn call-btn" onclick="location.href='tel:${SETTINGS.phone}'">Call</button>
    `;
}

/* WhatsApp for solar */
function sendSolarWA(name, price) {
    const msg = encodeURIComponent(Hello! I want enquiry for ${name} - ${price});
    window.open(
        https://wa.me/${SETTINGS.whatsapp.replace(/[^0-9]/g, "")}?text=${msg},
        "_blank"
    );
}

/* Init Home */
goHome();
