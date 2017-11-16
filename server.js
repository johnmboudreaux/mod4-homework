const http = require("http");
const url = require('url');
const server = http.createServer();
const port = 3000

server.listen(port, (err) => {
  if(err) {
    console.log('something went wrong', err);
  } else {
  console.log('The HTTP server is listening at Port 3000.');
  }
});

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

const getAllMessages = (response) => {
  response.writeHead(200, {'Content-Type': 'json'});
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (newMessage, response) => {
  messages = [...messages, newMessage];
  response.writeHead(201, {'Content-Type': 'json'});
  response.write(JSON.stringify(messages));
  response.end();
}
