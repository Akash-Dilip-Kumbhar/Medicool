const fs = require('fs');

const gynaecology = fs.readFileSync('gynaecology.html', 'utf8');
let surgery = fs.readFileSync('general-surgery.html', 'utf8');

// 1. Header nav block
const headerNavRegex = /<div class="vl-main-menu text-center">[\s\S]*?<\/nav>\s*<\/div>/;
let headerNavMatch = gynaecology.match(headerNavRegex);
if(headerNavMatch) {
    let newNav = headerNavMatch[0];
    // swap active class from gynaecology to general-surgery
    newNav = newNav.replace('<a class="active" href="gynaecology.html">', '<a href="gynaecology.html">');
    newNav = newNav.replace('<li><a href="general-surgery.html">', '<li><a class="active" href="general-surgery.html">');
    surgery = surgery.replace(headerNavRegex, newNav);
}

// 2. Footer Block
const footerRegex = /<!--===== FOOTER AREA STARTS =======-->[\s\S]*?<!--===== FOOTER AREA ENDS =======-->/;
let footerMatch = gynaecology.match(footerRegex);
if(footerMatch) {
    let footerStr = footerMatch[0];
    
    // The user had a truncated departments list in gynaecology. I should fix it instead.
    const badDeptsRegex = /<div class="footer-widget-area foot-padding2">[\s\S]*?<\/ul>\s*<\/div>/;
    const properDeptsList = `
                    <div class="footer-widget-area foot-padding2">
                        <h3>Our Departments</h3>
                        <ul>
                            <li><a href="general-surgery.html">General Surgery</a></li>
                            <li><a href="general-medicine.html">General Medicine</a></li>
                            <li><a href="gynaecology.html">Obstetrics & Gynecology</a></li>
                            <li><a href="pediatrics-patient.html">Pediatrics</a></li>
                            <li><a href="orthopaedics.html">Orthopedics</a></li>
                            <li><a href="ent.html">ENT (Ear, Nose & Throat)</a></li>
                            <li><a href="cosmetology.html">Cosmetology</a></li>
                            <li><a href="plastic-surgery.html">Plastic Surgery</a></li>
                            <li><a href="gastroenterology.html">Gastroenterology</a></li>
                            <li><a href="oncology.html">Oncology</a></li>
                        </ul>
                    </div>`;
    footerStr = footerStr.replace(badDeptsRegex, properDeptsList.trim());

    surgery = surgery.replace(footerRegex, footerStr);
}

// 3. WhatsApp Float
const whatsappRegex = /<!-- Whatsapp Floating Btn -->[\s\S]*?<!-- whastspp flaoting btn end -->/;
let whatsappMatch = gynaecology.match(whatsappRegex);
if(whatsappMatch) {
    if(surgery.includes('<!-- Whatsapp Floating Btn -->')) {
        surgery = surgery.replace(whatsappRegex, whatsappMatch[0]);
    } else {
        surgery = surgery.replace(/<!--===== JS SCRIPT LINK =======-->/, whatsappMatch[0] + '\n\n    <!--===== JS SCRIPT LINK =======-->');
    }
}

// 4. CSS in head
// Already done by the previous script (splide.min.css and inline styles)!

// 5. JS scripts at bottom
const jsRegex = /<!--===== JS SCRIPT LINK =======-->[\s\S]*?<\/html>/;
let jsMatch = gynaecology.match(jsRegex);
if(jsMatch) {
    surgery = surgery.replace(jsRegex, jsMatch[0]);
}

fs.writeFileSync('general-surgery.html', surgery);
console.log('general-surgery.html synced completely!');
