const fs = require('fs');

const text = fs.readFileSync('e:/medicool/index.html', 'utf8');

const startStr = '<div class="testimonial4-slider-area owl-carousel owl-loaded owl-drag">';
const endStr = '</div>\r\n            </div>\r\n            <div class="col-lg-12">'; // check LF/CRLF

const startIdx = text.indexOf(startStr);
const textAfterStart = text.slice(startIdx);
const endIdxLocal = textAfterStart.indexOf('</div>\n            </div>\n            <div class="col-lg-12">');
let endIdx = startIdx + endIdxLocal;

if (endIdxLocal === -1) {
    const endIdxLocal2 = textAfterStart.indexOf('</div>\r\n            </div>\r\n            <div class="col-lg-12">');
    endIdx = startIdx + endIdxLocal2;
}


if (startIdx !== -1 && endIdx !== -1) {
    const block = text.slice(startIdx, endIdx);
    
    // Find all <div class="testimonial4-boxarea">
    const boxStartStr = '<div class="testimonial4-boxarea">';
    let currentIdx = 0;
    const boxes = [];
    
    while(true) {
        const nextBoxStart = block.indexOf(boxStartStr, currentIdx);
        if (nextBoxStart === -1) break;
        
        // Find closing of box area before next box area or end of block
        const nxtnxt = block.indexOf(boxStartStr, nextBoxStart + 1);
        let chunk = nxtnxt !== -1 ? block.slice(nextBoxStart, nxtnxt) : block.slice(nextBoxStart);
        
        // Cut the chunk at its true closing div.
        // It should end before <div class="owl-item
        const owlItemStart = chunk.indexOf('<div class="owl-item');
        if (owlItemStart !== -1) {
            chunk = chunk.slice(0, owlItemStart);
        }
        
        // Remove trailing space/divs roughly. Let's just find the last </div> before we add it
        const lastDiv = chunk.lastIndexOf('</div>');
        if (lastDiv !== -1) {
            chunk = chunk.slice(0, lastDiv + 6);
        }
        boxes.push(chunk);
        
        currentIdx = nextBoxStart + 1;
    }
    
    // We know there are only 3 distinct boxes. Let's grab the 3 distinct ones (indices 5, 6, 7 are real in original). 
    // They seem to be sequentially: Devon, Courtney, Eleanor. Let's just take the 3 unique boxes.
    const uniqueBoxes = [];
    const seen = new Set();
    for (const b of boxes) {
        // strip whitespace for comparison
        const norm = b.replace(/\s+/g, '');
        if (!seen.has(norm)) {
            seen.add(norm);
            uniqueBoxes.push(b);
        }
    }
    
    console.log("Found unique boxes:", uniqueBoxes.length);
    
    let cleanHtml = '<div class="testimonial4-slider-area owl-carousel">\r\n';
    for (let box of uniqueBoxes.slice(0,3)) {
        // Just indent box properly (quick split and join)
        // Ensure proper indentation
        box = box.split('\n').map(line => '                    ' + line.trimStart()).join('\n');
        cleanHtml += '                <div class="item">\r\n';
        cleanHtml += box + '\r\n';
        cleanHtml += '                </div>\r\n';
    }
    cleanHtml += '            </div>\r\n';
    
    fs.writeFileSync('e:/medicool/index.html', text.slice(0, startIdx) + cleanHtml + text.slice(endIdx), 'utf8');
    console.log("Done replacing.");
} else {
    console.log("Could not find start/end.");
}
