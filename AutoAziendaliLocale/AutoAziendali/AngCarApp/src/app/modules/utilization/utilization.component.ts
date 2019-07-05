import { Component, OnInit } from '@angular/core';
import { Utilizzo } from 'src/app/models/utilizzo';
import { DataService } from 'src/app/services/data-service';
import { Veicolo } from 'src/app/models/Veicolo';
import { Anagrafica } from 'src/app/models/anagrafica';


@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css']
})
export class UtilizationComponent {

  public page: string;
  public isEditing: boolean;
  public listUtilizzo: Array<Utilizzo>;
  public isButtonDisabled: boolean;
  public listVeicoli: Array<Veicolo>;
  public listAnagrafica: Array<Anagrafica>;
  
  constructor(private data: DataService) {
    var self = this;
    data.getListUtilizzo(function (items: Array<Utilizzo>): void {
      self.listUtilizzo = items;
    });
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items;
    });
    data.getListAnagrafica(function (items: Array<Anagrafica>): void {
      self.listAnagrafica = items;
    });
    this.isButtonDisabled = false;
    this.page = 'listaUtilizzo';
   }

   getTargaById(id: number) : string{
     return this.listVeicoli.find(v => v.IdVeicolo == id).Targa;
   }

   getNameById(id: number) : string{
     var nome= this.listAnagrafica.find(v => v.IdAnagrafica == id).Nome;
     var cognome= this.listAnagrafica.find(v => v.IdAnagrafica == id).Cognome;
     return (cognome + "  " + nome);
   }

   deleteUtilizzo(id: number) {
    if (Utilizzo.operationConfirm()) {
      this.data.deleteUtilizzo(id)
        .subscribe(
          data => {
            let index = this.listUtilizzo.findIndex(a => a.IdVeicolo == id);
            this.listUtilizzo.splice(index, 1);

          },
          error => {

          }
        );
    }
  }
}
