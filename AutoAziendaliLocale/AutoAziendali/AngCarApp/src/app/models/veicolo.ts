import { DatePipe } from '@angular/common';

export class Veicolo {
    constructor(public IdVeicolo: number, public Targa: string, public Marca: string,
                public Modello: string, public Versione: string, public Telaio: string,
                public Immatricolazione: Date, public Cilindrata: number, public CvVapore: number,
                public Kw: number, public CvFiscali: number, public Colore: string, public Formato: string,
                public Alimentazione: string, public NormativaEuro: string, public Provincia: string ) {

    }



    public isCilindrataValid(): boolean {
        return (
            this.Cilindrata != null &&
            !isNaN(this.Cilindrata) &&
            this.Cilindrata != undefined
        );
    }

    public isKwValid(): boolean {
        return (
            this.Kw != null &&
            !isNaN(this.Kw) &&
            this.Kw != undefined
        );
    }

    public static operationConfirm() : boolean {
        return window.confirm("Vuoi procedere con l'operazione?");
    }


}