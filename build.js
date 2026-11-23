

const fs = require('fs');

const appEnv = process.env.APP_ENV || 'development';
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>My Multi-Stage Docker Project</title>
</head>
<body>
    <h1>Hello from a Multi-Stage Docker Build!</h1>
<p>Environment: ${appEnv}</p>
    <p>I am learning how Docker separates building an application from running it.</p>
</body>
</html>
`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

console.log('Website built successfully!');
