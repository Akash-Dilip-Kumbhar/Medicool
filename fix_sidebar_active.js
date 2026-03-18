const fs = require('fs');

const files = [
    'ent.html',
    'plastic-surgery.html',
    'oncology.html',
    'orthopaedics.html',
    'pediatrics-patient.html',
    'cosmetology.html',
    'gastroenterology.html'
];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Extract the Categories Area block
    const sidebarRegex = /<div class="categories-area">[\s\S]*?<ul>([\s\S]*?)<\/ul>\s*<\/div>/;
    let match = content.match(sidebarRegex);
    
    if (match) {
        let ulContent = match[1];
        
        // Remove 'active' from any anchor tag inside this ul
        ulContent = ulContent.replace(/<a class="active" /g, '<a ');
        
        // Add active to the current file's anchor tag
        const currentFileRegex = new RegExp(`<a href="${file}">`);
        ulContent = ulContent.replace(currentFileRegex, `<a class="active" href="${file}">`);
        
        // Replace it back
        content = content.replace(match[1], ulContent);
        
        fs.writeFileSync(file, content);
        console.log(`Sidebar active class fixed in ${file}`);
    } else {
        console.log(`Could not find sidebar categories area in ${file}`);
    }
});
