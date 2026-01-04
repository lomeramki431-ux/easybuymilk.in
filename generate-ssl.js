const fs = require("fs");
const path = require("path");
const forge = require("node-forge");

async function generateSSL() {
  const sslDir = path.join(__dirname, "ssl");
  fs.mkdirSync(sslDir, { recursive: true });

  const keys = forge.pki.rsa.generateKeyPair(2048);

  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [{ name: "commonName", value: "localhost" }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const certPem = forge.pki.certificateToPem(cert);

  fs.writeFileSync(path.join(sslDir, "key.pem"), privateKeyPem);
  fs.writeFileSync(path.join(sslDir, "cert.pem"), certPem);

  console.log("✅ SSL certificates created successfully");
}

generateSSL().catch(console.error);
