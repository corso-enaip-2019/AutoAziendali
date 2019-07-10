import { Component } from '@angular/core';

import { Documento } from '../../models/documento';

import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'docviewer',
  templateUrl: './docviewer.component.html',
  styleUrls: ['./docviewer.component.css']
})
export class DocviewerComponent {
  public listDocumenti:Array<Documento>;
  public doc2display: Documento;

  constructor(private data: DataService) {
    this.doc2display = null;
    this.doc2display=new Documento(-1,'docnonesistentecreatoalvolopernonfarschiattaretutto1');
    this.listDocumenti=null;

    var self = this;
    data.getListDocumenti(function (items: Array<Documento>): void {
      self.listDocumenti = items;

      //commentato via perché è listDocumenti undefined
      // console.log("Documenti caricati dal docviewer:");
      // console.log(this.listDocumenti);
      
      //this.doc2display=this.listDocumenti[0];  
      // this.doc2display.IdDocumento=-1;
      // this.doc2display.Documento='docnonesistentecreatoalvolopernonfarschiattaretutto1';
      })
    
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