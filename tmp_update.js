const fs = require('fs');

try {
    let html = fs.readFileSync('c:/Users/Administrator/Desktop/WESTWIDE/services.html', 'utf8');

    // 1. Add Currency Converter to Navbar
    if(!html.includes('currency-converter')) {
        html = html.replace(
            /<div class="nav-actions">[\s\S]*?<a href="contact.html" class="btn btn-primary"[\s\S]*?<\/a>\s*<\/div>/,
            `<div class="nav-actions" style="display: flex; align-items: center; gap: 0;">
                <div class="currency-converter" style="display: flex; align-items: center; gap: 5px; font-size: 0.9rem; font-weight: 600; color: #003399; margin-right: 15px;">
                    <select id="currency-select" style="border: none; background: transparent; font-weight: bold; color: #003399; cursor: pointer; outline: none;">
                        <option value="USD">USD</option>
                        <option value="AED">AED</option>
                        <option value="SAR">SAR</option>
                    </select>
                    <span id="currency-result" style="color: #E69138;">... PKR</span>
                </div>
                <a href="contact.html" class="btn btn-primary"
                    style="background-color: #003399; border: none; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">Book
                    Now</a>
            </div>`
        );
    }

    // 2. Add Smart Search Bar above the grid
    if(!html.includes('visaSearchInput')) {
        html = html.replace(
            '<div class="country-grid">',
            `<div class="visa-search-container" style="max-width: 600px; margin: 0 auto 30px auto; display: flex; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-radius: 50px; overflow: hidden; background: #fff;">
                    <input type="text" id="visaSearchInput" placeholder="Search for a country (e.g., USA, Dubai)..." style="flex: 1; padding: 15px 25px; border: none; outline: none; font-size: 1rem; color: #333;">
                    <button style="padding: 15px 25px; background: #003399; color: white; border: none; font-size: 1.1rem; cursor: pointer; transition: background 0.3s;"><i class="fa-solid fa-search"></i></button>
                </div>
                <div class="country-grid" id="visaCountryGrid">`
        );
    }

    // 3. Add Glassmorphism and Requirements Button to Cards
    // First, change <div class="country-card animate-on-scroll"> to <div class="country-card glass-card animate-on-scroll">
    html = html.replace(/<div class="country-card animate-on-scroll"/g, '<div class="country-card glass-card animate-on-scroll"');
    // Change <h3> to <h3 class="country-name">
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="country-name">$1</h3>');
    // Swap the single Apply Now button for dual buttons
    html = html.replace(
        /<a href="contact\.html" class="btn btn-outline" style="width: 100%; margin-top: 1rem;">Apply\s*Now<\/a>/g,
        `<div style="display: flex; gap: 10px; margin-top: 1rem;">
                            <button class="btn btn-primary view-req-btn" style="flex: 1; padding: 0.5rem; font-size: 0.9rem; border: none;">Requirements</button>
                            <a href="contact.html" class="btn btn-outline" style="flex: 1; padding: 0.5rem; font-size: 0.9rem; text-align: center; display: flex; align-items: center; justify-content: center;">Apply</a>
                        </div>`
    );

    // 4. Add Global Widgets and Visa Requirements Modal before </body>
    if(!html.includes('leadPopupForm')) {
        html = html.replace(
            '    <script src="js/app.js"></script>\n</body>',
            `    <script src="js/app.js"></script>

    <!-- Floating WhatsApp Widget -->
    <a href="https://wa.me/923053033023?text=Hi%20West%20Wide%20Travel,%20I%20need%20information%20regarding%20a%20Tourist%20Visa." target="_blank" class="whatsapp-float">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- Lead Generation Pop-up -->
    <div class="lead-popup-overlay" id="leadPopup">
        <div class="lead-popup-box">
            <button class="lead-popup-close" id="closeLeadPopup"><i class="fa-solid fa-xmark"></i></button>
            <div class="lead-popup-content">
                <i class="fa-solid fa-passport" style="font-size: 3rem; color: #E69138; margin-bottom: 15px;"></i>
                <h3 style="color: #003399; margin-bottom: 10px;">Looking for a Tourist Visa?</h3>
                <p style="margin-bottom: 20px; color: #555;">Get a free consultation and personalized quote from our travel experts today.</p>
                <form id="leadPopupForm" style="display: flex; flex-direction: column; gap: 10px;">
                    <input type="text" placeholder="Your Name" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <input type="tel" placeholder="Phone / WhatsApp" required style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <button type="submit" class="btn btn-primary" style="background-color: #003399; padding: 10px; border: none;">Get a Free Quote</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Visa Requirements Modal -->
    <div class="lead-popup-overlay" id="visaReqPopup">
        <div class="lead-popup-box" style="text-align: left; max-width: 500px;">
            <button class="lead-popup-close" id="closeVisaReqPopup"><i class="fa-solid fa-xmark"></i></button>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px;">
                <i class="fa-solid fa-list-check" style="font-size: 2rem; color: #003399;"></i>
                <h3 style="color: #003399; margin: 0; font-family: 'Outfit', sans-serif;" id="reqCountryName">Visa Requirements</h3>
            </div>
            <ul id="reqList" style="list-style: none; padding: 0; margin-bottom: 25px; color: #444; font-family: 'Inter', sans-serif;">
                <!-- Requirements injected via JS -->
            </ul>
            <a href="contact.html" class="btn btn-primary" style="width: 100%; display: block; text-align: center; background-color: #E69138; border: none;">Apply Now</a>
        </div>
    </div>
</body>`
        );
    }

    fs.writeFileSync('c:/Users/Administrator/Desktop/WESTWIDE/services.html', html);
    console.log("services.html updated successfully.");
} catch (e) {
    console.error(e);
}
