import { Component } from '@angular/core';

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
export class ExpiryComponent {
  public page: string; // Per gl'ngIf di "selezione" della schermata.
  public titolo: string; // Titolo da visualizzare sopra la tabella / il resto della schermata.

  public isEditing: boolean; // Indica se la schermata è in modalità visualizza/modifica.

  public listVeicoli: Array<Veicolo>; // Per la schermata scelta del veicolo.
  public listTipiScadenza: Array<Scadenza>; // Per la scelta del tipo di scadenza nell'edit/aggiunta d'una scadenza per un veicolo.
  public listScadenzeTuttiVeicoli: Array<ScadenzaVeicolo>; // Sono le scadenze di tutti i veicoli.
  public listScadenzeDelSingoloVeicolo: Array<ScadenzaVeicolo>; // Scadenze d'un singolo veicolo..
  public listProvince: Array<Province>;

  public newTipoScadenza: Scadenza; // Per la creazione d'un nuovo tipo di scadenza.
  public newScadenzaXVeicolo: ScadenzaVeicolo; // Per l'aggiunta (ad un veicolo) d'una nuova scadenza.
  public newScadenzaVeicoloDetail: ScadenzaVeicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.

  public scadenzaDetail: Scadenza; // Per mostrare oltre al nome anche i gg di preavviso
  public scadenzaVeicoloDetail: ScadenzaVeicolo; // Per la visualizzazione/modifica delle scadenze impostate su d'un veicolo.
  public pickedDate: Date; // Data della scadenza, necessaria per la creazione/modifica della scadenza assegnata ad un veicolo.

  public isDocBntDisabled: boolean; // boolean per l'attivazione / la disabilitazione del pulsante che fa mostrare l'immagine del documento.

  constructor(private dtSrvc: DataService) {
    var self = this;
    dtSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void { self.listTipiScadenza = items; });
    dtSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void { self.listScadenzeTuttiVeicoli = items; });
    dtSrvc.getListVeicoli(function (items: Array<Veicolo>): void { self.listVeicoli = items; });
    
    this.page = 'listScadenzeTuttiVeicoli';
    this.titolo = 'Scadenze';

    // "Inizializzazione" necessaria.
    this.listVeicoli=null;
    this.listTipiScadenza=null;
    this.listScadenzeTuttiVeicoli=null;
    this.listScadenzeDelSingoloVeicolo=null;
    this.listProvince=null;

    this.isEditing = false;
    this.isDocBntDisabled = true;

    //Schermata da mostrare all'arrivo alla/della pagina.
    this.listScadenzeTuttiVeicoliView();
  }

  listScadenzeTuttiVeicoliView(): void {
    this.page = 'listScadenzeTuttiVeicoli';

    //tmp
    console.log('contenuto delle liste, sono dentro detail scadenze view')
    console.log(this.listScadenzeTuttiVeicoli);
    console.log(this.listVeicoli);
    // console.log(self.listScad);
    // console.log(self.listScadPerVeicolo);
    // console.log(self.listVeicoli);
    //tmp

    this.titolo = 'Scadenze - Scadenze per tutti i veicoli.';
    this.isEditing = false;
    this.isDocBntDisabled = true;
  }

  listVeicoliView(): void {
    this.page = 'listVeicoli';

    this.titolo = 'Scadenze - Selezionare veicolo per vederne le scadenze';
    this.isEditing = false;
    this.isDocBntDisabled = true;
  }

  listScadenzePerVeicoloView(veicolo: Veicolo): void {
    this.page = 'listScadenzePerVeicolo';

    this.titolo = `Scadenze per veicolo ${veicolo.Marca} ${veicolo.Modello}`;
    this.isEditing = false;
    this.isDocBntDisabled = true;

    //this.listScadenzePerVeicolo=[];
    //.forEach(element => {
      
    //});
  }

  /* Da fare. */
  aggiuntaTipoScadenzaView():void{}
  /* Da fare. */
  dettaglioSingolaScadenzaPerVeicoloView(s:ScadenzaVeicolo):void{}
  /* Da fare. */
  aggiuntaScadenzaAVeicoloView(v:Veicolo):void{}

  getlistProvince(dtSrvc: DataService): void {
    var self = this;
    dtSrvc.getListProvince(function (items: Array<Province>): void {
      self.listProvince = items;
    });
  }
}