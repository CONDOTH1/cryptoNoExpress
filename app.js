var http = require('http');
const cipherDecipher = require('./lib/cipherDecipher');
const userName = 'john doe';
const urlTest = 'www.example.com';
const url = require('url');
let verified = false;
let decryptedMessage = '';

timeStamp = () => {
  return + new Date();
}

userOne = timeStamp() + '|' + userName + '|' + urlTest
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

setCookie = (response, encryptedMessage) => {
  response.writeHead(200, {
    'Set-Cookie': 'mycookie=' + encryptedMessage,
    'Content-Type': 'text/plain'
  });
}

var server = http.createServer(function (request, response) {
  var parsedURL = url.parse(request.url);
  console.log(request.url);

  if (parsedURL.pathname === '/verify' && request.method === 'GET') {
    var cookies = parseCookies(request);
    if (cookies.mycookie === 'deleted') {
      // console.log("This is the token: " + cookies.mycookie);
      response.end('Token expired');
    } else {
      decryptedMessage = cipherDecipher.decrypt(cookies.mycookie);
    }
    // console.log("this is the decrypt message: " + decryptedMessage);
    if (decryptedMessage === userOne) {
      response.end('Hopefully this works: ' + decryptedMessage + '\n');
    } else {
      response.end('Not authorised');
    }
    // var cookies = parseCookies(request);
    // if (verified === false) {
    //   decryptedMessage = cipherDecipher.decrypt(cookies.mycookie)
    //   if (decryptedMessage === userOne) {
    //     verified = true;
    //     response.end('Hopefully this works: ' + decryptedMessage + '\n')
    //   } else {
    //     response.end('Not authorised')
    //   }
    // } else {
    //   response.end('Hopefully this works: ' + decryptedMessage + '\n')
    // }
  }

  if (parsedURL.pathname === '/token' && request.method === 'GET') {
    var cookies = parseCookies(request);
    // console.log('These are the cookies: ' + cookies.mycookie);
    // if (cookies.mycookie === 'authorised') {
      let encryptedMessage = cipherDecipher.encrypt(userOne);
      setCookie(response, encryptedMessage);
      response.end('You are logged in, with your token\n');
    // } else {
    //   response.end('Not authorised please log in properly\n');
    // }

  }

  if (parsedURL.pathname === '/authorise' && request.method === 'GET') {
    // let encryptedMessage = cipherDecipher.encrypt(userOne);
    setCookie(response, 'authorised');
    response.end('You now have an authorise cookie, please request a token with /token.\n');
  }

  if (parsedURL.pathname === '/revoke' && request.method === 'GET') {
    // console.log('Logout');
    setCookie(response, 'deleted')
    response.end('Logout successful\n');
  }

}).listen(8000);

console.log('Server running at 8000');
