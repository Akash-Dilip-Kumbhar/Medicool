const fs = require('fs');

const targetFooter = `<!--===== FOOTER AREA STARTS =======-->
    <div class="vl-footer4-section-area"
        style="background-image: url(assets/img/all-images/bg/bg4.png); background-position: center; background-repeat: no-repeat; background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-6">
                    <div class="footer-description-area">
                        <img loading="lazy" src="assets/img/logo/logo1.webp" alt="Medicool Hospital Footer Logo">
                        <div class="space24"></div>
                        <p>Our mission is simple yet profound: to empower individuals and families in our
                            community to
                            live healthier, happier lives.</p>


                    </div>
                </div>
                <div class="col-lg col-md-6">
                    <div class="space30 d-md-none d-block"></div>
                    <div class="footer-widget-area foot-padding2">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="doctor.html">Our Doctors</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg col-md-6">
                    <div class="space30 d-lg-none d-block"></div>
                    <div class="footer-widget-area foot-padding2">
                        <h3>Departments</h3>
                        <ul>
                            <li><a href="general-surgery.html">General Surgery</a></li>
                           
                            <li><a href="plastic-surgery.html">Plastic Surgery</a></li>
                            <li><a href="gastroenterology.html">Gastroenterology</a></li>
                            <li><a href="oncology.html">Oncology</a></li>
                        </ul>
                    </div>
                </div>

               <div class="col-lg col-md-6">
    <div class="space30 d-lg-none d-block"></div>

    <div class="footer-widget-area">
        <h3>Contact Us</h3>

        <ul>

            <!-- PHONE -->
            <li>
                <a href="tel:+919834889938" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
                            stroke="#31353D" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    +91 98348 89938
                </a>
            </li>

            <!-- EMAIL -->
            <li>
                <a href="mailto:info@medicoolhospital.com" class="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                            stroke="#31353D" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    info@medicoolhospital.com
                </a>
            </li>

            <!-- OPD TIME -->
            <li>
                <a href="#" class="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" stroke="#31353D" stroke-width="1.6"/>
                    <path d="M12 7V12L15 14" stroke="#31353D" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
                <span class="">Mon - Sat: <br> 9:00 AM – 8:00 PM</span>
                </a>
            </li>

        </ul>

        <div class="space20"></div>

        <!-- SOCIAL LINKS -->
        <ul class="social-links">
            <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-linkedin-in"></i></a></li>
            <li><a href="https://www.instagram.com/medicool.hospital"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
        </ul>

    </div>
</div>
            </div>
            <div class="space100"></div>
            <div class="col-lg-12">
                <div class="copyright-area justify-content-center">
                    <a>© Copyright 2025 Medicool Hospital. All Right Reserved</a>
                </div>
            </div>
        </div>
    </div>
    <!--===== FOOTER AREA ENDS =======-->`;

const files = [
    'general-surgery.html', 'general-medicine.html', 'pediatrics-patient.html', 
    'orthopaedics.html', 'ent.html', 'cosmetology.html', 'plastic-surgery.html', 
    'gastroenterology.html', 'oncology.html', 'gynaecology.html',
    'index.html', 'about.html', 'doctor.html', 'gallery.html'
];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<!--===== FOOTER AREA STARTS =======-->[\s\S]*?<!--===== FOOTER AREA ENDS =======-->/, targetFooter);
    fs.writeFileSync(file, content);
    console.log(`Updated footer in ${file}`);
});
