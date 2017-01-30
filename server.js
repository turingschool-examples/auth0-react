let express = require('express');
let app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json());

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET){
  throw 'Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file'
}

app.locals.messages = [{
  username: 'Joe Schmoe',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt et arcu ac faucibus. Proin felis nulla, vestibulum eu risus eu, mollis gravida massa. Suspendisse mattis consequat metus ut condimentum. Phasellus tempus, orci a tempor pulvinar, justo magna aliquam arcu, vitae faucibus nulla elit eget ligula. Donec eu accumsan sapien, sed faucibus arcu. Nullam lobortis, massa et letius suscipit, urna est pretium odio, vitae mollis turpis metus ut nunc.'
}, {
  username: 'Jane Doe',
  content: 'Curabitur luctus aliquet urna ut mollis. Ut vitae augue massa. Nullam iaculis turpis magna, sit amet convallis odio tincidunt et. Nam quis laoreet odio, sit amet pellentesque justo. Nunc iaculis eleifend congue. Praesent pretium maximus ullamcorper. Praesent eget tellus id erat bibendum tincidunt. In elit sem, blandit sed tincidunt sit amet, viverra vitae felis. Maecenas ac dui sem. Sed fermentum libero erat, non blandit justo finibus vitae.'
}];

app.get('/api/v1/messages', (request, response) => {
  response.send({ messages: app.locals.messages });
});

app.post('/api/v1/messages', (request, response) => {
  const { message } = request.body;

  message.id = message.id || Date.now();
  app.locals.messages.push(message);
  response.json({ message });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
