const crypto = require('crypto');
require('dotenv').config()
let algorithm = 'aes-256-ctr'
let password = process.env.PASSWORD
// let password = new Buffer(process.env.PASSWORD, 'binary')
// const cipher = crypto.createCipher(algorithm, password);
// const decipher = crypto.createDecipher(algorithm, password);
const iv = '60iP0h6vJoEa'

module.exports = {

  encrypt: (message) => {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(message, 'utf8', 'hex');
    crypted += cipher.final('hex')
    console.log('this is crypto' + crypted);
    return crypted;
  },

  decrypt: (message) => {
    const decipher = crypto.createDecipher(algorithm, password);
    console.log('this is the message: ' + message);
    // console.log("This is the message just before dcryption" + message);
    let decrypted = decipher.update(message, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log("This is the decrypted message: " + decrypted);
    return decrypted;
  }


//
// encrypt: (message) => {
//
//   var encrypted = cipher.update(message, 'utf8', 'hex')
//   encrypted += cipher.final('hex');
//   var tag = cipher.getAuthTag();
//   console.log("this is the tag; " + tag);
//   return tag;
//   return {
//     content: encrypted,
//     tag: tag
//   };
// },
//
// decrypt: (message) => {
//   console.log("This is the message: " + message);
//   decipher.setAuthTag(message.tag);
//   var dec = decipher.update(encrypted.content, 'hex', 'utf8')
//   dec += decipher.final('utf8');
//   return dec;
// }

};
