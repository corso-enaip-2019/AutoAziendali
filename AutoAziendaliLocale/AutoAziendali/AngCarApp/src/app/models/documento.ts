import { DatePipe } from '@angular/common';

export class Documento {
    constructor(public IdDocumento: number, public Documento: any) {
        // Il "Documento" è un'immagine salvata come blob-binario (tipo T-SQL "image", deprecato) nel DB, in C# "byte[]".
    }
}