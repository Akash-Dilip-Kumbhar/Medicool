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
    'oncology.html',
    'videogallery.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Target only the vl-main-menu block to avoid accidents
        const menuRegex = /(<div class="vl-main-menu text-center">[\s\S]*?)(<\/div>)/;
        let match = content.match(menuRegex);
        if (match) {
            let menuHTML = match[1];

            // Remove any number of extra '>' directly after the closing bracket of <a>
            // For example: <a href="#">>Departments -> <a href="#">Departments
            // Or <a href="gallery.html">>Gallery -> <a href="gallery.html">Gallery
            menuHTML = menuHTML.replace(/(<a[^>]*>)(\s*)>+/g, '$1$2');

            // Just in case it was a double brace like href="index.html">>
            menuHTML = menuHTML.replace(/(<a[^>]*"|')>>+/g, '$1>');

            content = content.replace(menuRegex, menuHTML + "$2");
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned up ${file}`);
    } catch (e) {
        console.log(`Error reading ${file} ` + e.message);
    }
});
