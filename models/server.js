const express = require('express');
const cors = require('cors');
const { socketsController } = require('../sockets/socketsController');
// const {createServer} = require('io')



class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Eventos de sockets
        this.sockets();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {}

    sockets(){
        // Manejo de eventos de conexion y desconexion por socket
        this.io.on('connection',socketsController);    
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;