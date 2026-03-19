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

const galleryPages = [
    'gallery.html',
    'videogallery.html'
];

const newGalleryBlock = `
                                    <li><a href="gallery.html">Gallery <span class="arrow-size"><i
                                                    class="fa-solid fa-angle-down d-lg-inline d-none"></i></span></a>
                                        <ul class="sub-menu">
                                            <li><a href="gallery.html">Photo Gallery</a></li>
                                            <li><a href="videogallery.html">Video Gallery</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Target the vl-main-menu block up to </nav>
        const menuRegex = /(<div class="vl-main-menu text-center">[\s\S]*?<\/nav>)/;
        
        let match = content.match(menuRegex);
        if (!match) {
            console.log("No match found for", file);
            return;
        }
        
        let menuHTML = match[1];

        // 1. Inject the normalized Gallery Dropdown after Doctors
        const injectRegex = /(<li[^>]*>\s*<a[^>]*href="doctor\.html"[^>]*>Doctors<\/a>\s*<\/li>)[\s\S]*?<\/ul>\s*<\/nav>/i;
        menuHTML = menuHTML.replace(injectRegex, `$1${newGalleryBlock}`);

        // 2. Strip ALL active classes from <li> and <a>
        menuHTML = menuHTML.replace(/<li[^>]*class="active"[^>]*>/g, '<li>');
        
        // Strip out active class safely (handle 'active' inside class attributes)
        menuHTML = menuHTML.replace(/\sclass="active"/g, '');
        menuHTML = menuHTML.replace(/\sclass='active'/g, '');

        // 3. Re-apply active class based on the file
        if (galleryPages.includes(file)) {
            // Activate Gallery parent <li>
            const galParentRegex = /<li>\s*<a\s+href="gallery\.html">Gallery/i;
            menuHTML = menuHTML.replace(galParentRegex, '<li class="active"><a href="gallery.html">Gallery');

            // Activate specific gallery sub-menu <li>
            const galLinkRegex = new RegExp(`<li>\\s*<a\\s+href="${file}">`, 'i');
            menuHTML = menuHTML.replace(galLinkRegex, `<li class="active"><a href="${file}">`);

        } else if (departmentPages.includes(file)) {
            // Activate "Departments" parent <li>
            const depParentRegex = /<li>\s*<a\s+href="#">Departments/i;
            menuHTML = menuHTML.replace(depParentRegex, '<li class="active"><a href="#">Departments');

            // Activate specific department sub-menu <li>
            const depLinkRegex = new RegExp(`<li>\\s*<a\\s+href="${file}">`, 'i');
            menuHTML = menuHTML.replace(depLinkRegex, `<li class="active"><a href="${file}">`);

        } else {
            // Activate specific main menu <li>
            const mainReg = new RegExp(`<li>\\s*<a\\s+href="${file}">`, 'i');
            menuHTML = menuHTML.replace(mainReg, `<li class="active"><a href="${file}">`);
        }
        
        content = content.replace(menuRegex, menuHTML);
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (e) {
        console.log("Error processing", file, e);
    }
});
