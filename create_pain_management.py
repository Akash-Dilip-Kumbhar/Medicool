import os
import glob
import re

workspace = r'e:\medicool'

def process_html_files():
    html_files = glob.glob(os.path.join(workspace, '*.html'))
    
    # 1. Update navigation in all files
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        # Navigation in Header (`<ul class="sub-menu">`)
        if '<li><a href="oncology.html">Oncology</a></li>' in content and 'pain-management.html' not in content:
            content = content.replace(
                '<li><a href="oncology.html">Oncology</a></li>',
                '<li><a href="oncology.html">Oncology</a></li>\n                                            <li><a href="pain-management.html">Pain Management</a></li>'
            )
            modified = True
            
        if '<li class="active"><a href="oncology.html">Oncology</a></li>' in content and 'pain-management.html' not in content:
            content = content.replace( # If oncology is active
                '<li class="active"><a href="oncology.html">Oncology</a></li>',
                '<li class="active"><a href="oncology.html">Oncology</a></li>\n                                            <li><a href="pain-management.html">Pain Management</a></li>'
            )
            modified = True
            
        # Navigation in Sidebar (`<div class="categories-area">`)
        if '<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>' in content and 'pain-management.html' not in content:
            content = content.replace(
                '<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>',
                '<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>\n                                <li><a href="pain-management.html">Pain Management <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>'
            )
            modified = True
            
        # Navigation in Footer (`<div class="footer-widget-area foot-padding2">`)
        # Wait, footer does not have all departments. It has:
        # General Surgery, Plastic Surgery, Gastroenterology, Oncology
        # Let's insert after Oncology
        if '<li><a href="oncology.html">Oncology</a></li>' in content and 'pain-management.html' not in content:
            content = content.replace(
                '<li><a href="oncology.html">Oncology</a></li>',
                '<li><a href="oncology.html">Oncology</a></li>\n                            <li><a href="pain-management.html">Pain Management</a></li>'
            )
            modified = True
            
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
    print("Navigations updated site-wide.")
                
def create_pain_management():
    base_file = os.path.join(workspace, 'plastic-surgery.html')
    new_file = os.path.join(workspace, 'pain-management.html')
    
    with open(base_file, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # --- 1. Top Section Replacements ---
    text = text.replace("<title>Plastic Surgery | Medicool Hospital</title>", "<title>Pain Management | Medicool Hospital</title>")
    text = text.replace("<h2>Plastic Surgery Care</h2>", "<h2>Pain Management Patient Care</h2>")
    text = text.replace("<span>Plastic Surgery</span>", "<span>Pain Management</span>")
    
    # --- 2. Switch Active Sidebar Link ---
    # Find active plastic surgery
    text = text.replace('<li><a class="active" href="plastic-surgery.html">Plastic Surgery <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>')
    text = text.replace('<li><a class="active" href="plastic-surgery.html">Plastic Surgery <span><i class="fa-solid fa-angle-right"></i></span></a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery <span><i class="fa-solid fa-angle-right"></i></span></a></li>')
                        
    # Make Pain Management active
    text = text.replace('<li><a href="pain-management.html">Pain Management <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>',
                        '<li><a class="active" href="pain-management.html">Pain Management <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>')
    
    # Main menu active
    text = text.replace('<li class="active"><a href="plastic-surgery.html">Plastic Surgery</a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery</a></li>')
    text = text.replace('<li><a href="pain-management.html">Pain Management</a></li>',
                        '<li class="active"><a href="pain-management.html">Pain Management</a></li>')
    
    # --- 3. Main Content Text Replacements ---
    text = text.replace('assets/img/all-images/service/indian_plastic_surgery.png', 'https://images.squarespace-cdn.com/content/v1/5c828369d7819e1d4056a49f/1616747851710-LOF3J5160CGJSP992MJJ/Role%2Bof%2Ba%2BPain%2BManagement%2BSpecialist%2Bto%2BAlleviate%2BPain.jpg')
    text = text.replace("<h2>Plastic Surgery Patient Care</h2>", "<h2>Pain Management Patient Care</h2>")
    
    text = re.sub(
        r'<p class="text-justify">At Medicool Hospital, the Plastic Surgery department.*?natural-looking results.</p>',
        '<p class="text-justify">At Medicool Hospital, our Pain Management department focuses on diagnosing and treating chronic pain conditions that affect daily life. Using advanced techniques and multidisciplinary care, we aim to reduce pain, improve mobility, and enhance quality of life for patients suffering from persistent pain disorders.</p>',
        text,
        flags=re.DOTALL
    )

    text = re.sub(
        r'<p class="text-justify">We provide personalized treatment plans to address congenital.*?safety.</p>\s*<div class="space16"></div>',
        '',
        text,
        flags=re.DOTALL
    )
    
    # Remove second doc
    text = re.sub(
        r'<div class="doctor-minimal-card specialist-sidebar-card">\s*<div class="doc-img specialist-doc-img">\s*<img src="assets/img/all-images/avataar/doc-me-2.png" alt="Dr. Pankaj Waghmare">\s*</div>\s*<div class="doc-info specialist-doc-info">\s*<h4>Dr. Pankaj Waghmare</h4>\s*<p>MBBS, DNB</p>\s*</div>\s*</div>',
        '',
        text
    )

    # Change first doc photo
    text = text.replace('src="assets/img/all-images/avataar/doc-me-2.png" alt="Dr. Ameya Raskar"', 'src="https://sa1s3optim.patientpop.com/assets/images/provider/photos/2797542.jpeg" alt="Pain Management Specialist"')
    
    # Info Blocks
    old_blocks = r'''<div class="m-list-area">.*?<div class="space48"></div>'''
    
    new_blocks = """<div class="m-list-area">
                            <h3>Compassionate Pain Relief Care</h3>
                            <div class="space24"></div>

                            <div class="info-block mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        Specialized Pain Experts</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">Our team treats back pain, nerve pain, joint pain, and cancer-related pain.</p>
                            </div>

                            <div class="info-block mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        Minimally Invasive Procedures</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">Advanced techniques such as nerve blocks and targeted injections provide relief.</p>
                            </div>

                            <div class="info-block mb-0">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        Comprehensive Pain Management</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">Treatment plans may include medications, physiotherapy, and interventional procedures.</p>
                            </div>
                        </div>
                        <div class="space48"></div>"""
    
    text = re.sub(old_blocks, new_blocks, text, flags=re.DOTALL)
    
    # Image List area
    old_img_list = r'''<div>\s*<h3>How Our Plastic Surgery Services Work</h3>.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>'''
    
    new_img_list = """<div>
                            <h3>How Our Pain Management Services Work</h3>
                            <div class="space18"></div>
                            <div class="img-list-area">
                                <div class="row align-items-center">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="space32"></div>
                                        <div class="img1">
                                            <img src="https://images.squarespace-cdn.com/content/v1/5c828369d7819e1d4056a49f/1696676623038-EWJBONLMWN249URKF2K5/pain%2Bclinic%2Boklahoma%2Bcity%2C%2BInfographic.jpg"
                                                alt="Pain Management Services">
                                        </div>
                                        <div class="space30 d-md-none d-block"></div>
                                    </div>

                                    <div class="col-lg-6 col-md-6">
                                        <ul class="img-list">
                                            <li><img src="assets/img/icons/check9.svg" alt=""> Pain Assessment</li>
                                            <li><img src="assets/img/icons/check9.svg" alt=""> Diagnostic Evaluation</li>
                                            <li><img src="assets/img/icons/check9.svg" alt=""> Treatment Plan</li>
                                            <li><img src="assets/img/icons/check9.svg" alt=""> Pain Relief Procedures</li>
                                            <li><img src="assets/img/icons/check9.svg" alt=""> Follow-up Care</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>"""
    
    text = re.sub(old_img_list, new_img_list, text, flags=re.DOTALL)

    # Accordion
    old_accordion = r'''<h3>Your Guide To Plastic Surgery Questions</h3>.*?</div>\s*</div>\s*</div>\s*</div>'''
    
    new_accordion = """<h3>Your Guide To Pain Care Questions</h3>
                        <div class="space18"></div>
                        <div class="space8"></div>
                        <div class="accordion-area">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                            What conditions are treated in pain management?
                                        </button>
                                    </h4>
                                    <div id="collapseOne" class="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>Chronic back pain, arthritis pain, nerve pain, and post-surgical pain.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                            Are pain treatments safe?
                                        </button>
                                    </h4>
                                    <div id="collapseTwo" class="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>Yes, all procedures are performed by trained specialists using safe techniques.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                            Can chronic pain be cured?
                                        </button>
                                    </h4>
                                    <div id="collapseThree" class="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>Many conditions can be effectively managed to improve quality of life.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>"""
                        
    text = re.sub(old_accordion, new_accordion, text, flags=re.DOTALL)

    with open(new_file, 'w', encoding='utf-8') as f:
        f.write(text)
        
    print("pain-management.html created successfully.")

if __name__ == '__main__':
    process_html_files()
    create_pain_management()
