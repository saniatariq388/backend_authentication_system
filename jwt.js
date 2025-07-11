const crypto = require('crypto');

// Generate a 32-byte random secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT Secret:', jwtSecret);
