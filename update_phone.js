const fs = require('fs');

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

        // 1. WhatsApp link fix
        let newContent = content.replace(/wa\.me\/919876543210/g, 'wa.me/919834889938');

        // 2. tel: link fix
        newContent = newContent.replace(/tel:\+919876543210/g, 'tel:+919834889938');

        // 3. Visual offcanvas / mobile menu text fix
        newContent = newContent.replace(/098348 89938/g, '+91 98348 89938');

        // 4. Any general visual +91 9876543210 if exists
        newContent = newContent.replace(/\+91\s*9876543210/g, '+91 98348 89938');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated mobile numbers in ${file}`);
        }
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
