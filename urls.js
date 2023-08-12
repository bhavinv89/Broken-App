const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const fileName = process.argv[2];

try {
  const data = fs.readFileSync(fileName, 'utf8');
  const urls = data.trim().split('\n');

  urls.forEach(async (urlStr) => {
    try {
      const parsedUrl = url.parse(urlStr);
      const protocol = parsedUrl.protocol === 'https:' ? https : http;

      const response = await new Promise((resolve, reject) => {
        const req = protocol.get(parsedUrl.href, (res) => {
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('end', () => {
            resolve(body);
          });
        });

        req.on('error', (error) => {
          reject(error);
        });
      });

      const outputFileName = parsedUrl.hostname;
      fs.writeFileSync(outputFileName, response, 'utf8');
      console.log(`Wrote to ${outputFileName}`);
    } catch (error) {
      console.error(`Error for ${urlStr}: ${error.message}`);
    }
  });
} catch (error) {
  console.error(`Error reading ${fileName}: ${error.message}`);
}
