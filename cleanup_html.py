from bs4 import BeautifulSoup
import re

with open('e:/medicool/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('<div class="testimonial4-slider-area')
end_idx = text.find('</div>\n            </div>\n            <div class="col-lg-12">', start_idx)

# I want to get the 3 distinct non-cloned items.
# Let's just find the inner contents of <div class="owl-item" ...> that are NOT cloned.

block = text[start_idx:end_idx]

soup = BeautifulSoup(block, 'html.parser')

items = soup.find_all('div', class_='owl-item')
real_items = [item for item in items if 'cloned' not in item.get('class', [])]

if len(real_items) >= 3:
    # Just take the first 3
    real_items = real_items[:3]

# Now construct the clean HTML container
clean_html = '<div class="testimonial4-slider-area owl-carousel">\n'
for item in real_items:
    # Get the div class="testimonial4-boxarea" inside it
    box = item.find('div', class_='testimonial4-boxarea')
    if box:
        # Indent it nicely
        box_str = str(box)
        box_indented = '\n'.join(['                    ' + line for line in box_str.split('\n')])
        clean_html += '                <div class="item">\n'
        clean_html += box_indented + '\n'
        clean_html += '                </div>\n'

clean_html += '                </div>\n            </div>'

with open('e:/medicool/index.html', 'w', encoding='utf-8') as f:
    f.write(text[:start_idx] + clean_html + text[end_idx + 25:])

print("Done replacing.")
