const fs = require('fs');

const files = [
    'index.html', 'about.html', 'doctor.html', 'gallery.html',
    'general-surgery.html', 'general-medicine.html', 'pediatrics-patient.html', 
    'orthopaedics.html', 'ent.html', 'cosmetology.html', 'plastic-surgery.html', 
    'gastroenterology.html', 'oncology.html', 'gynaecology.html'
];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix lowercase gallery in footer quick links
    content = content.replace(/<li><a href="gallery\.html">gallery<\/a><\/li>/g, '<li><a href="gallery.html">Gallery</a></li>');
    
    fs.writeFileSync(file, content);
    console.log(`Checked footer links for ${file}`);
});
