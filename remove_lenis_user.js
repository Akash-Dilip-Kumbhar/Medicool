const fs = require('fs');

const files = [
    'general-surgery.html', 'general-medicine.html', 'pediatrics-patient.html', 
    'orthopaedics.html', 'ent.html', 'cosmetology.html', 'plastic-surgery.html', 
    'gastroenterology.html', 'oncology.html', 'gynaecology.html',
    'index.html', 'about.html', 'doctor.html', 'gallery.html'
];

// Matches the Lenis block exactly
const lenisRegex = /<!-- Lenis FIRST -->[\s\S]*?<\/script>\s*<script>\s*window\.addEventListener\("load"[\s\S]*?requestAnimationFrame\(raf\);\s*\}\);\s*<\/script>\s*/g;

let count = 0;
files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    if (lenisRegex.test(content)) {
        content = content.replace(lenisRegex, '');
        fs.writeFileSync(file, content);
        console.log(`[SUCCESS] Removed Lenis from ${file}`);
        count++;
    } else {
        console.log(`[SKIPPED] Lenis already removed in ${file}`);
    }
});

console.log(`Fully removed Lenis from ${count} files.`);
