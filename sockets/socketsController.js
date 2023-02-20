const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketsController = (socketClient) => {
    console.log('Socket Cliente Conectado:',socketClient.id);
    
    socketClient.emit('ultimo_ticket',ticketControl.ultimo);

    socketClient.on('disconnect',() => {
        console.log('Socket Cliente Desconectado:',socketClient.id);
    });
    
    // Manejo de evento de recepcion de Mensajes / Payload del cliente
    socketClient.on('notificar_mensaje', (payload, callback) =>{
        
        const siguienteTicket = ticketControl.nextTicket();
        callback(siguienteTicket);
        // Notificancion del servidor a todos los clientes utilizando broadcast
        socketClient.broadcast.emit('notificar_mensaje',payload);


    });
}

module.exports ={
    socketsController
}