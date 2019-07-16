import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

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
  public srcImgDocInBase64: string;

  constructor(private data: DataService) {

    this.documentoDaMostrare = null;
    this.documentoDaMostrare = new Documento(-1, 'docnonesistentecreatoalvolopernonfarschiattaretutto1');
    this.listDocumenti = null;


    var self = this;
    data.getListDocumenti(function (items: Array<Documento>): void {
      self.listDocumenti = items;
    });

    console.log(self.listDocumenti);
    self.srcImgDocInBase64 = `data:image/png;base64,${self.documentoDaMostrare.Documento}`;
    // this.srcImgDocInBase64=`data:image/png;base64,${btoa(this.documentoDaMostrare.Documento)}`;
    console.log(this.srcImgDocInBase64);
  }

  //"Documento" è un'immagine di tipo T-SQL "image", in C# "byte[]".
  getDocumentoById(inIdDocumentoDaMostrare: number): Documento {
    console.log('this.listDocumenti');
    console.log(this.listDocumenti);
    console.log('in id doc');
    console.log(inIdDocumentoDaMostrare);
    if (this.listDocumenti != null && this.listDocumenti != undefined) {
      var documentoById = this.listDocumenti.find(d => d.IdDocumento == inIdDocumentoDaMostrare);
      return documentoById;
    }
    else {
      return new Documento(-1, 'docnonesistentecreatoalvolopernonfarschiattaretutto2');
    }
  }
}