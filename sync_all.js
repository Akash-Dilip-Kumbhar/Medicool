const fs = require('fs');

const gynaecology = fs.readFileSync('gynaecology.html', 'utf8');

// 1. All Department Pages that need identical strict syncing like pediatrics
const deptFiles = [
    'general-surgery.html',
    'general-medicine.html',
    'pediatrics-patient.html',
    'orthopaedics.html',
    'ent.html',
    'cosmetology.html',
    'plastic-surgery.html',
    'gastroenterology.html',
    'oncology.html',
    'gynaecology.html'
];

deptFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Header Nav Block
    const headerNavRegex = /<div class="vl-main-menu text-center">[\s\S]*?<\/nav>\s*<\/div>/;
    let headerNavMatch = gynaecology.match(headerNavRegex);
    if(headerNavMatch) {
        let newNav = headerNavMatch[0];
        newNav = newNav.replace(/<a class="active" href="gynaecology\.html">/, '<a href="gynaecology.html">');
        newNav = newNav.replace(new RegExp(`<li><a href="${file}">`), `<li><a class="active" href="${file}">`);
        content = content.replace(headerNavRegex, newNav);
    }

    // Footer Block
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
         content = content.replace(footerRegex, footerStr);
    }

    // WhatsApp Float
    const whatsappRegex = /<!-- Whatsapp Floating Btn -->[\s\S]*?<!-- whastspp flaoting btn end -->/;
    let whatsappMatch = gynaecology.match(whatsappRegex);
    if(whatsappMatch) {
         if(content.includes('<!-- Whatsapp Floating Btn -->')) {
             content = content.replace(whatsappRegex, whatsappMatch[0]);
         } else {
             content = content.replace(/<!--===== JS SCRIPT LINK =======-->/, whatsappMatch[0] + '\n\n    <!--===== JS SCRIPT LINK =======-->');
         }
    }

    // JS scripts at bottom
    const jsRegex = /<!--===== JS SCRIPT LINK =======-->[\s\S]*?<\/html>/;
    let jsMatch = gynaecology.match(jsRegex);
    if(jsMatch) {
        content = content.replace(jsRegex, jsMatch[0]);
    }

    // Remove search area safely
    content = content.replace(/<div class="search-area">[\s\S]*?<\/div>\s*<div class="space30"><\/div>/, '');

    // Active Sidebar class reset and set
    content = content.replace(/<li><a class="active" href="([^"]+)">/, '<li><a href="$1">'); 
    content = content.replace(new RegExp(`<li><a href="${file}">`), `<li><a class="active" href="${file}">`);

    // Container Overflow Hidden
    content = content.replace(/(<div class="service4-section-area[^>]*>[\s\S]*?)<div class="container"(?! style="overflow: hidden;")>/g, '$1<div class="container" style="overflow: hidden;">');
    content = content.replace(/(<div class="service4-section-area[^>]*>[\s\S]*?)<div class="container "(?! style="overflow:\s*hidden;")>/g, '$1<div class="container" style="overflow: hidden;">');
    
    // Safety check just in case double active gets added in sidebar
    content = content.replace(/class="active active"/g, 'class="active"');

    fs.writeFileSync(file, content);
    console.log(`${file} processed!`);
});

// 2. Non-Department Standard Pages (Handle with more care so we don't break custom JS)
const stdFiles = ['index.html', 'about.html', 'doctor.html', 'gallery.html'];
stdFiles.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Header Nav Block
    const headerNavRegex = /<div class="vl-main-menu text-center">[\s\S]*?<\/nav>\s*<\/div>/;
    let headerNavMatch = gynaecology.match(headerNavRegex);
    if(headerNavMatch) {
        let newNav = headerNavMatch[0];
        // Remove department active link completely since this is a global page
        newNav = newNav.replace(/<a class="active" href="gynaecology\.html">/, '<a href="gynaecology.html">');
        
        // Remove active class from Home since we are going to set it dynamically
        newNav = newNav.replace(/<li><a href="index\.html">/, '<li><a href="index.html">');
        
        // Find the matching li for this page and make its inner anchor or itself active
        // For index.html it was <li class="active"> in the user's code originally, but now we can just use class="active" on 'a'.
        newNav = newNav.replace(new RegExp(`href="${file}"`), `href="${file}" class="active"`);
        content = content.replace(headerNavRegex, newNav);
    }

    // Footer Block
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
         content = content.replace(footerRegex, footerStr);
    }

    // WhatsApp Float
    const whatsappRegex = /<!-- Whatsapp Floating Btn -->[\s\S]*?<!-- whastspp flaoting btn end -->/;
    let whatsappMatch = gynaecology.match(whatsappRegex);
    if(whatsappMatch) {
         if(content.includes('<!-- Whatsapp Floating Btn -->')) {
             content = content.replace(whatsappRegex, whatsappMatch[0]);
         } else {
             content = content.replace(/<!--===== JS SCRIPT LINK =======-->/, whatsappMatch[0] + '\n\n    <!--===== JS SCRIPT LINK =======-->');
         }
    }

    // Do NOT overwrite bottom JS scripts entirely because index.html has unique hero slider logic!

    fs.writeFileSync(file, content);
    console.log(`${file} processed!`);
});

console.log('All pages synced automatically!');
