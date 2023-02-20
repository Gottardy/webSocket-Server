const path = require('path');
const fs = require('fs');

// La clase Ticket es una clase simple que tiene dos propiedades: numero y escritorio, que se establecen en su constructor. Esta clase representa un ticket que puede ser emitido para un servicio.
class Ticket {
    constructor( numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

// La clase TicketControl es una clase que tiene varias propiedades, incluyendo ultimo, hoy, tickets, y ultimos4. Esta clase se encarga de controlar los tickets, como emitir nuevos tickets y atenderlos
class TicketControl {


    constructor(){
        this.ultimo=0;
        this.hoy= new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return{
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    // La función init() carga los datos del archivo en la instancia de TicketControl 
    init(){
        const {ultimo, hoy, tickets, ultimos4} = require('../db/data.json')
        // console.log(hoy === this.hoy)
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            // Es otro Dia
            this.saveDB();
        }
    }

    // la función saveDB() guarda los datos de la instancia en el archivo JSON
    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    // El método nextTicket() emite un nuevo ticket y lo agrega a la lista de tickets
    nextTicket(){
        this.ultimo+=1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.saveDB();
        return 'Ticket '+ticket.numero;
    }

    // El método attendTicket(escritorio) atiende el siguiente ticket en la lista, asignándole un número de escritorio y eliminándolo de la lista de tickets
    attendTicket(escritorio){
        if (this.tickets.length === 0) {
            return null
        }
        // Sacamos el primer registro de la cola de tickets que sera atendido
        const ticket =  this.tickets.shift();
        ticket.escritorio=escritorio;
        this.ultimos4.unshift(ticket);
        if(this.ultimos4 > 4){
            this.ultimos4.splice(-1,1);
        }

        this.saveDB();
        return ticket;
    }

}

module.exports = TicketControl;