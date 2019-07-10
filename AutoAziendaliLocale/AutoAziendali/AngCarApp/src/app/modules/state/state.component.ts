import { Component, OnInit } from '@angular/core';
import { Veicolo } from 'src/app/models/Veicolo';
import { DataService } from 'src/app/services/data-service';
import { MatTableDataSource } from '@angular/material';
import { StatoVeicolo } from 'src/app/models/StatoVeicolo';
import { Stato } from 'src/app/models/stato';
import { Anagrafica } from 'src/app/models/anagrafica';

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
  public targaDettaglio: string;

  constructor(private data: DataService) {
    var self = this;
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items;
    });
    data.getListStatoVeicoli(function (items: Array<StatoVeicolo>): void {
      self.listStatoVeicoli = items;
    });
    data.getListStati(function (items: Array<Stato>): void {
      self.listStati = items;
    });
    data.getListAnagrafiche(function (items: Array<Anagrafica>): void {
      self.listAnagrafiche = items;
    });
    this.isButtonDisabled = false;
    this.isEditing = false;
    this.page = 'listaVeicoli';
    this.listVeicoli = null;
    this.listStatoVeicoli = null;
    this.listStati = null;
    this.listStatoVeicoliById = [];
    this.targaDettaglio = "";
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
      var anagraficaById = this.listAnagrafiche.find(v => v.IdAnagrafica == id);
      return (anagraficaById.Cognome + "  " + anagraficaById.Nome)
    }
    else {
      return ""
    }
  }




  listStateView(veicolo: Veicolo): void {
    this.page = "listaStati";
    this.targaDettaglio = veicolo.Targa;
    this.createListStatoVeicoliById(veicolo.IdVeicolo);
  }

  returnListVeicoli() {
    this.page = "listaVeicoli";
  }

  returnList() {
    this.page = "listaStati";
  }
}
