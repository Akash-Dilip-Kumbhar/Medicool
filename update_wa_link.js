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

        // Strip the country code '91' from the whatsapp link
        let newContent = content.replace(/wa\.me\/919834889938/g, 'wa.me/9834889938');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated whatsapp link in ${file}`);
        }
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
