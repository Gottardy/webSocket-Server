const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

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

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    
}

module.exports = TicketControl;