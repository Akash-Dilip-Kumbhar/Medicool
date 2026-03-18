const fs = require('fs');

const gynaecology = fs.readFileSync('gynaecology.html', 'utf8');
let pedi = fs.readFileSync('pediatrics-patient.html', 'utf8');

// 1. Header nav block
const headerNavRegex = /<div class="vl-main-menu text-center">[\s\S]*?<\/nav>\s*<\/div>/;
let headerNavMatch = gynaecology.match(headerNavRegex);
if(headerNavMatch) {
    let newNav = headerNavMatch[0];
    newNav = newNav.replace('<a class="active" href="gynaecology.html">', '<a href="gynaecology.html">');
    newNav = newNav.replace('<li><a href="pediatrics-patient.html">', '<li><a class="active" href="pediatrics-patient.html">');
    pedi = pedi.replace(headerNavRegex, newNav);
}

// 2. Footer Block
const footerRegex = /<!--===== FOOTER AREA STARTS =======-->[\s\S]*?<!--===== FOOTER AREA ENDS =======-->/;
let footerMatch = gynaecology.match(footerRegex);
if(footerMatch) {
    let footerStr = footerMatch[0];
    
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

    pedi = pedi.replace(footerRegex, footerStr);
}

// 3. WhatsApp Float
const whatsappRegex = /<!-- Whatsapp Floating Btn -->[\s\S]*?<!-- whastspp flaoting btn end -->/;
let whatsappMatch = gynaecology.match(whatsappRegex);
if(whatsappMatch) {
    if(pedi.includes('<!-- Whatsapp Floating Btn -->')) {
        pedi = pedi.replace(whatsappRegex, whatsappMatch[0]);
    } else {
        pedi = pedi.replace(/<!--===== JS SCRIPT LINK =======-->/, whatsappMatch[0] + '\n\n    <!--===== JS SCRIPT LINK =======-->');
    }
}

// 4. JS scripts at bottom
const jsRegex = /<!--===== JS SCRIPT LINK =======-->[\s\S]*?<\/html>/;
let jsMatch = gynaecology.match(jsRegex);
if(jsMatch) {
    pedi = pedi.replace(jsRegex, jsMatch[0]);
}

// 5. Remove search area
const searchAreaRegex = /<div class="search-area">[\s\S]*?<\/div>\s*<div class="space30"><\/div>/;
pedi = pedi.replace(searchAreaRegex, '');

// 6. Set active class to Pediatrics in sidebar link
// The list item looks like: <li><a href="pediatrics-patient.html">Pediatrics <span><i class="fa-solid fa-angle-right"></i></span></a></li>
pedi = pedi.replace(/<li><a class="active" href="([^"]+)">/, '<li><a href="$1">'); // remove any existing active
pedi = pedi.replace(/<li><a href="pediatrics-patient\.html">/, '<li><a href="pediatrics-patient.html" class="active">');

// 7. Add style="overflow: hidden;" to service4 container
// Find `<div class="service4-section-area sp1"> ... <div class="container">`
pedi = pedi.replace(/(<div class="service4-section-area[^>]*>[\s\S]*?)<div class="container">/g, '$1<div class="container" style="overflow: hidden;">');

fs.writeFileSync('pediatrics-patient.html', pedi);
console.log('pediatrics-patient.html synced completely!');
