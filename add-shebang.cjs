const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dist', 'index.js');

let content = fs.readFileSync(filePath, 'utf8');
content = '#!/usr/bin/env node\n' + content;
fs.writeFileSync(filePath, content);
