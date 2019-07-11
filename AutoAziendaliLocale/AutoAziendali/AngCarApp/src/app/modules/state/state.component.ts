import { Component, OnInit } from '@angular/core';
import { Veicolo } from 'src/app/models/Veicolo';
import { DataService } from 'src/app/services/data-service';
import { MatTableDataSource } from '@angular/material';
import { StatoVeicolo } from 'src/app/models/StatoVeicolo';
import { Stato } from 'src/app/models/stato';
import { Anagrafica } from 'src/app/models/anagrafica';
import { BusinessUnit } from 'src/app/models/businessUnit';
import { Societa } from 'src/app/models/societa';
import { TelepassViacard } from 'src/app/models/telepassViacard';
import { Modalita } from 'src/app/models/modalita';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {

  public page: string;
  public isEditing: boolean;
  public listVeicoli: Array<Veicolo>;
  public listStatoVeicoli: Array<StatoVeicolo>;
  public isButtonDisabled: boolean;
  public listStati: Array<Stato>;
  public listStatoVeicoliById: Array<StatoVeicolo>;
  public listAnagrafiche: Array<Anagrafica>;
  public listBusinessUnit: Array<BusinessUnit>;
  public listSocieta: Array<Societa>;
  public listTelepassViacard: Array<TelepassViacard>;
  public listModalita: Array<Modalita>;
  public statoVeicoloDetail: StatoVeicolo;
  public targaDettaglio: string;
  public newStatoVeicolo: StatoVeicolo;
  public telepassViacardById: TelepassViacard;

  constructor(private data: DataService) {
    var self = this;
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items;
    });
    data.getListStatoVeicoli(function (items: Array<StatoVeicolo>): void {
      self.listStatoVeicoli = items;
    });

    this.isButtonDisabled = false;
    this.isEditing = false;
    this.page = 'listaVeicoli';
    this.listVeicoli = null;
    this.listStatoVeicoli = null;
    this.listStati = null;
    this.listStatoVeicoliById = [];
    this.targaDettaglio = "";
    this.listTelepassViacard = null;
    this.listModalita = null;
    this.telepassViacardById = null;
  }

  createListStatoVeicoliById(id: number): void {
    for (let statoVeicoli of this.listStatoVeicoli) {
      if (statoVeicoli.IdVeicolo == id) {
        this.listStatoVeicoliById.push(statoVeicoli);
      }
      else {
        continue;
      }
    }
  }

  getStatoById(id: number): string {
    if (this.listStati != null && this.listStati != undefined) {
      var statoById = this.listStati.find(l => l.IdStato == id)
      return statoById.Stato;
    }
    else {
      return ""
    }
  }

  getNameById(id: number): string {
    if (this.listAnagrafiche != null && this.listAnagrafiche != undefined) {
      var anagraficaById = this.listAnagrafiche.find(a => a.IdAnagrafica == id);
      return (anagraficaById.Cognome + "  " + anagraficaById.Nome)
    }
    else {
      return ""
    }
  }

  getTargaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Targa;
    }
    else {
      return ""
    }
  }

  getSocietaById(id: number): string {
    if (this.listSocieta != null && this.listSocieta != null) {
      var societaById = this.listSocieta.find(s => s.IdSocieta == id);
      return societaById.Societa1;
    }
    else {
      return ""
    }
  }

  getBusinessUnitById(id: number): string {
    if (this.listBusinessUnit != null && this.listBusinessUnit != null) {
      var businessUnitById = this.listBusinessUnit.find(b => b.IdBusinessUnit == id);
      return businessUnitById.BusinessUnit1;
    }
    else {
      return ""
    }
  }

  getModalitaById(id: number){
    if (this.listModalita != null && this.listModalita != null) {
      var modalitaById = this.listModalita.find(b => b.IdModalita == id);
      return modalitaById.Modalita1;
    }
    else {
      return ""
    }
  }

  getTelepassViacardById(id: number) : string{
    if (this.listTelepassViacard != null && this.listTelepassViacard != null) {
      this.telepassViacardById = this.listTelepassViacard.find(v => v.IdTelepassViacard == id);
      return this.telepassViacardById.TelepassViacard;
    }
    else {
      return ""
    }
  }

  
  getListAnagrafica(data: DataService) {
    var self = this;
    data.getListAnagrafiche(function (items: Array<Anagrafica>): void {
      self.listAnagrafiche = items;
    });
  }
  
  getListStati(data: DataService) {
    var self = this;
    data.getListStati(function (items: Array<Stato>): void {
      self.listStati = items;
    });
  }
  
  getListBusinessUnit(data: DataService) {
    var self = this;
    data.getListBusinessUnit(function (items: Array<BusinessUnit>): void {
      self.listBusinessUnit = items;
    });
  }

  getListTelepassViacard(data: DataService) {
    var self = this;
    data.getListTelepassViacard(function (items: Array<TelepassViacard>): void {
      self.listTelepassViacard = items;
    });
  }

  getListSocieta(data: DataService){
    var self = this;
    data.getListSocieta(function (items: Array<Societa>): void {
      self.listSocieta = items;
    });
  }

getListModalita(data: DataService){
  var self = this;
  data.getListModalita(function(items: Array<Modalita>): void{
self.listModalita = items;
  });
}

  detailItemView(statoVeicolo: StatoVeicolo, data: DataService): void {
    this.getListBusinessUnit(this.data);
    this.getListTelepassViacard(this.data);
    this.getListSocieta(this.data);
    this.getListModalita(this.data);
    this.page = "dettaglio";
    this.statoVeicoloDetail = statoVeicolo;
  }
  
  listStateView(veicolo: Veicolo): void {
    this.page = "listaStati";
    this.targaDettaglio = veicolo.Targa;
    this.getListAnagrafica(this.data);
    this.getListStati(this.data);
    this.createListStatoVeicoliById(veicolo.IdVeicolo);
  }

  editStatoVeicolo(statoVeicolo: StatoVeicolo): void {
    this.data.editStatoVeicolo(statoVeicolo)
      .subscribe(
        data => {
          this.isEditing = false;
          this.statoVeicoloDetail = statoVeicolo;
        },
        error => {

        }
      );
  }

  addStatoVeicolo(statoVeicolo: StatoVeicolo): void {
    this.data.addStatoVeicolo(statoVeicolo)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listaStati';
        },
        error => {
        }
      );
  };


  addStatoVeicoloView() {
    this.page = 'aggiungi';
    this.newStatoVeicolo = new StatoVeicolo(1,null,null,null,null,null, new Date(),null,0,null,null,null,"","");
  };

  beginEdit() {
    if (this.isEditing == false) {
      this.isEditing = true;
    }

    else {
      this.isEditing = false;
    }
  };
  
  returnListVeicoli() {
    this.page = "listaVeicoli";
  };

  returnList() {
    this.page = "listaStati";
  };
}
