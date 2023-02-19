console.log('servidor corriendo');
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

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