import devcert from 'devcert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const certPath = path.join(__dirname, '..', '.cert');

async function generateCert() {
  try {
    if (!fs.existsSync(certPath)) {
      fs.mkdirSync(certPath);
    }

    const ssl = await devcert.certificateFor(['localhost', '127.0.0.1']);

    fs.writeFileSync(path.join(certPath, 'cert.pem'), ssl.cert);
    fs.writeFileSync(path.join(certPath, 'key.pem'), ssl.key);
    
    console.log('SSL certificates generated successfully!');
  } catch (err) {
    console.error('Error generating certificates:', err);
  }
}

generateCert();
