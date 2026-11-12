const fs = require('fs');
const path = require('path');

const foldersToScan = ['./src'];
let allContent = '';

function scanDirectory(directory) {
    if (!fs.existsSync(directory)) return;
    
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } 
        // JSON nikal diya hai, sirf TS, TSX, aur Markdown files rahengi
        else if (
            fullPath.endsWith('.tsx') || 
            fullPath.endsWith('.ts') || 
            fullPath.endsWith('.md') || 
            fullPath.endsWith('.mdx')
        ) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            allContent += `\n\n=========================================\n`;
            allContent += `FILE: ${fullPath}\n`;
            allContent += `=========================================\n\n`;
            allContent += content;
        }
    }
}

foldersToScan.forEach(folder => scanDirectory(folder));

fs.writeFileSync('claude_audit.txt', allContent);
console.log('✅ Done! Content file generate ho gayi hai.');