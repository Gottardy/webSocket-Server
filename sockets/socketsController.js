const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketsController = (socketClient) => {
    // Cuando un nuevo cliente se conecta
    console.log('Socket Cliente Conectado:',socketClient.id);    
    socketClient.emit('ultimo_ticket',ticketControl.ultimo);
    socketClient.emit('estado_actual',ticketControl.ultimos4)
    socketClient.broadcast.emit('tickets_enCola',ticketControl.tickets.length);

    socketClient.on('disconnect',() => {
        console.log('Socket Cliente Desconectado:',socketClient.id);
    });
    
    // Manejo de evento de recepcion de Mensajes / Payload del cliente
    socketClient.on('notificar_mensaje', (payload, callback) =>{
        
        const siguienteTicket = ticketControl.nextTicket();
        callback(siguienteTicket);
        // Notificancion del servidor a todos los clientes utilizando broadcast
        socketClient.broadcast.emit('notificar_mensaje',siguienteTicket);
        socketClient.broadcast.emit('tickets_enCola',ticketControl.tickets.length);
    });

    

    socketClient.on('atender_ticket',({escritorio}, callback)=>{

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligtorio'
            });
        }
        
        const ticket = ticketControl.attendTicket(escritorio);
        
        // Notificar cambio de los ultimos4 a todos los clientes/escritorios
        socketClient.broadcast.emit('estado_actual',ticketControl.ultimos4)
        socketClient.broadcast.emit('tickets_enCola',ticketControl.tickets.length);
        const encola = ticketControl.tickets.length;
        
        if (!ticket||ticket===null) {
            callback({
                ok: false,
                msg: 'Ninguno, no hay Tickets en espera'
            });
        }else{
            callback({
                ok: true,
                msg:'Hay tickets por atender',
                ticket,
                encola
            });
        }
    })
}

module.exports ={
    socketsController
}