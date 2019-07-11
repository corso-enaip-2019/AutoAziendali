import { DatePipe } from '@angular/common';

export class StatoVeicolo
 {
    constructor(public IdStatoVeicolo: number, public IdVeicolo: number, public IdProprieta: number, public IdLibretto: number,
        public IdTelepass: number, public IdViacard: number, public Data: Date, public IdStato: number,
        public ChilometriRental: number, public IdSocieta: number, public IdBusinessUnit: number,
        public IdModalita: number, public IdAnagrafica: string,public Note: string){

    }

}
