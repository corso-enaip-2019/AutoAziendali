import { DatePipe } from '@angular/common';

export class ManutenzioniVeicoli {
    constructor(public IdManutenzioneVeicoli: number, public Data: Date,public IdVeicolo: number,public IdCausaleManutenzione: number,public Note: string,public IdFornitore: number,public Costo: number,public IdDocumento: number) { }
}