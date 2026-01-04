# Easy Buy Milk – HTTPS Version

## Steps
1. Run: npm install
2. Create SSL:
   openssl req -x509 -newkey rsa:2048 -nodes -keyout ssl/key.pem -out ssl/cert.pem -days 365
3. Run server:
   node app.js
4. Open:
   https://localhost:3000/api
