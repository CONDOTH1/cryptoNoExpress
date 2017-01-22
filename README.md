#Crypto without express or https

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -node

```

```
openssl rsa -in key.pem -pubout -out pubkey.pem

```
