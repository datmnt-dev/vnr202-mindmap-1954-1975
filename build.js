const fs = require('fs');

const nodes = require('./nodes_data.json');
const template = fs.readFileSync('./template.html', 'utf8');

const output = template.replace('/* __NODES_PLACEHOLDER__ */', JSON.stringify(nodes, null, 2));

fs.writeFileSync('./index.html', output, 'utf8');
fs.writeFileSync('./mindmap_1954_1975.html', output, 'utf8');

console.log('Successfully built index.html and mindmap_1954_1975.html!');
console.log('Total characters written:', output.length);
