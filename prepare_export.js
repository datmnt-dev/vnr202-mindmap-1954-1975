const fs = require('fs');

const nodes = require('./nodes_data.json');
const template = fs.readFileSync('./template.html', 'utf8');

// Create export_print.html where print styling is applied directly for PDF generation
let printHtml = template.replace('/* __NODES_PLACEHOLDER__ */', JSON.stringify(nodes, null, 2));

// In export_print.html, make the canvas permanently positioned at (30, 30) with scale 1 for 100% full quality printing
printHtml = printHtml.replace(
  'requestAnimationFrame(() => {\n        renderConnections();\n        fitAllNodes(false);\n      });',
  'requestAnimationFrame(() => {\n        renderConnections();\n        // Canvas fixed for print\n        canvasEl.style.transform = "translate(20px, 20px) scale(1)";\n        canvasEl.style.transformOrigin = "0 0";\n      });'
);

// Add custom print CSS for exact 1-page dimensions
printHtml = printHtml.replace(
  '@media print {',
  `@page {
    size: 1650px 3250px;
    margin: 0;
  }
  @media print {`
);

fs.writeFileSync('export_print.html', printHtml, 'utf8');
console.log('Created export_print.html');
