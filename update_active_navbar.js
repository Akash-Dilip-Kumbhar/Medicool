const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'about.html',
    'doctor.html',
    'gallery.html',
    'general-surgery.html',
    'general-medicine.html',
    'gynaecology.html',
    'pediatrics-patient.html',
    'orthopaedics.html',
    'ent.html',
    'cosmetology.html',
    'plastic-surgery.html',
    'gastroenterology.html',
    'oncology.html'
];

const departmentPages = [
    'general-surgery.html',
    'general-medicine.html',
    'gynaecology.html',
    'pediatrics-patient.html',
    'orthopaedics.html',
    'ent.html',
    'cosmetology.html',
    'plastic-surgery.html',
    'gastroenterology.html',
    'oncology.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    const menuRegex = /(<div class="vl-main-menu text-center">[\s\S]*?)(<\/div>)/;
    let match = content.match(menuRegex);
    if (!match) return;
    
    let menuHTML = match[1];

    // Clean up all existing strict actives:
    // Remove class="active" from ANY <li> or <a> in the menu
    menuHTML = menuHTML.replace(/<li[^>]*class="active"[^>]*>/g, '<li>');
    menuHTML = menuHTML.replace(/<a[^>]*class="active"[^>]*>/g, function(aMatch){
        return aMatch.replace(/\bclass="active"\s*/, '').replace(/\bclass='active'\s*/, '').trim() + '>';
    });

    // Replace double spaces like <a  href= to <a href=
    menuHTML = menuHTML.replace(/<a\s+href=/g, '<a href=');
    menuHTML = menuHTML.replace(/<li\s+class="active">/g, '<li>');
    // Ensure we stripped all active variants
    menuHTML = menuHTML.replace(/class="active"/g, '');

    // Now, add the active class to the correct <li>
    // For main links:
    if (!departmentPages.includes(file)) {
        // Find the <li> that contains <a href="file">
        const regex = new RegExp(`<li>\\s*<a\\s+href="${file}">`, 'i');
        menuHTML = menuHTML.replace(regex, `<li class="active"><a href="${file}">`);
    } else {
        // Department page
        // Activate "Departments" parent <li>
        const depParentRegex = /<li>\s*<a\s+href="#">Departments/i;
        menuHTML = menuHTML.replace(depParentRegex, '<li class="active"><a href="#">Departments');

        // Activate specific department sub-menu <li>
        const depLinkRegex = new RegExp(`<li>\\s*<a\\s+href="${file}">`, 'i');
        menuHTML = menuHTML.replace(depLinkRegex, `<li class="active"><a href="${file}">`);
    }
    
    content = content.replace(menuRegex, menuHTML + "$2");
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
