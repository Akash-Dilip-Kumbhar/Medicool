const fs = require('fs');

const targetHeaderTemplate = `<!--=====HEADER START=======-->
    <header class="homepage4-body">
        <div id="vl-header-sticky" class="vl-header-area vl-transparent-header header-sticky">
            <div class="container">
                <div class="row align-items-center row-bg1">
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="vl-logo">
                            <a href="index.html"><img loading="lazy" src="assets/img/logo/logo1.webp" alt=""></a>
                        </div>
                    </div>
                    <div class="col-lg-7 d-none d-lg-block">
                        <div class="vl-main-menu text-center">
                            <nav class="vl-mobile-menu-active">
                                <ul>
                                    <li><a href="index.html">Home</a></li>
                                    <li><a class="active" href="about.html">About Us</a></li>
                                    <li><a href="#">Departments <span class="arrow-size"><i
                                                    class="fa-solid fa-angle-down d-lg-inline d-none"></i></span></a>
                                        <ul class="sub-menu">
                                            <li><a href="general-surgery.html">General Surgery</a></li>
                                            <li><a href="general-medicine.html">General Medicine</a></li>
                                            <li><a href="gynaecology.html">Obstetrics & Gynecology</a>
                                            </li>
                                            <li><a href="pediatrics-patient.html">Pediatrics</a></li>
                                            <li><a href="orthopaedics.html">Orthopedics</a></li>
                                            <li><a href="ent.html">ENT (Ear, Nose & Throat)</a></li>
                                            <li><a href="cosmetology.html">Cosmetology</a></li>
                                            <li><a href="plastic-surgery.html">Plastic Surgery</a></li>
                                            <li><a href="gastroenterology.html">Gastroenterology</a></li>
                                            <li><a href="oncology.html">Oncology</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="doctor.html">Doctors</a></li>
                                    <li><a href="gallery.html">Gallery</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-6">
                        <div class="vl-hero-btn d-none d-lg-block text-end">
                            <div class="btn-area1"
                                style="display: flex; align-items: center; gap: 15px; justify-content: flex-end;">

                                <a href="tel:+919834889938" class="phone">
                                    <i class="fa-solid fa-phone"></i> +91 98348 89938</a>

                            </div>
                        </div>
                        <div class="vl-header-action-item d-block d-lg-none">
                            <button type="button" class="vl-offcanvas-toggle">
                                <i class="fa-solid fa-bars-staggered"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!--=====HEADER END =======-->

    <!--===== MOBILE HEADER STARTS =======-->
    <div class="homepage4-body">
        <div class="vl-offcanvas">
            <div class="vl-offcanvas-wrapper">
                <div class="vl-offcanvas-header d-flex justify-content-between align-items-center mb-90">
                    <div class="vl-offcanvas-logo">
                        <a href="index.html"><img loading="lazy" src="assets/img/logo/logo1.webp" alt=""></a>
                    </div>
                    <div class="vl-offcanvas-close">
                        <button class="vl-offcanvas-close-toggle" aria-label="Close Navigation"><i
                                class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>


                <div class="vl-offcanvas-menu d-lg-none mb-40">
                    <nav>
                    </nav>
                </div>
                <div class="space20"></div>
                <div class="vl-offcanvas-info">
                    <h3 class="vl-offcanvas-sm-title">Contact Us</h3>
                    <div class="space20"></div>
                    <span><a href="#"> <i class="fa-regular fa-envelope"></i> 098348 89938</a></span>
                    <span><a href="#"><i class="fa-solid fa-phone"></i> info@medicoolhospital.com</a></span>
                    <span><a href="#"><i class="fa-solid fa-location-dot"></i> Kalewadi, Pimpri-Chinchwad,
                            Maharashtra</a></span>
                </div>
                <div class="space20"></div>
                <div class="vl-offcanvas-social">
                    <h3 class="vl-offcanvas-sm-title">Follow Us</h3>
                    <div class="space20"></div>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>

            </div>
        </div>
        <div class="vl-offcanvas-overlay"></div>
    </div>
    <!--===== MOBILE HEADER ENDS =======-->`;

const file = 'about.html';
let content = fs.readFileSync(file, 'utf8');

const partialRegex = /<!--=====HEADER START=======-->[\s\S]*?<!--=====HEADER END =======-->/;

if (partialRegex.test(content)) {
    content = content.replace(partialRegex, targetHeaderTemplate);
    fs.writeFileSync(file, content);
    console.log("Fixed about.html header anomaly");
} else {
    console.log("Could not find header in about.html");
}
