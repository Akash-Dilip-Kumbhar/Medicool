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

const opdBanner = `

                        <div class="space20"></div>
                        <div class="opd-time-banner" data-aos="fade-up" data-aos-duration="1000" style="display: flex; align-items: center; gap: 15px; background: #fdfcff; padding: 12px 20px; border-radius: 8px; border: 1px solid #eae1ff; border-left: 4px solid #4416FF; width: fit-content; max-width: 100%; margin-bottom: 20px;">
                            <div class="icon" style="min-width: 40px; height: 40px; border-radius: 50%; background: #F4F0FF; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-regular fa-clock" style="color: #4416FF; font-size: 18px;"></i>
                            </div>
                            <div>
                                <h6 style="margin: 0; font-size: 13px; font-weight: 700; color: #1C293F; text-transform: uppercase; letter-spacing: 0.5px;">OPD Timings</h6>
                                <p style="margin: 0; font-size: 14px; color: #555; font-weight: 600;">12:30 PM - 2:30 PM  <strong style="color:#4416FF; margin: 0 6px;">|</strong>  5:30 PM - 8:30 PM</p>
                            </div>
                        </div>
`;

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Make sure we haven't already added it to prevent duplicates
    if (!content.includes('class="opd-time-banner"')) {
        // Inject right before the first <hr> inside the main content area
        const regex = /(<p class="text-justify">[\s\S]*?<\/p>\s*<div class="space16"><\/div>\s*)(<hr>)/;
        content = content.replace(regex, `$1${opdBanner}\n                        $2`);

        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Skipped ${file} - already has OPD banner`);
    }
});
