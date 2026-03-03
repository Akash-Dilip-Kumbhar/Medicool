$htmlPath = "e:\medicool\index.html"
$content = Get-Content $htmlPath -Raw

# Match the entire service-benefites-section-area container
$regex = '(?s)<div class="service-benefites-section-area sp2">.*?<!--===== SERVICE AREA ENDS =======-->'

$newHtml = @"
<div class="service-benefites-section-area sp2">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 m-auto">
                <div class="heading4 text-center space-margin60">
                    <h5 class="vl-section-subtitle">Why Choose Us <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none"><path d="M0.667969 4.00033H11.049M8.00137 7.33366L11.3346 4.00033L8.0013 0.666992" stroke="#02015A" stroke-width="1.5"></path></svg></h5>
                    <div class="space24"></div>
                    <h2 class="vl-section-title" data-aos="fade-up" data-aos-duration="800"> Why Choose Medicool Hospital? </h2>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="benefites-box">
                    <div class="star">
                        <svg xmlns="http://www.w3.org/2000/svg" class="keyframe5" width="75" height="80" viewBox="0 0 75 80" fill="none">
                            <path d="M74.0861 24.6187L68.8392 15.3742C68.5025 14.7708 68.0485 14.2406 67.5038 13.8147C66.9591 13.3888 66.3346 13.0757 65.6671 12.8939C64.9995 12.7121 64.3023 12.6651 63.6164 12.7559C62.9304 12.8466 62.2696 13.0731 61.6725 13.4222L48.0834 21.5111V5.33333C48.0957 3.9317 47.55 2.58254 46.5661 1.58243C45.5822 0.582328 44.2407 0.0131427 42.8366 0H31.9582C30.554 0.0131427 29.2125 0.582328 28.2286 1.58243C27.2448 2.58254 26.699 3.9317 26.7113 5.33333V21.5111L13.1116 13.4293C12.5145 13.0803 11.8536 12.8537 11.1677 12.763C10.4817 12.6723 9.78452 12.7192 9.11698 12.901C8.44944 13.0828 7.82499 13.3959 7.28027 13.8218C6.73555 14.2477 6.28152 14.7779 5.94482 15.3813L0.708663 24.6187C0.010396 25.8424 -0.17966 27.2905 0.179256 28.6524C0.538172 30.0143 1.41748 31.1817 2.62859 31.904L16.4136 40L2.62146 48.096C1.41156 48.8195 0.533753 49.9873 0.176194 51.3492C-0.181366 52.711 0.0097817 54.1585 0.708663 55.3813L5.95194 64.6258C6.28864 65.2292 6.74267 65.7594 7.28739 66.1853C7.83212 66.6112 8.45656 66.9243 9.1241 67.1061C9.79165 67.2879 10.4888 67.3348 11.1748 67.2441C11.8607 67.1534 12.5216 66.9268 13.1187 66.5778L26.7113 58.4889V74.6667C26.7207 76.0783 27.2866 77.4294 28.2866 78.4276C29.2866 79.4258 30.6402 79.9907 32.0544 80H42.7404C44.1546 79.9907 45.5082 79.4258 46.5082 78.4276C47.5081 77.4294 48.0741 76.0783 48.0834 74.6667V58.4889L61.6832 66.5849C62.2802 66.934 62.9411 67.1605 63.6271 67.2512C64.313 67.342 65.0102 67.295 65.6778 67.1132C66.3453 66.9314 66.9698 66.6184 67.5145 66.1924C68.0592 65.7665 68.5132 65.2363 68.8499 64.6329L74.0968 55.3884C74.795 54.1647 74.9851 52.7166 74.6262 51.3547C74.2673 49.9928 73.388 48.8254 72.1768 48.1031L58.3847 40L72.1768 31.904C73.3861 31.1799 74.2632 30.0118 74.6201 28.65C74.977 27.2882 74.7853 25.8411 74.0861 24.6187Z" fill="#ECE8FF"></path>
                        </svg>
                    </div>
                    <div class="row">
                        <!-- Item 1: Compassionate Care -->
                        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-duration="900">
                            <div class="benefites-widget-boxarea">
                                <div class="icons">
                                    <img loading="lazy" src="assets/img/icons/hero-icon3.svg" alt="Compassionate Care Icon">
                                </div>
                                <div class="content-area">
                                    <h3 class="title">Compassionate Care</h3>
                                    <div class="space16"></div>
                                    <p>Our team provides empathetic, patient-centered care, ensuring you feel comfortable and supported.</p>
                                    <div class="space28"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Item 2: Experienced Professionals -->
                        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-duration="1000">
                            <div class="benefites-widget-boxarea">
                                <div class="icons">
                                    <img loading="lazy" src="assets/img/icons/hero-icon4.svg" alt="Experienced Professionals Icon">
                                </div>
                                <div class="content-area">
                                    <h3 class="title">Experienced Professionals</h3>
                                    <div class="space16"></div>
                                    <p>Our hospital is staffed by highly qualified doctors, nurses, and specialists dedicated to your well-being.</p>
                                    <div class="space28"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Item 3: Patient-Centered Approach -->
                        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-duration="1100">
                            <div class="benefites-widget-boxarea">
                                <div class="icons">
                                    <img loading="lazy" src="assets/img/icons/hero-icon2.svg" alt="Patient-Centered Approach Icon">
                                </div>
                                <div class="content-area">
                                    <h3 class="title">Patient-Centered Approach</h3>
                                    <div class="space16"></div>
                                    <p>We focus on your specific needs, involving you in every step of your health and recovery journey.</p>
                                    <div class="space28"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Item 4: Advanced Technology -->
                        <div class="col-lg-6 col-md-6" data-aos="fade-up" data-aos-duration="1200">
                            <div class="benefites-widget-boxarea">
                                <div class="icons">
                                    <img loading="lazy" src="assets/img/icons/hero-icon1.svg" alt="Advanced Technology Icon">
                                </div>
                                <div class="content-area">
                                    <h3 class="title">Advanced Technology</h3>
                                    <div class="space16"></div>
                                    <p>We utilize the latest medical equipment and treatments to provide the most effective care possible.</p>
                                    <div class="space28"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--===== SERVICE AREA ENDS =======-->
"@

$content = [regex]::Replace($content, $regex, $newHtml)
Set-Content -Path $htmlPath -Value $content -Encoding UTF8
Write-Host "Why Choose Us updated."
