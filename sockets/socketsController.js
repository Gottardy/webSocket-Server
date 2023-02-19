

const socketsController = (socketClient) => {
    console.log('Socket Cliente Conectado:',socketClient.id);
    
    socketClient.on('disconnect',() => {
        console.log('Socket Cliente Desconectado:',socketClient.id);
    });
    
    // Manejo de evento de recepcion de Mensajes / Payload del cliente
    socketClient.on('notificar_mensaje', (payload, callback) =>{
        const id = socketClient.id
        callback(id);
        // Notificancion del servidor a todos los clientes utilizando broadcast
        socketClient.broadcast.emit('notificar_mensaje',payload);


    });
}

module.exports ={
    socketsController
}