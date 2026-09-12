const fs = require('fs');
const html = fs.readFileSync('legacy/menu.html', 'utf-8');

const items = [];
const regex = /<div class="card glass" data-name="([^"]+)" data-category="([^"]+)">[\s\S]*?<img src="([^"]+)">[\s\S]*?<h3>[^<]+<\/h3>\s*<p>([^<]+)<\/p>\s*<div class="price">₹(\d+)<\/div>/g;

let match;
while ((match = regex.exec(html)) !== null) {
  items.push({
    name: match[1],
    category: match[2],
    img: match[3],
    desc: match[4],
    price: parseInt(match[5])
  });
}

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/menu.js', `export const menuData = ${JSON.stringify(items, null, 2)};`);
console.log(`Extracted ${items.length} items`);
