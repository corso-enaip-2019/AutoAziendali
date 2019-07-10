import { Component, OnInit } from '@angular/core';
import { Utilizzo } from 'src/app/models/utilizzo';
import { DataService } from 'src/app/services/data-service';
import { Veicolo } from 'src/app/models/Veicolo';
import { Anagrafica } from 'src/app/models/anagrafica';
import { Commessa } from 'src/app/models/commessa';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css']
})
export class UtilizationComponent {

  public page: string;
  public isEditing: boolean;
  public isButtonDisabled: boolean;
  public newUtilizzo: Utilizzo;
  public utilizzoDetail: Utilizzo;
  public listAnagrafiche: Array<Anagrafica>;
  public listUtilizzi: Array<Utilizzo>;
  public listVeicoli: Array<Veicolo>;
  public listCommesse: Array<Commessa>;

  constructor(private data: DataService) {
    var self = this;
    data.getListUtilizzi(function (items: Array<Utilizzo>): void {
      self.listUtilizzi = items;
    });
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items;
    });
    data.getListAnagrafiche(function (items: Array<Anagrafica>): void {
      self.listAnagrafiche = items;
    });
    data.getListCommesse(function (items: Array<Commessa>): void {
      self.listCommesse = items;
    });
    this.isButtonDisabled = false;
    this.page = 'listaUtilizzo';
    this.isEditing = false;
    this.utilizzoDetail = null;
    this.listVeicoli = null;
    this.listAnagrafiche = null;
    this.listCommesse = null;
  }

  displayedColumns: string[] = ['Targa', 'Dipendente', 'DataInizio', 'Destinazione','Dettaglio', 'Elimina'];
  dataSource = new MatTableDataSource(this.listUtilizzi);

  getTargaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Targa;
    }
    else {
      return ""
    }
  }

  getNameById(id: number): string {
    if (this.listAnagrafiche != null && this.listAnagrafiche != undefined) {
      var anagraficaById = this.listAnagrafiche.find(v => v.IdAnagrafica == id);
      return (anagraficaById.Cognome + "  " + anagraficaById.Nome)
    }
    else {
      return ""
    }
  }

  getCommessaById(id: number): string {
    if (this.listCommesse != null && this.listCommesse != undefined) {
      var commessaById = this.listCommesse.find(c => c.IdCommessa == id);
      return commessaById.Commessa
    }
    else {
      return ""
    }
  }

  deleteUtilizzo(id: number) {
    if (Utilizzo.operationConfirm()) {
      this.data.deleteUtilizzo(id)
        .subscribe(
          data => {
            let index = this.listUtilizzi.findIndex(a => a.IdVeicolo == id);
            this.listUtilizzi.splice(index, 1);
          },
          error => {

          }
        );
    }
  }

  editUtilizzo(utilizzo: Utilizzo): void {
    this.data.editUtilizzo(utilizzo)
      .subscribe(
        data => {
          this.isEditing = false;
          this.utilizzoDetail = utilizzo;
        },
        error => {

        }
      );
  }
  addUtilizzo(utilizzo: Utilizzo): void {
    this.data.addUtilizzo(utilizzo)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listaUtilizzo';
        },
        error => {
        }
      );
  };

  addUtilizzoView() {
    this.page = 'aggiungi';
    this.newUtilizzo = new Utilizzo(1,1,new Date(),new Date(),null,null,"",null,null,"","");
  };

  detailItemView(utilizzo: Utilizzo): void {
    this.page = "dettaglio";
    this.utilizzoDetail = utilizzo;
  }

  beginEdit() {
    if (this.isEditing == false) {
      this.isEditing = true;
    }

    else {
      this.isEditing = false;
    }
  }

  returnList() {
    this.page = "listaUtilizzo";
  }
}
