$htmlPath = "e:\medicool\index.html"
$content = Get-Content $htmlPath -Raw

# 1. Update the Heading
$oldHeadingRegex = '(?s)<div class="heading4 text-center space-margin60">.*?<\/div>\s*<\/div>'
$newHeading = @"
<div class="heading4 text-center space-margin60">
    <h5 class="vl-section-subtitle">Medicool Hospital<span> | </span> Departments <svg
            xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
            <path d="M0.667969 4.00033H11.049M8.00137 7.33366L11.3346 4.00033L8.0013 0.666992"
                stroke="#02015A" stroke-width="1.5"></path>
        </svg>
    </h5>
    <div class="space24"></div>

    <h2 class="vl-section-title" data-aos="fade-up" data-aos-duration="800"> Our Medical Departments & Specialities </h2>
</div>
</div>
"@
$content = [regex]::Replace($content, $oldHeadingRegex, $newHeading, 1) # Replace only first occurrence just in case

# 2. Rebuild the Services Slider
# The slider is between <div class="service4-slider-area owl-carousel owl-loaded owl-drag"> and the ending </div></div></div> (around line 1450)
# We will match from service4-slider-area to the next ending tag pattern.

$servicesRegex = '(?s)<div class="service4-slider-area owl-carousel[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!--===== SERVICE AREA ENDS =======-->'

$deptNames = @(
    "General Medicine", "General Surgery", "Paediatrics", "Gynaecology", 
    "Orthopaedics", "Gastroenterology", "Cardiology", "Respiratory Medicine", 
    "ENT", "Pain Management", "Physiotherapy", "Psychology"
)

$sliderHtml = "`n<div class=`"row`">`n<div class=`"col-lg-12`">`n<div class=`"service4-slider-area owl-carousel`">`n"

$imgIndex = 17
foreach ($dept in $deptNames) {
    if ($imgIndex -gt 21) { $imgIndex = 17 } # Loop placeholder images
    
    $itemHtml = @"
    <div class="service4-boxarea">
        <div class="content-area">
            <a href="service-single.html" class="title">$dept</a>
            <div class="space16"></div>
            <p>Comprehensive and expert care for $dept.</p>
            <div class="space24"></div>
            <a href="service-single.html" class="readmore">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99992 0.833008C4.04188 0.833008 0.833252 4.04163 0.833252 7.99967C0.833252 11.9577 4.04188 15.1663 7.99992 15.1663C11.958 15.1663 15.1666 11.9577 15.1666 7.99967C15.1666 4.04163 11.958 0.833008 7.99992 0.833008ZM7.33325 5.33301C7.06359 5.33301 6.82052 5.49543 6.71732 5.74455C6.61415 5.99367 6.67119 6.28042 6.86185 6.47108L7.72379 7.33301L5.52851 9.52827C5.26817 9.78861 5.26817 10.2107 5.52851 10.4711C5.78887 10.7314 6.21097 10.7314 6.47133 10.4711L8.66659 8.27581L9.52852 9.13774C9.71919 9.32841 10.0059 9.38547 10.2551 9.28227C10.5042 9.17907 10.6666 8.93601 10.6666 8.66634V5.99967C10.6666 5.63149 10.3681 5.33301 9.99992 5.33301H7.33325Z" fill="#4416FF"></path>
                </svg>
            </a>
        </div>
        <div class="img1 image-anime">
            <img loading="lazy" src="assets/img/all-images/service/service-img$imgIndex.png" alt="">
        </div>
    </div>
"@
    $sliderHtml += $itemHtml
    $imgIndex++
}

$sliderHtml += "`n</div></div></div></div><!--===== SERVICE AREA ENDS =======-->"

$content = [regex]::Replace($content, $servicesRegex, $sliderHtml)

Set-Content -Path $htmlPath -Value $content -Encoding UTF8
Write-Host "Services section updated."
