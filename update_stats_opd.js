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

        // 1. Patients 500+ -> 200+
        content = content.replace(/<span class="counter">500<\/span>\+/g, '<span class="counter">200</span>+');

        // 2. Years 10+ -> 5+
        content = content.replace(/<span class="counter">10<\/span>\+/g, '<span class="counter">5</span>+');
        content = content.replace(/Years serving the community/g, 'Years of serving');

        // 3. OPD time
        // The original string is typically "9:00 AM – 8:00 PM" with an en dash.
        content = content.replace(/9:00\s*AM\s*.{1,3}\s*8:00\s*PM/g, '12:30 PM to 2:30 PM & 5:30 PM to 8:30 PM');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
