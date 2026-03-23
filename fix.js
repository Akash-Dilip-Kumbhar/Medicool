const fs = require('fs');
['pain-management.html', 'physiotherapy.html'].forEach(f => {
  let p = 'e:/medicool/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/class="active" href="plastic-surgery\.html"/g, 'href="plastic-surgery.html"');
  fs.writeFileSync(p, c);
  console.log('Fixed', f);
});
