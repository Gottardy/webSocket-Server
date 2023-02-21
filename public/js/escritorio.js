console.log('Escritorio HTML');

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location='index.html';
    throw new Error('El escritorio/cajero es obligtorio');
}

// Referencias del HTML
const lblEscritorio = document.querySelector('#lblEscritorio');
const lblPendientes = document.querySelector('#lblPendientes');
const btnAtenderTicket = document.querySelector('#btnAtenderTicket');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

// Socket ciente que usa la app web
const socketClient = io();

// Listeners de cambios en el cliente conectado
socketClient.on('connect', ()=>{
    // console.log('cliente conectado del servidor');
    btnAtenderTicket.disabled = false;
})
// Listeners de cambios en el cliente desconectado
socketClient.on('disconnect', ()=>{
    // console.log('cliente desconectado del servidor');
    btnAtenderTicket.disabled = true;
})

// Listener de cambios en el server para todos los clientes
socketClient.on('notificar_mensaje', (payload)=>{
    console.log('Notificacion Recibida del server a todos -', payload)
})

// Listener del ultimo ticket de la lista y mostrarlo
socketClient.on('ultimo_ticket', (ultimo)=>{
    // console.log(payload)
    // (ultimo>0)? lblNuevoTicket.innerHTML='Ticket '+ultimo : lblNuevoTicket.innerHTML='Ticket 0';
})

// listener del boton enviar mensaje
btnAtenderTicket.addEventListener('click', ()=>{
    
    // socketClient.emit('notificar_mensaje', null, (ticket)=>{
    //     console.log('Notificcion del server para el nuevo',ticket);
    //     lblNuevoTicket.innerHTML=ticket;
    // });
    socketClient.emit('atender_ticket', {escritorio}, ({ok, msg, ticket})=>{
        if (!ok) {
            lblTicket.innerText='Nadie, no hay Tickets en espera';
            return divAlerta.style.display = '';
        }
        console.log(ticket)
        lblTicket.innerText='Ticket '+ticket.numero;
        
    });
 
});