const crypto = require('crypto');
require('dotenv').config()
let algorithm = 'aes-256-ctr'
let password = process.env.PASSWORD
const cipher = crypto.createCipher(algorithm, password);
const decipher = crypto.createDecipher(algorithm, password);

module.exports = {

  encrypt: (message) => {
    let crypted = cipher.update(message, 'utf8', 'hex');
    crypted += cipher.final('hex')
    console.log(crypted);
    return crypted;
  },

  decrypt: (message) => {
    let decrypted = decipher.update(message, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    return decrypted;
  }
};
