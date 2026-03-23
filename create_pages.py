import os
import glob
import re

workspace = r'e:\medicool'

def generate_page(base_file, output_file, config):
    with open(base_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # --- 1. Top Section Replacements ---
    text = text.replace("<title>Plastic Surgery | Medicool Hospital</title>", f"<title>{config['title']} | Medicool Hospital</title>")
    text = text.replace("<h2>Plastic Surgery Care</h2>", f"<h2>{config['hero_title']}</h2>")
    text = text.replace("<span>Plastic Surgery</span>", f"<span>{config['title']}</span>")

    # --- 2. Switch Active Sidebar Link ---
    # Find active plastic surgery and make it inactive
    text = text.replace('<li><a class="active" href="plastic-surgery.html">Plastic Surgery <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery <span><i\n                                                class="fa-solid fa-angle-right"></i></span></a></li>')
    text = text.replace('<li><a class="active" href="plastic-surgery.html">Plastic Surgery <span><i class="fa-solid fa-angle-right"></i></span></a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery <span><i class="fa-solid fa-angle-right"></i></span></a></li>')
                        
    # Main menu active
    text = text.replace('<li class="active"><a href="plastic-surgery.html">Plastic Surgery</a></li>',
                        '<li><a href="plastic-surgery.html">Plastic Surgery</a></li>')

    # Wait, the new link isn't in the template yet, it gets added later by process_html_files.
    # Therefore we don't need to inject its "active" state here. We'll handle setting 'active' in navbar injection.
    # Actually wait, `process_html_files` won't know which one is the current file to make it active in the sidebar.
    # Let's inject a placeholder or just inject the new nav item here for the sidebar? 
    # NO! `process_html_files` will inject the generic links to ALL files.
    # Let's just make sure "active" class gets added properly in `process_html_files`.

    # --- 3. Main Content Text Replacements ---
    text = text.replace('assets/img/all-images/service/indian_plastic_surgery.png', config['main_image'])
    text = text.replace("<h2>Plastic Surgery Patient Care</h2>", f"<h2>{config['main_title']}</h2>")

    text = re.sub(
        r'<p class="text-justify">At Medicool Hospital, the Plastic Surgery department.*?natural-looking results.</p>',
        f'<p class="text-justify">{config["main_paragraph"]}</p>',
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
    text = text.replace('src="assets/img/all-images/avataar/doc-me-2.png" alt="Dr. Ameya Raskar"', f'src="{config["doctor_img"]}" alt="{config["title"]} Specialist"')
    text = text.replace('Dr. Ameya Raskar', f"{config['title']} Specialist")

    # Info Blocks
    old_blocks = r'''<div class="m-list-area">.*?<div class="space48"></div>'''
    
    new_blocks = f"""<div class="m-list-area">
                            <h3>{config['info_heading']}</h3>
                            <div class="space24"></div>

                            <div class="info-block mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        {config['info1_title']}</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">{config['info1_desc']}</p>
                            </div>

                            <div class="info-block mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        {config['info2_title']}</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">{config['info2_desc']}</p>
                            </div>

                            <div class="info-block mb-0">
                                <div class="d-flex align-items-center mb-2">
                                    <img src="assets/img/icons/check10.svg" alt=""
                                        style="width: 20px; margin-right: 10px;">
                                    <h5 style="margin: 0; font-weight: 700; color: #02015A; font-size: 18px;">
                                        {config['info3_title']}</h5>
                                </div>
                                <p style="margin-left: 30px; margin-bottom: 0; color: #4b5563;">{config['info3_desc']}</p>
                            </div>
                        </div>
                        <div class="space48"></div>"""
    
    text = re.sub(old_blocks, new_blocks, text, flags=re.DOTALL)

    # Image List area
    old_img_list = r'''<div>\s*<h3>How Our Plastic Surgery Services Work</h3>.*?</div>\s*</div>\s*</div>\s*</div>'''
    
    list_items_html = "\n".join([f'                                            <li><img src="assets/img/icons/check9.svg" alt=""> {item}</li>' for item in config['process_steps']])

    new_img_list = f"""<div>
                            <h3>{config['process_title']}</h3>
                            <div class="space18"></div>
                            <div class="img-list-area">
                                <div class="row align-items-center">
                                    <div class="col-lg-6 col-md-6">
                                        <div class="space32"></div>
                                        <div class="img1">
                                            <img src="{config['process_img']}"
                                                alt="{config['title']} Services">
                                        </div>
                                        <div class="space30 d-md-none d-block"></div>
                                    </div>

                                    <div class="col-lg-6 col-md-6">
                                        <ul class="img-list">
{list_items_html}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>"""
    
    text = re.sub(old_img_list, new_img_list, text, flags=re.DOTALL)

    # Accordion
    old_accordion = r'''<h3>Your Guide To Plastic Surgery Questions</h3>.*?</div>\s*</div>\s*</div>\s*</div>'''
    
    new_accordion = f"""<h3>{config['faq_title']}</h3>
                        <div class="space18"></div>
                        <div class="space8"></div>
                        <div class="accordion-area">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                            {config['faq1_q']}
                                        </button>
                                    </h4>
                                    <div id="collapseOne" class="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>{config['faq1_a']}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="false" aria-controls="collapseTwo">
                                            {config['faq2_q']}
                                        </button>
                                    </h4>
                                    <div id="collapseTwo" class="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>{config['faq2_a']}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h4 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                            aria-expanded="false" aria-controls="collapseThree">
                                            {config['faq3_q']}
                                        </button>
                                    </h4>
                                    <div id="collapseThree" class="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <p>{config['faq3_a']}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>"""
                        
    text = re.sub(old_accordion, new_accordion, text, flags=re.DOTALL)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"Created {output_file}")


def process_html_files():
    html_files = glob.glob(os.path.join(workspace, '*.html'))
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        filename = os.path.basename(file_path)
            
        modified = False
        
        # Determine if current file should have an 'active' class for the new links
        pain_active = 'class="active"' if filename == 'pain-management.html' else ''
        physio_active = 'class="active"' if filename == 'physiotherapy.html' else ''
        
        new_header_links = f'<li><a href="oncology.html">Oncology</a></li>\n                                            <li {pain_active}><a href="pain-management.html">Pain Management</a></li>\n                                            <li {physio_active}><a href="physiotherapy.html">Physiotherapy</a></li>'
        
        # Navigation in Header (`<ul class="sub-menu">`)
        if '<li><a href="pain-management.html">Pain Management</a></li>' not in content:
            if '<li><a href="oncology.html">Oncology</a></li>' in content:
                content = content.replace('<li><a href="oncology.html">Oncology</a></li>', new_header_links)
                modified = True
            elif '<li class="active"><a href="oncology.html">Oncology</a></li>' in content:
                content = content.replace('<li class="active"><a href="oncology.html">Oncology</a></li>', new_header_links.replace('<li><a href="oncology.html">Oncology</a></li>', '<li class="active"><a href="oncology.html">Oncology</a></li>'))
                modified = True
                
        # Navigation in Sidebar (`<div class="categories-area">`)
        pain_sidebar_active = 'class="active" ' if filename == 'pain-management.html' else ''
        physio_sidebar_active = 'class="active" ' if filename == 'physiotherapy.html' else ''
        
        new_sidebar_links = f'''<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>
                                <li><a {pain_sidebar_active}href="pain-management.html">Pain Management <span><i class="fa-solid fa-angle-right"></i></span></a></li>
                                <li><a {physio_sidebar_active}href="physiotherapy.html">Physiotherapy <span><i class="fa-solid fa-angle-right"></i></span></a></li>'''
                                
        if '<li><a href="pain-management.html">Pain Management' not in content:
            if '<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>' in content:
                content = content.replace('<li><a href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>', new_sidebar_links)
                modified = True
            elif '<li><a class="active" href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>' in content:
                content = content.replace('<li><a class="active" href="oncology.html">Oncology <span><i class="fa-solid fa-angle-right"></i></span></a></li>', new_sidebar_links.replace('<li><a href="oncology.html">Oncology', '<li><a class="active" href="oncology.html">Oncology'))
                modified = True
                
        # Navigation in Footer
        new_footer_links = f'''<li><a href="oncology.html">Oncology</a></li>
                            <li><a href="pain-management.html">Pain Management</a></li>
                            <li><a href="physiotherapy.html">Physiotherapy</a></li>'''
        
        if '<li><a href="pain-management.html">Pain Management</a></li>' not in content:
            if '<li><a href="oncology.html">Oncology</a></li>' in content:
                # Need to be careful not to replace the header ones again!
                # Actually, Footer format:
                # <li><a href="oncology.html">Oncology</a></li>
                # Wait, Python replace replaces ALL occurrences.
                # So if we already replaced Header, Header does NOT contain `<li><a href="oncology.html">Oncology</a></li>` (it might have been replaced by new_header_links).
                # Actually, new_header_links DOES contain `<li><a href="oncology.html">Oncology</a></li>`. 
                # This is tricky. Let's just do a manual string replace specifically looking at the footer section or we can just replace all remaining.
                pass
                
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

    print("Navigations updated site-wide.")

def process_html_files_safe():
    html_files = glob.glob(os.path.join(workspace, '*.html'))
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        filename = os.path.basename(file_path)
        
        pain_active = 'class="active" ' if filename == 'pain-management.html' else ''
        physio_active = 'class="active" ' if filename == 'physiotherapy.html' else ''
        
        # 1. Update Header Nav
        if 'pain-management.html' not in content:
            # Look for Oncology link in sub-menu
            content = re.sub(
                r'(<li(?: class="active")?><a href="oncology\.html">Oncology</a></li>)',
                r'\1\n                                            <li><a ' + pain_active + r'href="pain-management.html">Pain Management</a></li>\n                                            <li><a ' + physio_active + r'href="physiotherapy.html">Physiotherapy</a></li>',
                content
            )
            
            # Look for Oncology link in sidebar categories
            content = re.sub(
                r'(<li><a(?: class="active")? href="oncology\.html">Oncology <span><i\s*class="fa-solid fa-angle-right"></i></span></a></li>)',
                r'\1\n                                <li><a ' + pain_active + r'href="pain-management.html">Pain Management <span><i class="fa-solid fa-angle-right"></i></span></a></li>\n                                <li><a ' + physio_active + r'href="physiotherapy.html">Physiotherapy <span><i class="fa-solid fa-angle-right"></i></span></a></li>',
                content
            )
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
    print("Navigations updated site-wide.")

def main():
    base_file = os.path.join(workspace, 'plastic-surgery.html')
    
    pain_config = {
        'title': 'Pain Management',
        'hero_title': 'Pain Management Patient Care',
        'main_title': 'Pain Management Patient Care',
        'main_image': 'https://images.squarespace-cdn.com/content/v1/5c828369d7819e1d4056a49f/1616747851710-LOF3J5160CGJSP992MJJ/Role%2Bof%2Ba%2BPain%2BManagement%2BSpecialist%2Bto%2BAlleviate%2BPain.jpg',
        'doctor_img': 'https://sa1s3optim.patientpop.com/assets/images/provider/photos/2797542.jpeg',
        'process_img': 'https://images.squarespace-cdn.com/content/v1/5c828369d7819e1d4056a49f/1696676623038-EWJBONLMWN249URKF2K5/pain%2Bclinic%2Boklahoma%2Bcity%2C%2BInfographic.jpg',
        'main_paragraph': 'At Medicool Hospital, our Pain Management department focuses on diagnosing and treating chronic pain conditions that affect daily life. Using advanced techniques and multidisciplinary care, we aim to reduce pain, improve mobility, and enhance quality of life for patients suffering from persistent pain disorders.',
        
        'info_heading': 'Compassionate Pain Relief Care',
        'info1_title': 'Specialized Pain Experts',
        'info1_desc': 'Our team treats back pain, nerve pain, joint pain, and cancer-related pain.',
        'info2_title': 'Minimally Invasive Procedures',
        'info2_desc': 'Advanced techniques such as nerve blocks and targeted injections provide relief.',
        'info3_title': 'Comprehensive Pain Management',
        'info3_desc': 'Treatment plans may include medications, physiotherapy, and interventional procedures.',

        'process_title': 'How Our Pain Management Services Work',
        'process_steps': ['Pain Assessment', 'Diagnostic Evaluation', 'Treatment Plan', 'Pain Relief Procedures', 'Follow-up Care'],
        
        'faq_title': 'Your Guide To Pain Care Questions',
        'faq1_q': 'What conditions are treated in pain management?',
        'faq1_a': 'Chronic back pain, arthritis pain, nerve pain, and post-surgical pain.',
        'faq2_q': 'Are pain treatments safe?',
        'faq2_a': 'Yes, all procedures are performed by trained specialists using safe techniques.',
        'faq3_q': 'Can chronic pain be cured?',
        'faq3_a': 'Many conditions can be effectively managed to improve quality of life.',
    }
    
    physio_config = {
        'title': 'Physiotherapy',
        'hero_title': 'Physiotherapy Patient Care',
        'main_title': 'Physiotherapy Patient Care',
        'main_image': 'https://www.physio.co.uk/images/exercise-programmes/exercise-programmes1.jpg',
        'doctor_img': 'https://storage.googleapis.com/treatspace-prod-media/pracimg/u-2202/shutterstock_1177541623.jpeg',
        'process_img': 'https://www.rapidcarephysiotherapy.com/assets/images/blog/Physiotherapy-Sports-Injury-Recovery.webp',
        'main_paragraph': 'At Medicool Hospital, the Physiotherapy department helps patients regain mobility, strength, and independence after injury, surgery, or illness. Our rehabilitation specialists design personalized therapy programs that improve physical function and reduce pain.',
        
        'info_heading': 'Rehabilitation Focused Care',
        'info1_title': 'Expert Physiotherapists',
        'info1_desc': 'Our trained therapists guide patients through safe rehabilitation exercises.',
        'info2_title': 'Modern Therapy Techniques',
        'info2_desc': 'Electrotherapy, ultrasound therapy, and manual therapy enhance recovery.',
        'info3_title': 'Patient-Centered Rehabilitation',
        'info3_desc': 'Treatment programs are customized according to each patient’s condition.',

        'process_title': 'How Our Physiotherapy Services Work',
        'process_steps': ['Physiotherapy Evaluation', 'Customized Treatment Plan', 'Therapy Sessions', 'Progress Monitoring'],
        
        'faq_title': 'Your Guide To Physiotherapy Questions',
        'faq1_q': 'Who needs physiotherapy?',
        'faq1_a': 'Patients recovering from surgery, injury, stroke, or chronic pain.',
        'faq2_q': 'How many therapy sessions are needed?',
        'faq2_a': 'The number of sessions depends on the condition and recovery progress.',
        'faq3_q': 'Is physiotherapy painful?',
        'faq3_a': 'Therapy is designed to reduce pain and improve movement gradually.',
    }
    
    generate_page(base_file, os.path.join(workspace, 'pain-management.html'), pain_config)
    generate_page(base_file, os.path.join(workspace, 'physiotherapy.html'), physio_config)
    
    process_html_files_safe()

if __name__ == '__main__':
    main()
