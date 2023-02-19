console.log('servidor corriendo');
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviarMensaje = document.querySelector('#btnEnviarMensaje')

// Socket ciente que usa la app web
const socketClient = io();

// Listeners de cambios en el cliente conectado
socketClient.on('connect', ()=>{
    console.log('cliente conectado del servidor');
    lblOffline.style.display = 'none';
    lblOnline.style.display = ''; 
})
// Listeners de cambios en el cliente desconectado
socketClient.on('disconnect', ()=>{
    console.log('cliente desconectado del servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = ''; 
})

// listener del boton enviar mensaje
btnEnviarMensaje.addEventListener('click', ()=>{
    const msg = txtMensaje.value;
    // Emitir el evento al servidor por medio de un payload
    const payload = {
        msg,
        id: '1234',
        fecha: new Date().getTime()
    }
    socketClient.emit('enviar_mensaje', payload);
 
});