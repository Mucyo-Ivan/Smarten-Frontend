const svgToIco = require('svg-to-ico');
const path = require('path');

svgToIco(path.join(__dirname, 'public', 'favicon.svg'), path.join(__dirname, 'public', 'favicon.ico'), {
  sizes: [16, 32, 48],
  thickness: 4,
})
.then(() => {
  console.log('Successfully converted SVG to ICO');
})
.catch(err => {
  console.error('Error converting SVG to ICO:', err);
});
