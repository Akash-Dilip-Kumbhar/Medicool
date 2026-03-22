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

        // Target the specific multiline layout `+91 \n 98765 43210`
        let newContent = content.replace(/\+91\s*98765 43210/g, '+91 98348 89938');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated lingering multi-line phone numbers in ${file}`);
        }
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
