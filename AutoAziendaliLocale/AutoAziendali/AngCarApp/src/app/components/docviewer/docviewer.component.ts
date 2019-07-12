import { Component, Input } from '@angular/core';

import { Documento } from '../../models/documento';

import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'docviewer',
  templateUrl: './docviewer.component.html',
  styleUrls: ['./docviewer.component.css']
})
export class DocviewerComponent {
  @Input('idDoumentoDaMostrare') public inIdDocumentoDaMostrare: number;
  public listDocumenti: Array<Documento>;
  public documentoDaMostrare: Documento;

  constructor(private data: DataService) {

    this.documentoDaMostrare = null;
    this.documentoDaMostrare = new Documento(-1, 'docnonesistentecreatoalvolopernonfarschiattaretutto1');
    this.listDocumenti = null;

    var self = this;
    data.getListDocumenti(function (items: Array<Documento>): void { self.listDocumenti = items; });

    this.documentoDaMostrare.IdDocumento=this.inIdDocumentoDaMostrare;
    this.documentoDaMostrare.Documento=this.getDocumentoImgByIdDocumento(this.inIdDocumentoDaMostrare);
  }

  //"Documento" è un'immagine di tipo T-SQL "image", in C# "byte[]".
  //incompleto
  getDocumentoImgByIdDocumento(idDocumento): any {
    if (this.listDocumenti != null && this.listDocumenti != null) {
      var documentoById = this.listDocumenti.find(d => d.IdDocumento == idDocumento);
      return documentoById.Documento;
    }
    else {
      return 0;
    }
  }
}