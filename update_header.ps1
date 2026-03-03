$htmlPath = "e:\medicool\index.html"
$content = Get-Content $htmlPath -Raw

# 1. Replace the entire <nav class="vl-mobile-menu-active">...</nav> block (lines 78-360)
$newNav = @"
<nav class="vl-mobile-menu-active">
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="departments.html">Departments</a></li>
        <li><a href="doctor.html">Doctors</a></li>
        <li><a href="service.html">Services</a></li>
        <li><a href="contact.html">Appointment</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
"@

$patternNav = '(?s)<nav class="vl-mobile-menu-active">.*?<\/nav>'
$content = [regex]::Replace($content, $patternNav, $newNav)


# 2. Update Top Bar Contact and Location
# Currently: <div class="btn-area1"> ... </div>
# Contains: <a href="tel:(907)555-0101" class="phone"> ... </a>
# And: <a href="contact.html" class="vl-btn4">Schedule an Appointment ... </a>

$newBtnArea = @"
<div class="btn-area1" style="display: flex; align-items: center; gap: 15px; justify-content: flex-end;">
    <span class="location-text d-none d-xl-block" style="font-size: 14px; font-weight: 500; color: var(--ztc-text-text-2);">
        <i class="fa-solid fa-location-dot" style="color: var(--ztc-text-text-4); margin-right: 5px;"></i> Kalewadi, Pimpri-Chinchwad, Maharashtra
    </span>
    <a href="tel:09834889938" class="phone" style="font-size: 15px; font-weight: 600;">
        <i class="fa-solid fa-phone" style="color: var(--ztc-text-text-4); margin-right: 5px;"></i> Emergency: 098348 89938
    </a>
    <a href="contact.html" class="vl-btn4">Book Appointment 
        <span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM10 7C9.5955 7 9.2309 7.24364 9.0761 7.61732C8.92134 7.99099 9.0069 8.42111 9.2929 8.70711L10.5858 10L7.29289 13.2929C6.90237 13.6834 6.90237 14.3166 7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L12 11.4142L13.2929 12.7071C13.5789 12.9931 14.009 13.0787 14.3827 12.9239C14.7564 12.7691 15 12.4045 15 12V8C15 7.44772 14.5523 7 14 7H10Z" fill="white"></path>
        </svg></span>
    </a>
</div>
"@

$patternBtnArea = '(?s)<div class="btn-area1">\s*<a href="tel:\(907\)555-0101".*?<\/div>'
$content = [regex]::Replace($content, $patternBtnArea, $newBtnArea)

Set-Content -Path $htmlPath -Value $content -Encoding UTF8
Write-Host "Replaced Navbar and Top Bar."
