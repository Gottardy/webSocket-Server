console.log('Nuevo Ticket HTML');

// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnEnviarNuevoTicket = document.querySelector('#btnEnviarNuevoTicket')

// Socket ciente que usa la app web
const socketClient = io();

// Listeners de cambios en el cliente conectado
socketClient.on('connect', ()=>{
    // console.log('cliente conectado del servidor');
    btnEnviarNuevoTicket.disabled = false;
})
// Listeners de cambios en el cliente desconectado
socketClient.on('disconnect', ()=>{
    // console.log('cliente desconectado del servidor');
    btnEnviarNuevoTicket.disabled = true;
})

// Listener de cambios en el server para todos los clientes
socketClient.on('notificar_mensaje', (payload)=>{
    console.log('Notificacion Recibida del server a todos -', payload)
})

// Listener del ultimo ticket de la lista y mostrarlo
socketClient.on('ultimo_ticket', (ultimo)=>{
    // console.log(payload)
    (ultimo>0)? lblNuevoTicket.innerHTML='Ticket '+ultimo : lblNuevoTicket.innerHTML='Ticket 0';
})

// listener del boton enviar mensaje
btnEnviarNuevoTicket.addEventListener('click', ()=>{
    
    socketClient.emit('notificar_mensaje', null, (ticket)=>{
        console.log('Notificcion del server para el nuevo',ticket);
        lblNuevoTicket.innerHTML=ticket;
    });
 
});