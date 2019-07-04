import { DatePipe } from '@angular/common';

export class Utilizzo{
    constructor(public IdUtilizzo: number, public IdVeicolo: number,public DataInizio: Date,
         public DataFine: Date, public KmInizio: number, public KmFine: number,
         public Destinazione: string, public CostoCarburante: number, public CostoPedaggio: number,
         public IdAnagrafica: string, public IdCommessa: string){

    }
}