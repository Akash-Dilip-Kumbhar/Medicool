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

        // Replace both mailto links and visible text
        let newContent = content.replace(/Medicoolhospital@gmail\.com/gi, 'info@medicoolhospital.in');
        newContent = newContent.replace(/info@medicoolhospital\.com/gi, 'info@medicoolhospital.in');
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated email in ${file}`);
        }
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
