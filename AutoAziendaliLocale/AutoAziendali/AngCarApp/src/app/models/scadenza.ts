/* Definisce il "tipo" di scadenza («Scadenza» string col nome) e con quanti giorni di preavviso avvisare («GiorniPreavviso», int/number). */

import { DatePipe } from '@angular/common';

export class Scadenza {
    //confermaStr:string="Vuoi procedere con l'operazione?";

    constructor(public IdScadenza: number, public Scadenza: string, public GiorniPreavviso: number) { }

    public isGiorniPreavvisoMaggiore0() { return (this.GiorniPreavviso > 0); }
    public isGiorniPreavvisoUnNaN() { return isNaN(this.GiorniPreavviso); }

    public static operationConfirm(): boolean {
        return window.confirm("Vuoi procedere con l'operazione?");
    }


}