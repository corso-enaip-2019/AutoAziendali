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
this.documentoDaMostrare=this.getDocumentoById(this.inIdDocumentoDaMostrare);
  }

  //"Documento" è un'immagine di tipo T-SQL "image", in C# "byte[]".
  getDocumentoById(id: number): Documento {
    if (this.listDocumenti != null && this.listDocumenti != null) {
      var documentoById = this.listDocumenti.find(d => d.IdDocumento == id);
      return documentoById;
    }
    else {
      return new Documento(-1, 'docnonesistentecreatoalvolopernonfarschiattaretutto1');
    }
  }
}