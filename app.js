var http = require('http');
const cipherDecipher = require('./lib/cipherDecipher');
const userName = 'john mcclane';
const urlTest = 'www.yippykiya.com';
const url = require('url')

timeStamp = () => {
  return + new Date();
}

userOne = timeStamp() + '|' + userName + '|' + urlTest
let encryptedMessage = cipherDecipher.encrypt(userOne);

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}


var server = http.createServer(function (request, response) {
  var parsedURL = url.parse(request.url);
  // To Read a Cookie

  if (parsedURL.pathname === '/login' && request.method === 'GET') {
    response.writeHead(200, {
      'Set-Cookie': 'mycookie=' + encryptedMessage,
      'Content-Type': 'text/plain'
    });
    response.end('Hello World\n');
  }
  // To Write a Cookie
  if (parsedURL.pathname === '/verify' && request.method === 'GET') {
    var cookies = parseCookies(request);
    console.log(cookies.mycookie);
    let decryptedMessage = cipherDecipher.decrypt(cookies.mycookie)
    response.end('Hopefully this works: ' + decryptedMessage)
  }
}).listen(8000);

console.log('Server running at 8000');
