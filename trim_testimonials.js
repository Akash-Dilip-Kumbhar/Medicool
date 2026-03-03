const fs = require('fs');

let html = fs.readFileSync('e:/medicool/index.html', 'utf8');

const matchStart = html.indexOf('<div class="testimonial4-slider-area owl-carousel">');
if (matchStart !== -1) {
    const endStr = '</div>\r\n            </div>\r\n            <div class="col-lg-12">';
    const endStr2 = '</div>\n            </div>\n            <div class="col-lg-12">';

    let matchEnd = html.indexOf(endStr, matchStart);
    let usedLen = endStr.length;
    if (matchEnd === -1) {
        matchEnd = html.indexOf(endStr2, matchStart);
        usedLen = endStr2.length;
    }

    if (matchEnd !== -1) {
        let block = html.slice(matchStart, matchEnd);
        let items = block.split('<div class="item">');

        // items[0] is everything before the first item (should be `<div class="testimonial4-slider-area owl-carousel">\r\n                `)
        // items[1], items[2], items[3] are the first three items.
        // items[4] onwards are the duplicates.

        let newBlock = items[0];
        // We only want to keep 3 items.
        for (let i = 1; i <= 3 && i < items.length; i++) {
            newBlock += '<div class="item">' + items[i];
        }

        // We know that `items` split removed `<div class="item">`.
        // The last item we included (items[3]) already has the </div>\n at its end matching the item.
        // And `newBlock` closes all its `item` divs properly.
        // Wait, does items[3] contain the closing of the `testimonial4-slider-area`? No, because `block` ends at `</div>\r\n            </div>` which we didn't include inside `block`, wait, `matchEnd` is the START of `</div>\r\n            </div>`. So `block` doesn't include it. 
        // Thus, `newBlock` is just the container open + 3 items.

        html = html.substring(0, matchStart) + newBlock + html.substring(matchEnd);
        fs.writeFileSync('e:/medicool/index.html', html, 'utf8');
        console.log("Successfully trimmed down to 3 items.");
    } else {
        console.log("Could not find end of area.");
    }
} else {
    console.log("Could not find start of area.");
}
