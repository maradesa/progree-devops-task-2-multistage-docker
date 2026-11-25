const fs = require('fs');

const html = fs.readFileSync('dist/index.html', 'utf8');

if (!html.includes('Hello from a Multi-Stage Docker Build!')) {
    throw new Error('Website heading is missing!');
}

if (!html.includes('Environment: development')) {
    throw new Error('Environment information is missing!');
}

console.log('All application tests passed!');
