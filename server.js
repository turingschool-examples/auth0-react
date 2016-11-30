var express = require('express');
var app = express();
var jwt = require('express-jwt');
require('dotenv').config();

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET){
  throw 'Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file'
}

app.locals.messages = [{
  user: 'Joe Schmoe',
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt et arcu ac faucibus. Proin felis nulla, vestibulum eu risus eu, mollis gravida massa. Suspendisse mattis consequat metus ut condimentum. Phasellus tempus, orci a tempor pulvinar, justo magna aliquam arcu, vitae faucibus nulla elit eget ligula. Donec eu accumsan sapien, sed faucibus arcu. Nullam lobortis, massa et varius suscipit, urna est pretium odio, vitae mollis turpis metus ut nunc.'
}, {
  user: 'Jane Doe',
  message: 'Curabitur luctus aliquet urna ut mollis. Ut vitae augue massa. Nullam iaculis turpis magna, sit amet convallis odio tincidunt et. Nam quis laoreet odio, sit amet pellentesque justo. Nunc iaculis eleifend congue. Praesent pretium maximus ullamcorper. Praesent eget tellus id erat bibendum tincidunt. In elit sem, blandit sed tincidunt sit amet, viverra vitae felis. Maecenas ac dui sem. Sed fermentum libero erat, non blandit justo finibus vitae.'
}];


var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

app.get('/api/v1/messages', (request, response) => {
  response.send({ messages: app.locals.messages });
});

app.get('/api/private', authenticate, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
