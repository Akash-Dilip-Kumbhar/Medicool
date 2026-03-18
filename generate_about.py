import os, json

target_file = r'g:\Probus\Projects\HTML\Medicool-Website\Medicool\about.html'
template_file = r'g:\Probus\Projects\HTML\Medicool-Website\Medicool\plastic-surgery.html'

with open(template_file, 'r', encoding='utf-8') as f:
    ps_html = f.read()

header = ps_html.split('<!--===== Plastic Surgery BREADCUMB STARTS =======-->')[0]
header = header.replace('<title>Plastic Surgery | Medicool Hospital</title>', '<title>About Us | Medicool Hospital</title>')

footer = '<!--===== FOOTER AREA STARTS =======-->' + ps_html.split('<!--===== FOOTER AREA STARTS =======-->')[1]

breadcrumb = '''
    <!--===== ABOUT BREADCUMB STARTS =======-->
    <div class="inner-header-section-area"
        style="background-image: url('assets/img/all-images/bg/bg9.webp'); background-position: center; background-repeat: no-repeat; background-size: cover;">
        <img src="assets/img/elements/elements28.webp" alt="" class="elements28">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="hero-header heading4 m-auto">
                        <h2 data-aos="fade-up" data-aos-duration="900">About Medicool Hospital</h2>
                        <div class="space30"></div>
                        <div class="bradecrumb-area" data-aos="fade-up" data-aos-duration="800">
                            <a href="index.html">Home</a>
                            <i class="fa-solid fa-angle-right"></i>
                            <span>About Us</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--===== ABOUT BREADCUMB ENDS =======-->
'''

welcome_section = '''
    <!--===== WELCOME AREA STARTS =======-->
    <div class="about4-section-area sp1">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-lg-6">
                    <div class="splide about-hero-slider rounded-4 overflow-hidden shadow-lg" style="border-radius: 20px;">
                        <div class="splide__track">
                            <ul class="splide__list">
                                <li class="splide__slide"><img src="https://hospitalarchitects.in/sites/default/files/styles/hd/public/best_architect_for_multi_specialty_hospital_design.jpg?itok=oy4n1sYT" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover;"></li>
                                <li class="splide__slide"><img src="https://media3.colourbox.com/m6aMTTZT7FkP__s3CJ1PgRBQhTECdxGabiSLA_WXmCU/resize%3Afit%3A800%3A800%3A1/q%3A70/aHR0cHM6Ly9tZWRpYS5jb2xvdXJib3guY29tL1VzZ3ZxVkU4SmNpb3ZESlNZcTkwand2TGh0UTN6WUR4ZUFvWEk4dUV5c1UvcmVzaXplOmZpdDoxNjAwOjE2MDA6MS9wbGFpbi9teXMzL2NvbG91cmJveC5wbG92cGVubmluZy5maWxlL0NPTE9VUkJPWDY0MTY1Nzg3LmpwZw%3D%3D" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover;"></li>
                                <li class="splide__slide"><img src="https://png.pngtree.com/background/20250203/original/pngtree-modern-hospital-reception-with-clean-white-interior-and-blue-accents-picture-image_16052047.jpg" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover;"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about4-heading heading4 padding-left">
                        <h5 class="vl-section-subtitle aos-init aos-animate" data-aos="fade-left" data-aos-duration="800">Welcome to Medicool Hospital <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none"><path d="M0.667969 4.00033H11.049M8.00137 7.33366L11.3346 4.00033L8.0013 0.666992" stroke="#02015A" stroke-width="1.5"></path></svg></h5>
                        <div class="space24"></div>
                        <h2 class="vl-section-title about-section-title" data-aos="fade-up" data-aos-duration="800">Advanced Care, Deep Compassion</h2>
                        <div class="space24"></div>
                        <p class="about-section-desc" data-aos="fade-left" data-aos-duration="900" style="font-size: 17px; line-height: 1.8;">Medicool Hospital is a modern multi-specialty healthcare center committed to providing high-quality medical care with compassion, expertise, and advanced technology. Our hospital brings together experienced doctors, specialized medical departments, and modern healthcare facilities to deliver comprehensive diagnosis, treatment, and preventive healthcare services.</p>
                        <div class="space16"></div>
                        <p class="about-section-desc" data-aos="fade-left" data-aos-duration="1000" style="font-size: 17px; line-height: 1.8;">We focus on patient-centered healthcare, ensuring that every patient receives personalized treatment, accurate diagnosis, and continuous medical support. Whether it is routine health consultation, specialized surgery, or advanced medical treatment, Medicool Hospital strives to provide safe, ethical, and reliable healthcare services to the community.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="space60"></div>
    <!--===== WELCOME AREA ENDS =======-->
'''

mission_vision = '''
    <!--===== MISSION VISION AREA STARTS =======-->
    <div class="service-benefites-section-area sp2" style="background-color: #f8f9fa;">
        <div class="container">
            <div class="row">
                <div class="col-lg-6" data-aos="fade-up" data-aos-duration="800">
                    <div class="benefites-widget-boxarea" style="background: white; padding: 50px 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: 100%; border-top: 5px solid var(--ztc-text-text-12);">
                        <div style="width: 60px; height: 60px; background: rgba(68, 22, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i class="fa-solid fa-bullseye" style="font-size: 24px; color: var(--ztc-text-text-12);"></i>
                        </div>
                        <h3 style="font-size: 28px; font-weight: 700; color: var(--ztc-text-text-11); margin-bottom: 20px;">Our Mission</h3>
                        <p style="font-size: 17px; line-height: 1.8; color: #494A4A;">Our mission is to provide accessible, affordable, and high-quality healthcare services through modern medical technology, skilled specialists, and compassionate patient care.</p>
                    </div>
                </div>
                <div class="col-lg-6 mt-4 mt-lg-0" data-aos="fade-up" data-aos-duration="1000">
                    <div class="benefites-widget-boxarea" style="background: white; padding: 50px 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: 100%; border-top: 5px solid var(--ztc-text-text-12);">
                        <div style="width: 60px; height: 60px; background: rgba(68, 22, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                            <i class="fa-regular fa-eye" style="font-size: 24px; color: var(--ztc-text-text-12);"></i>
                        </div>
                        <h3 style="font-size: 28px; font-weight: 700; color: var(--ztc-text-text-11); margin-bottom: 20px;">Our Vision</h3>
                        <p style="font-size: 17px; line-height: 1.8; color: #494A4A;">Our vision is to become a trusted multi-specialty hospital known for clinical excellence, advanced treatments, and patient satisfaction while improving the overall health of the community.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--===== MISSION VISION AREA ENDS =======-->
'''

specialties_data = [
    {
        "name": "General Surgery",
        "desc": "The General Surgery department at Medicool Hospital provides advanced surgical care for abdominal diseases, hernia, gallbladder conditions, and other surgical problems using modern techniques including laparoscopic (minimally invasive) surgery.",
        "images": [
            "https://productimages.withfloats.com/serviceimages/tile/6458cd8c4a1bc26149111d63lapro",
            "https://www.aksharhospitals.com/storage/590/649d436a547a2_GS.webp",
            "https://my.clevelandclinic.org/-/scassets/Images/org/health/articles/4819-laparoscopy.jpg"
        ],
        "specialists": [
            "Dr. Barkha Kukreja — MBBS, MS General & Laparoscopic Surgery",
            "Dr. Kanchan Waykole — MBBS, MS General & Laparoscopic Surgery",
            "Dr. Pawan Dharurkar — MBBS, MS General & Laparoscopic Surgery",
            "Dr. Kamlakar Haran — MBBS, DNB General Surgery"
        ]
    },
    {
        "name": "General Medicine",
        "desc": "The General Medicine department focuses on diagnosing and treating common illnesses, chronic diseases, infections, and lifestyle disorders. Our physicians provide preventive care, accurate diagnosis, and long-term disease management.",
        "images": [
            "https://kdahweb-static-1.kokilabenhospital.com/kdah-2019/shop/package/images/16225529690.jpg",
            "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJjbGllbnQtY2hkcnR4NWphaHV0Y2hsdiJ9LCJwYXRoIjoiaWhoLWhlYWx0aGNhcmUtYmVyaGFkXC9maWxlXC80Z3Z3c0NNdzFIelQxdGhkN3NVQy5qcGcifQ%3Aihh-healthcare-berhad%3ABFKvVl-7mGHszwGlxIQtWZJKSzQosnP4e2BrkW4tAs4?crop=fp&fp=0.5%2C0.5&fp_zoom=1&height=480&width=854",
            "https://www.njabulomedical.co.za/images/services/full-medical-examination.jpg"
        ],
        "specialists": [
            "Dr. Prasad Bagare — MBBS, MD General Medicine",
            "Dr. Ganesh Rajguru — MBBS, DTCD, IOCCM (Respiratory Medicine)"
        ]
    },
    {
        "name": "Obstetrics & Gynecology",
        "desc": "The Obstetrics & Gynecology department provides comprehensive women’s healthcare including pregnancy care, infertility treatment, reproductive health services, and gynecological surgeries.",
        "images": [
            "https://www.manipalhospitals.com/sarjapurroad/uploads/specialities/content_photo/gynecologist-in-bangalore.jpg",
            "https://venuswomenshospital.com/uploads/image/blog/untitled-design-2024-04-02t140904-775.png",
            "https://www.hopkinsmedicine.org/-/media/gynecology-obstetrics/images/birthing-services-images/nurses-and-woman-in-labor-640x440.jpg"
        ],
        "specialists": [
            "Dr. Amey Chugh — MBBS, MS OB-GYN, IVF Specialist",
            "Dr. Pritam — MBBS, DGO, DNB",
            "Dr. Pragati Mhaske — MBBS, DGO"
        ]
    },
    {
        "name": "Pediatrics",
        "desc": "The Pediatrics department focuses on the health and development of infants, children, and adolescents, offering vaccinations, growth monitoring, and treatment for childhood illnesses.",
        "images": [
            "https://images.peopleimages.com/picture/202208/2498927-doctor-child-and-mouth-of-a-black-man-helping-little-girl-in-checkup-or-consultation-at-a-hospital.-medical-male-expert-or-pediatrician-examining-kid-for-throat-infection-illness-or-sore-in-clinic-fit_400_400.jpg",
            "https://www.dhatrihealthcare.com/assets/sitemap-images/child-vaccination-in-whitefield.webp",
            "https://www.thechildrenshospitalmumbai.com/images/breadcrumb.png"
        ],
        "specialists": [
            "Dr. Swati Vispute — MBBS, DCH, Neonatologist",
            "Dr. Adity Thorat — MBBS, MD"
        ]
    },
    {
        "name": "Orthopedics",
        "desc": "The Orthopedics department specializes in the treatment of bone, joint, and spine disorders including fractures, arthritis, sports injuries, and joint replacement procedures.",
        "images": [
            "https://my.clevelandclinic.org/-/scassets/images/org/care-pages/orthopaedic/knee-pain-feature.jpg",
            "https://shreyadityahospital.com/uploads/article/article_image_1744026975.png",
            "https://bizimages.withfloats.com/actual/655f02c4616521d071a5a973.jpg"
        ],
        "specialists": [
            "Dr. Javed Shaikh — MBBS, DNB, MCH Arthroscopy"
        ]
    },
    {
        "name": "ENT (Ear Nose Throat)",
        "desc": "The ENT department treats disorders related to the ear, nose, throat, and sinuses, including hearing loss, sinus infections, throat problems, and voice disorders.",
        "images": [
            "https://www.hiranandanihospital.org/public/uploads/blogs/1762864775.jpg",
            "https://www.hopkinsmedicine.org/-/media/images/health/2_-treatment/otolaryngology-_ent/woman-getting-her-nose-examined-with-nasal-endoscopy-teaser.jpg",
            "https://st4.depositphotos.com/1006542/40240/i/1600/depositphotos_402402396-stock-photo-female-ent-doctor-patient-office.jpg"
        ],
        "specialists": [
            "Dr. Paresh Chavan — MBBS, MS ENT",
            "Dr. Chirag Shah — MBBS, MS ENT",
            "Dr. Sunil Pawar — MBBS, MS ENT"
        ]
    },
    {
        "name": "Cosmetology",
        "desc": "The Cosmetology department offers advanced aesthetic treatments including skin rejuvenation, acne treatment, hair restoration, and cosmetic dermatology procedures.",
        "images": [
            "https://www.drniveditadadu.com/nivedita-admin/uploads/Cosmetic-Dermatology-Treatments-Offered.jpg",
            "https://content.jdmagicbox.com/v2/comp/hubli/y5/0836px836.x836.190921182255.e2y5/catalogue/dr-netras-laser-skin-clinic-airport-road-hubli-hubli-beauty-clinics-7c84jmaq3g.jpg",
            "https://citc.co.in/asset_data/photo/blog_photo_1746188974_44708926882_1746188974.jpg"
        ],
        "specialists": [
            "Dr. Barkha Kukreja — MBBS, MS, PDCC Cosmetology, Trichology & Obesity Management",
            "Dr. Varsha Kukreja — MBBS, MS, PDCC Cosmetology, Trichology & Obesity Management"
        ]
    },
    {
        "name": "Plastic Surgery",
        "desc": "The Plastic Surgery department performs reconstructive and cosmetic surgeries to restore function and improve appearance after injury, congenital defects, or aesthetic concerns.",
        "images": [
            "https://bmchrc.org/speciality/66752a467a9fePlastic-%26-Reconstructive-Surgery.webp",
            "https://jamesleeplasticsurgery.com/assets/img/blog/wizseller59-3.png",
            "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/News/general-health/031717_plastictrend_THUMB_LARGE.jpg?h=1528&w=1155"
        ],
        "specialists": [
            "Dr. Dipak Patil — MBBS, MS, MCH Plastic Surgery & Reconstructive Surgery",
            "Dr. Suraj Singh Chauhan — MBBS, MS, MCH Plastic Surgery & Reconstructive Surgery"
        ]
    },
    {
        "name": "Gastroenterology",
        "desc": "The Gastroenterology department specializes in diagnosing and treating digestive system disorders involving the stomach, liver, pancreas, intestines, and gallbladder.",
        "images": [
            "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Advanced%2BCentre%2Bfor%2BUpper%2BGI%2BEndoscopy%2Bat%2BPACE%2BHospitals-%2BHyderabad-%2BTelangana-%2BIndia-640w.jpg",
            "https://my.clevelandclinic.org/-/scassets/Images/org/health/articles/4949-colonoscopy",
            "https://www.drpiyushranjan.com/img/ser/gastro.jpg"
        ],
        "specialists": [
            "Dr. Prasad Bhate — MBBS, MD, PGDGM, DM Gastro",
            "Dr. Yogesh Bade — MBBS, DNB (Medicine), DNB (Gastro)"
        ]
    },
    {
        "name": "Oncology",
        "desc": "The Oncology department provides specialized care for cancer diagnosis, treatment, and management through advanced oncology services and multidisciplinary care.",
        "images": [
            "https://www.medicaim.com/uploads/5d7e50d0-5a46-11e8-8fc5-bf61b50ce761/consultationenoncologie.jpg",
            "https://birunihospital.com/media/2025/7/373/radio-oncologie.jpg",
            "https://content.jdmagicbox.com/comp/varanasi/e7/0542px542.x542.220110124600.x3e7/catalogue/advance-cancer-care-dr-anuj-singh-and-dr-anushree-chaturvedi-sunderpur-varanasi-oncologists-usywpc8fv1.jpg"
        ],
        "specialists": [
            "Dr. Gaurav Jaswal — MBBS, MD Radiation Oncology"
        ]
    }
]

specialties_html = '''
    <!--===== SPECIALTIES AREA STARTS =======-->
    <div class="service-all-details-area sp1 pt-0">
        <div class="container">
            <div class="heading4 text-center m-auto" style="max-width: 800px;">
                <h5 class="vl-section-subtitle aos-init aos-animate" data-aos="fade-up" data-aos-duration="800">Medical Departments <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none"><path d="M0.667969 4.00033H11.049M8.00137 7.33366L11.3346 4.00033L8.0013 0.666992" stroke="#02015A" stroke-width="1.5"></path></svg></h5>
                <div class="space24"></div>
                <h2 class="vl-section-title" data-aos="fade-up" data-aos-duration="1000">Our Medical Specialties & Expert Doctors</h2>
                <div class="space24"></div>
                <p data-aos="fade-up" data-aos-duration="1100" style="font-size: 17px; color: #494A4A;">Medicool Hospital offers a wide range of medical departments with experienced doctors and specialists dedicated to providing high-quality treatment.</p>
            </div>
            <div class="space60"></div>
'''

for idx, spec in enumerate(specialties_data):
    if idx % 2 == 0:
        order_img = 'order-1 order-lg-1'
        order_txt = 'order-2 order-lg-2 padding-left'
    else:
        order_img = 'order-1 order-lg-2'
        order_txt = 'order-2 order-lg-1 padding-right'
    
    slider_id = f"spec-slider-{idx}"
    img_list = ''
    for img_url in spec["images"]:
        img_list += f'<li class="splide__slide"><img src="{img_url}" alt="{spec["name"]}" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius: 20px;"></li>'
    
    spec_list = ''
    for s in spec["specialists"]:
        spec_list += f'<li style="margin-bottom: 12px; font-size: 16px; color: #31353D; display: flex; align-items: start;"><i class="fa-solid fa-user-doctor" style="color: var(--ztc-text-text-12); margin-top: 4px; margin-right: 12px;"></i> <span>{s}</span></li>'

    specialties_html += f'''
            <div class="row align-items-center mb-5 pb-4 border-bottom" data-aos="fade-up" data-aos-duration="800">
                <div class="col-lg-6 {order_img} mb-4 mb-lg-0">
                    <div class="splide {slider_id} overflow-hidden shadow" style="border-radius: 20px;">
                        <div class="splide__track">
                            <ul class="splide__list">
                                {img_list}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 {order_txt}">
                    <div class="heading4">
                        <h3 style="font-size: 32px; font-weight: 700; color: var(--ztc-text-text-11); margin-bottom: 20px;">{spec["name"]}</h3>
                        <p style="font-size: 17px; line-height: 1.8; color: #494A4A; margin-bottom: 30px;">{spec["desc"]}</p>
                        <h5 style="font-size: 20px; font-weight: 600; color: #02015A; margin-bottom: 20px; background: none; box-shadow: none; padding: 0;">Specialist{ 's' if len(spec["specialists"])>1 else ''}:</h5>
                        <ul style="list-style: none; padding-left: 0;">
                            {spec_list}
                        </ul>
                    </div>
                </div>
            </div>
    '''

specialties_html += '''
        </div>
    </div>
    <!--===== SPECIALTIES AREA ENDS =======-->
'''

why_choose_us = '''
    <!--===== WHY CHOOSE US AREA STARTS =======-->
    <div class="service-benefites-section-area sp2" style="background-color: #f8f9fa;">
        <div class="container">
            <div class="row">
                <!-- Left Content: Why Choose Us -->
                <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right" data-aos-duration="800">
                    <div class="heading4 space-margin60">
                        <h5 class="vl-section-subtitle">Why Choose Us <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none"><path d="M0.667969 4.00033H11.049M8.00137 7.33366L11.3346 4.00033L8.0013 0.666992" stroke="#02015A" stroke-width="1.5"></path></svg></h5>
                        <div class="space24"></div>
                        <h2 class="vl-section-title">Why Choose Medicool Hospital</h2>
                        <div class="space24"></div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-user-md" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Experienced Doctors</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">Multi-specialty expert physicians directly managing care.</p>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-truck-medical" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Modern Facilities</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">Advanced diagnostic and surgical centers available.</p>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-heart-pulse" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Patient-Centered</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">A comforting, individualized approach to medical treatment.</p>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-laptop-medical" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Advanced Technology</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">Utilizing cutting-edge equipment for maximum precision.</p>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-hospital" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Comprehensive Healthcare</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">All medical facilities consolidated under one roof.</p>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-hand-holding-medical" style="color: var(--ztc-text-text-12); font-size: 20px; margin-right: 12px;"></i>
                                    <h4 style="font-size: 18px; font-weight: 600; color: var(--ztc-text-text-11); margin: 0;">Compassionate Care</h4>
                                </div>
                                <p style="font-size: 15px; color: #494A4A;">Ethical medical care built on trust and respect.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Content: Commitment to Patient Care -->
                <div class="col-lg-6" data-aos="fade-left" data-aos-duration="1000">
                    <div class="benefites-widget-boxarea mx-lg-4" style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: 100%;">
                        <h3 style="font-size: 28px; font-weight: 700; color: var(--ztc-text-text-11); margin-bottom: 24px;">Our Commitment to Patient Care</h3>
                        <p style="font-size: 17px; line-height: 1.8; color: #494A4A; margin-bottom: 20px;">At Medicool Hospital, we believe that quality healthcare is built on trust, expertise, and compassion. Our goal is not only to treat illness but also to promote preventive healthcare and long-term wellness for individuals and families.</p>
                        <p style="font-size: 17px; line-height: 1.8; color: #494A4A; margin-bottom: 30px;">We are committed to providing safe, reliable, and advanced healthcare services while ensuring every patient receives respectful and personalized medical care.</p>
                        
                        <div class="d-flex align-items-center p-3 rounded bg-light" style="border-left: 4px solid var(--ztc-text-text-12);">
                            <div class="flex-shrink-0">
                                <i class="fa-solid fa-phone-volume" style="font-size: 32px; color: var(--ztc-text-text-11);"></i>
                            </div>
                            <div class="ms-3">
                                <h5 class="mb-1" style="font-size: 16px; color: #494A4A;">Need Medical Help?</h5>
                                <a href="tel:+919834889938" style="font-size: 20px; font-weight: 700; color: var(--ztc-text-text-12);">+91 98348 89938</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--===== WHY CHOOSE US AREA ENDS =======-->
'''

slider_js = ''
for idx in range(10):
    slider_js += f'''
        var specSlider{idx} = document.querySelector('.spec-slider-{idx}');
        if (specSlider{idx}) {{
            new Splide(specSlider{idx}, {{
                type: 'fade',
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                arrows: false,
                pagination: true,
            }}).mount();
        }}
'''

about_hero_js = '''
        var aboutHeroSlider = document.querySelector('.about-hero-slider');
        if (aboutHeroSlider) {
            new Splide(aboutHeroSlider, {
                type: 'fade',
                rewind: true,
                autoplay: true,
                interval: 2500,
                pauseOnHover: true,
                arrows: false,
                pagination: true,
            }).mount();
        }
'''

footer_parts = footer.split('</body>')
new_footer = footer_parts[0] + '''
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            ''' + about_hero_js + slider_js + '''
        });
    </script>
</body>
''' + footer_parts[1]


final_html = header + breadcrumb + welcome_section + mission_vision + specialties_html + why_choose_us + new_footer

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("about.html created successfully.")
