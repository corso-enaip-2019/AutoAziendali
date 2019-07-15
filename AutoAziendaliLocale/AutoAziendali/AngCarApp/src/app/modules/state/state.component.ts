import { Component, OnInit, ViewChild } from '@angular/core';
import { Veicolo } from 'src/app/models/Veicolo';
import { DataService } from 'src/app/services/data-service';
import { MatTableDataSource, MatSort, Sort, MatRadioButton } from '@angular/material';
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

  public page = "";
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
  public dataSource: MatTableDataSource<Veicolo>;
  public dataSourceDue: MatTableDataSource<StatoVeicolo>;


  constructor(private data: DataService) {
    var self = this;
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items;
      self.dataSource = new MatTableDataSource(self.listVeicoli);

    });
    data.getListStatoVeicoli(function (items: Array<StatoVeicolo>): void {
      self.listStatoVeicoli = items;
    });
    data.getListTelepassViacard(function (items: Array<TelepassViacard>): void {
      self.listTelepassViacard = items;
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
  }

  displayedColumns: string[] = ['Targa', 'Marca', 'Modello', 'StoricoStati'];
  displayedColumnsDue: string[] = ['Stato', 'Data', 'Dipendente', 'Dettaglio'];



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDue(filterValue: string) {
    this.dataSourceDue.filter = filterValue.trim().toLowerCase();
  }

  createListStatoVeicoliById(id: number): Array<StatoVeicolo> {
    for (let statoVeicoli of this.listStatoVeicoli) {
      if (statoVeicoli.IdVeicolo == id) {
        this.listStatoVeicoliById.push(statoVeicoli);
      }
    }
    return this.listStatoVeicoliById;
  }

  getStatoById(id: number): string {
    if (this.listStati != null && this.listStati != undefined) {
      var statoById = this.listStati.find(l => l.IdStato == id)
      return statoById.Stato;
    }
    else {
      return "";
    }
  }

  getNameById(id: number): string {
    if (this.listAnagrafiche != null && this.listAnagrafiche != undefined) {
      var anagraficaById = this.listAnagrafiche.find(a => a.IdAnagrafica == id);
      return (anagraficaById.Cognome + "  " + anagraficaById.Nome)
    }
    else {
      return "";
    }
  }

  getTargaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != undefined) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Targa;
    }
    else {
      return "";
    }
  }

  getSocietaById(id: number): string {
    if (this.listSocieta != null && this.listSocieta != undefined) {
      var societaById = this.listSocieta.find(s => s.IdSocieta == id);
      return societaById.Societa1;
    }
    else {
      return "";
    }
  }

  getBusinessUnitById(id: number): string {
    if (this.listBusinessUnit != null && this.listBusinessUnit != undefined) {
      var businessUnitById = this.listBusinessUnit.find(b => b.IdBusinessUnit == id);
      return businessUnitById.BusinessUnit1;
    }
    else {
      return "";
    }
  }

  getModalitaById(id: number): string {
    if (this.listModalita != null && this.listModalita != undefined) {
      var modalitaById = this.listModalita.find(b => b.IdModalita == id);
      return modalitaById.Modalita1;
    }
    else {
      return "";
    }
  }

  getTelepassViacardById(id: number): string {
    var telepassViacardById = new TelepassViacard(0, "")
    if (id != null || id != undefined) {
      telepassViacardById = this.listTelepassViacard.find(t => t.IdTelepassViacard == id);
    }
    return telepassViacardById.TelepassViacard1;
  }

  getListAnagrafica(data: DataService): void {
    var self = this;
    data.getListAnagrafiche(function (items: Array<Anagrafica>): void {
      self.listAnagrafiche = items;
    });
  }

  getListStati(data: DataService): void {
    var self = this;
    data.getListStati(function (items: Array<Stato>): void {
      self.listStati = items;
    });
  }

  getListBusinessUnit(data: DataService): void {
    var self = this;
    data.getListBusinessUnit(function (items: Array<BusinessUnit>): void {
      self.listBusinessUnit = items;
    });
  }

  getListSocieta(data: DataService): void {
    var self = this;
    data.getListSocieta(function (items: Array<Societa>): void {
      self.listSocieta = items;
    });
  }

  getListModalita(data: DataService): void {
    var self = this;
    data.getListModalita(function (items: Array<Modalita>): void {
      self.listModalita = items;
    });
  }

  detailItemView(statoVeicolo: StatoVeicolo): void {
    this.getListBusinessUnit(this.data);
    this.getListSocieta(this.data);
    this.getListModalita(this.data);
    this.page = "dettaglio";
    this.statoVeicoloDetail = statoVeicolo;
  }

  listStateView(veicolo: Veicolo): void {
    this.listStatoVeicoliById = []; //svuota array ogni volta che si clicca dettaglio diverso//
    this.page = "listaStati";
    this.targaDettaglio = veicolo.Targa;
    this.getListAnagrafica(this.data);
    this.getListStati(this.data);
    this.listStatoVeicoliById = this.createListStatoVeicoliById(veicolo.IdVeicolo);
    this.dataSourceDue = new MatTableDataSource(this.listStatoVeicoliById)
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
  }


  addStatoVeicoloView(): void {
    this.getListBusinessUnit(this.data);
    this.getListSocieta(this.data);
    this.getListModalita(this.data);
    this.page = 'aggiungi';
    this.newStatoVeicolo = new StatoVeicolo(1, null, null, null, null, null, new Date(), null, 0, null, null, null, "", "");
  }

  beginEdit(): void {
    if (this.isEditing == false) {
      this.isEditing = true;
    }

    else {
      this.isEditing = false;
    }
  }

  returnListVeicoli(): void {
    this.page = "listaVeicoli";
  }

  returnList(): void {
    this.page = "listaStati";
  }
}
