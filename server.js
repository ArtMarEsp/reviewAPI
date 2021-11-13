const http = require('http'); 
const app = require('./app')

const port = process.env.PORT || 3000; //Here we start the server at the port 3000

const server = http.createServer(app);

server.listen(port);