const fs = require('fs');
const path = require('path');

const departments = {
    'general-surgery.html': {
        name: 'General Surgery',
        doctors: [
            { name: "Dr. Barkha Kukreja", qual: "MBBS, MS", img: "doc-fe-9.png" },
            { name: "Dr. Kanchan Waykole", qual: "MBBS, MS", img: "doc-fe-9.png" },
            { name: "Dr. Pawan Dharurkar", qual: "MBBS, MS", img: "doc-me-2.png" },
            { name: "Dr. Kamlakar Haran", qual: "MBBS, DNB", img: "doc-me-2.png" }
        ]
    },
    'general-medicine.html': {
        name: 'General Medicine',
        doctors: [
            { name: "Dr. Prasad Bagare", qual: "MBBS, MD", img: "doc-me-2.png" },
            { name: "Dr. Ganesh Rajguru", qual: "MBBS, DTCD", img: "doc-me-2.png" }
        ]
    },
    'pediatrics-patient.html': {
        name: 'Pediatrics',
        doctors: [
            { name: "Dr. Swati Vispute", qual: "MBBS, DCH", img: "doc-fe-9.png" },
            { name: "Dr. Aditya Thorat", qual: "MBBS, MD", img: "doc-me-2.png" }
        ]
    },
    'orthopaedics.html': {
        name: 'Orthopedics',
        doctors: [
            { name: "Dr. Javed Shaikh", qual: "MBBS, DNB, MCH", img: "doc-me-2.png" }
        ]
    },
    'ent.html': {
        name: 'ENT',
        doctors: [
            { name: "Dr. Paresh Chavan", qual: "MBBS, MS", img: "doc-me-2.png" },
            { name: "Dr. Chirag Shah", qual: "MBBS, MS", img: "doc-me-2.png" },
            { name: "Dr. Sunil Pawar", qual: "MBBS, MS", img: "doc-me-2.png" }
        ]
    },
    'cosmetology.html': {
        name: 'Cosmetology',
        doctors: [
            { name: "Dr. Barkha Kukreja", qual: "MBBS, MS", img: "doc-fe-9.png" },
            { name: "Dr. Varsha Kukreja", qual: "MBBS, MS", img: "doc-fe-9.png" }
        ]
    },
    'plastic-surgery.html': {
        name: 'Plastic Surgery',
        doctors: [
            { name: "Dr. Ameya Raskar", qual: "MBBS, MS, MCh", img: "doc-me-2.png" },
            { name: "Dr. Pankaj Waghmare", qual: "MBBS, DNB", img: "doc-me-2.png" }
        ]
    },
    'gastroenterology.html': {
        name: 'Gastroenterology',
        doctors: [
            { name: "Dr. Amit Waykole", qual: "MBBS, DNB", img: "doc-me-2.png" }
        ]
    },
    'oncology.html': {
        name: 'Oncology',
        doctors: [
            { name: "Dr. Snita Sinukumar", qual: "MBBS, DNB", img: "doc-fe-9.png" },
            { name: "Dr. Tushar Chaudhari", qual: "MBBS, MD", img: "doc-me-2.png" },
            { name: "Dr. Satish Rao", qual: "MBBS, MD", img: "doc-me-2.png" },
            { name: "Dr. Sachin Patil", qual: "MBBS, DNB", img: "doc-me-2.png" }
        ]
    }
};

const gynaecology = fs.readFileSync('gynaecology.html', 'utf8');

// Extraction patterns
const headStyleBlockMatch = gynaecology.match(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/@splidejs\/splide@4\.1\.4\/dist\/css\/splide\.min\.css">[\s\S]*?<\/style>/);
const styleBlock = headStyleBlockMatch ? headStyleBlockMatch[0] : '';

const footerMatch = gynaecology.match(/<!--===== FOOTER AREA STARTS =======-->[\s\S]*?<!--===== FOOTER AREA ENDS =======-->/);
const footerBlock = footerMatch ? footerMatch[0] : '';

const whatsappMatch = gynaecology.match(/<!-- Whatsapp Floating Btn -->[\s\S]*?<!-- whastspp flaoting btn end -->/);
const whatsappBlock = whatsappMatch ? whatsappMatch[0] : '';

const scriptsMatch = gynaecology.match(/<!--===== JS SCRIPT LINK =======-->[\s\S]*?<\/html>/);
let scriptsBlock = '';
if (scriptsMatch) {
    scriptsBlock = scriptsMatch[0];
    scriptsBlock = scriptsBlock.replace('</html>', '').trim() + '\n\n</html>';
}

const sliderMatch = gynaecology.match(/<div class="row">[\s]*<div class="col-lg-12">[\s]*<div class="splide departmental-slider">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!--===== SERVICE 4 SECTION AREA ENDS =======-->/);
const sliderBlock = sliderMatch ? sliderMatch[0] : '';


Object.keys(departments).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject Style block in head
    if (!content.includes('.specialist-sidebar-title') && styleBlock) {
        if(content.includes('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>')) {
           content = content.replace(
               '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>',
               styleBlock + '\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>'
           );
        } else {
             content = content.replace('</head>', `    ${styleBlock}\n</head>`);
        }
    }

    // 2. Build and replace the sidebar
    const depData = departments[file];
    let sidebarHTML = `
                        <div class="categories-area specialists-box">
                            <h3 class="specialist-sidebar-title">Our Specialists</h3>`;
                            
    depData.doctors.forEach(doc => {
        sidebarHTML += `
                            <div class="doctor-minimal-card specialist-sidebar-card">
                                <div class="doc-img specialist-doc-img">
                                    <img src="assets/img/all-images/avataar/${doc.img}" alt="${doc.name}">
                                </div>
                                <div class="doc-info specialist-doc-info">
                                    <h4>${doc.name}</h4>
                                    <p>${doc.qual}</p>
                                </div>
                            </div>`;
    });
    sidebarHTML += `\n                        </div>`;

    if (content.includes('class="open-hours-box"')) {
        content = content.replace(/<div class="open-hours-box">[\s\S]*?<\/div>[\s]*<\/div>[\s]*<\/div>[\s]*<div class="col-lg-8">/, sidebarHTML + '\n                    </div>\n                </div>\n\n                <div class="col-lg-8">');
    } else if (content.includes('class="categories-area specialists-box"')) {
        content = content.replace(/<div class="categories-area specialists-box">[\s\S]*?<\/div>[\s]*<\/div>[\s]*<\/div>[\s]*<div class="col-lg-8">/, sidebarHTML + '\n                    </div>\n                </div>\n\n                <div class="col-lg-8">');
    }

    // 3. Replace the departments slider
    if (sliderBlock) {
        // Regex to capture the old Owl carousel setup
        const oldSliderRegex = /<div class="row">[\s]*<div class="col-lg-12">[\s]*<div class="service4-slider-area owl-carousel">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!--===== SERVICE 4 SECTION AREA ENDS =======-->/;
        
        if (oldSliderRegex.test(content)) {
            content = content.replace(oldSliderRegex, sliderBlock);
        } else if (content.includes('departmental-slider')) {
            // Already updated this block, pass.
        } else {
            console.log(`Failed to match old slider in ${file}`);
        }
    }

    // 4. Footer replacement
    if (footerBlock && content.includes('vl-footer4-section-area')) {
        content = content.replace(/<!--===== FOOTER AREA STARTS =======-->[\s\S]*?<!--===== FOOTER AREA ENDS =======-->/, footerBlock);
    }
    
    // 5. Scripts replacement
    if (scriptsBlock && content.includes('<!--===== JS SCRIPT LINK =======-->')) {
        content = content.replace(/<!--===== JS SCRIPT LINK =======-->[\s\S]*?<\/html>/, scriptsBlock);
    }

    // 6. WhatsApp
    if (whatsappBlock && !content.includes('whatsapp-float')) {
        content = content.replace(/<!--===== JS SCRIPT LINK =======-->/, whatsappBlock + '\n\n    <!--===== JS SCRIPT LINK =======-->');
    }

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});
console.log('All departments synced!');
