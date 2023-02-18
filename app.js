require('dotenv').config();
const Server = require('./models/server');
// Se intncia el servidor
const server = new Server();
server.listen();