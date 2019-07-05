import { Component, OnInit } from '@angular/core';

import { Scadenza } from 'src/app/models/scadenza';
import { Province } from 'src/app/models/province';

import { DataService } from 'src/app/services/data-service';
import { ScadenzaVeicolo } from 'src/app/models/scadenzaVeicolo';
import { Veicolo } from 'src/app/models/Veicolo';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html',
  styleUrls: ['./expiry.component.css']
})
export class ExpiryComponent implements OnInit {
  public page: string;
  public titolo: string;

  public isEditing: boolean; // Indica se la schermata è in modalità visualizza/modifica.

  public listVeicoli: Array<Veicolo>; //Per la schermata scelta del veicolo.
  public listScad: Array<Scadenza>; //Per la scelta del tipo di scadenza nell'edit/aggiunta d'una scadenza per un veicolo.
  public listScadPerVeicolo: Array<ScadenzaVeicolo>; //Sono le scadenze di un singolo veicolo.
  public newTipoScadenza: Scadenza; // Per la creazione d'un nuovo tipo di scadenza.
  public newScadenzaXVeicolo: ScadenzaVeicolo; // Per l'aggiunta (ad un veicolo) d'una nuova scadenza.
  public scadenzaDetail: Scadenza; // Per mostrare oltre al nome anche i gg di preavviso
  public scadenzaVeicoloDetail:ScadenzaVeicolo; // Per la visualizzazione/modifica delle scadenze impostate su d'un veicolo.
  public newScadenzaVeicoloDetail:ScadenzaVeicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.
  public listProvince: Array<Province>;
  public pickedDate: Date; // Data della scadenza, necessaria per la creazione/modifica della scadenza assegnata ad un veicolo.

  public isDocBntDisabled: boolean; // boolean per l'attivazione / la disabilitazione del pulsante che fa mostrare l'immagine del documento.

  constructor(private dtSrvc: DataService) {
    this.page = 'listaScadenze';
    var self=this;
    dtSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void { self.listScad = items; });
    dtSrvc.getListScadenzaVeicolo(function (items: Array<ScadenzaVeicolo>): void { self.listScadPerVeicolo = items; });
  }

  ngOnInit() {
    this.titolo = 'Scadenze';
    this.isEditing=false;
    this.isDocBntDisabled=true;
  }
}