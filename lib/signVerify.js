const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA256');
const verify = crypto.createVerify('RSA-SHA256');
var fs = require('fs');
var privateKey = fs.readFileSync('./certs/key.pem');
var publicKey = fs.readFileSync('./certs/key.pub');
var signatureEncryption = '';
var userOne = '';
var userName = 'john mcclane';
var url = 'www.yippykiya.com';

timeStamp = () => {
  return + new Date();
}

signEncryption = () => {
  userOne = timeStamp() + '|' + userName + '|' + url
  sign.update(userOne);
  signatureEncryption = sign.sign(privateKey, 'hex');
  console.log(signatureEncryption);
};

signEncryption();

verifySignEncryption = () => {
  verify.update(userOne);
  var signatureDecryption = verify.verify(publicKey, signatureEncryption, 'hex');
  console.log(signatureDecryption);
}

verifySignEncryption();
