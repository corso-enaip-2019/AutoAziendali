//!\ C'è DA LAVORARE SULLE DATE PERCHé MI SA CHE LE PRENDE COL FORMATO SBAGLIATO, DA RI-CONTROLLARE GUARDANDO IL DB.

import { Component } from '@angular/core';

import { DataService } from 'src/app/services/data-service';

import { Scadenza } from 'src/app/models/scadenza';
import { ScadenzaVeicolo } from 'src/app/models/scadenzaVeicolo';
import { Province } from 'src/app/models/province';
import { Veicolo } from 'src/app/models/Veicolo';
import { Documento } from 'src/app/models/documento';

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
  public listScadenzeDelSingoloVeicolo: Array<ScadenzaVeicolo>; // Scadenze d'un singolo veicolo.
  public listDocumenti: Array<Documento>; // Sono le immagini dei varii documenti.
  public listProvince: Array<Province>;

  public newTipoScadenza: Scadenza; // Per la creazione d'un nuovo tipo di scadenza.
  public newScadenzaPerSingoloVeicolo: ScadenzaVeicolo; // Per l'aggiunta (ad un veicolo) d'una nuova scadenza.
  public newScadenzaVeicoloDetail: ScadenzaVeicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.
  public newTempVeicolo: Veicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.
  public newTempTipoScadenza: Scadenza; // Per la creazione d'una nuova scadenza ad un veicolo.

  public scadenzaDetail: Scadenza; // Per mostrare oltre al nome anche i gg di preavviso
  public scadenzaVeicoloDetail: ScadenzaVeicolo; // Per la visualizzazione/modifica delle scadenze impostate su d'un veicolo.
  public pickedDate: Date; // Data della scadenza, necessaria per la creazione/modifica della scadenza assegnata ad un veicolo.

  public isDocBntDisabled: boolean; // boolean per l'attivazione / la disabilitazione del pulsante che fa mostrare l'immagine del documento.
  public documentoDaMostrare: Documento;
  public oggi: Date;

  constructor(private dataSrvc: DataService) {
    // "Inizializzazione" necessaria.
    this.listVeicoli = null;
    this.listTipiScadenza = null;
    this.listScadenzeTuttiVeicoli = null;
    this.listScadenzeDelSingoloVeicolo = null;
    this.listProvince = null;
    this.listDocumenti = null;

    var self = this;
    dataSrvc.getListDocumenti(function (items: Array<Documento>): void { self.listDocumenti = items; });
    dataSrvc.getListProvince(function (items: Array<Province>): void { self.listProvince = items; });
    dataSrvc.getListVeicoli(function (items: Array<Veicolo>): void { self.listVeicoli = items; });
    dataSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void { self.listTipiScadenza = items; });
    dataSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void { self.listScadenzeTuttiVeicoli = items; });

    this.page = 'listScadenzeTuttiVeicoli';
    this.titolo = 'Scadenze';

    this.isEditing = false;
    this.isDocBntDisabled = true;

    this.oggi = new Date();

    //Schermata da mostrare all'arrivo alla/della pagina.
    this.listScadenzeTuttiVeicoliView();
  }

  /* Metodi per il "cambio di schermata". */

  listScadenzeTuttiVeicoliView(): void {
    this.page = 'listScadenzeTuttiVeicoli';

    //tmp
    console.log('contenuto delle liste, sono dentro listScadenzeTuttiVeicoliView')
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

  detailSingolaScadenzaPerVeicoloView(sV: ScadenzaVeicolo): void {
    this.page = 'dettaglioSingolaScadenzaPerVeicolo';

    this.scadenzaVeicoloDetail = null;
    this.scadenzaVeicoloDetail = sV;
    console.log("veicolo per dettagli");
    console.log(this.scadenzaDetail);
    this.titolo = `Scadenze - Dettaglio della scadenza`;
    this.isEditing = false;
    this.isDocBntDisabled = true;
  }

  /* Da fare - in lavoro. */
  editScadenzaVeicoloView(scadenzaVeicoloDaModificare: ScadenzaVeicolo) {
    this.page = 'editSingolaScadenzaPerVeicolo';

    this.scadenzaVeicoloDetail = null;
    this.newScadenzaVeicoloDetail = null;
    this.newTempVeicolo = null;
    this.newTempVeicolo = this.getVeicoloById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.newTempTipoScadenza = null;
    // this.newTempTipoScadenza = this.getScadenzaById(scadenzaVeicoloDaModificare.IdScadenza);
    this.scadenzaVeicoloDetail = scadenzaVeicoloDaModificare;
    this.newScadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);
    //this.newScadenzaVeicoloDetail = scadenzaVeicoloDaModificare; //Assegnamento con passaggio per riferimento.
    // this.newScadenzaVeicoloDetail.Avviso=scadenzaVeicoloDaModificare.Avviso;
    // this.newScadenzaVeicoloDetail.AvvisoInviato=scadenzaVeicoloDaModificare.AvvisoInviato;
    // this.newScadenzaVeicoloDetail.Costo=scadenzaVeicoloDaModificare.Costo;
    // this.newScadenzaVeicoloDetail.Data=scadenzaVeicoloDaModificare.Data;
    // this.newScadenzaVeicoloDetail.IdDocumento=scadenzaVeicoloDaModificare.IdDocumento;
    // this.newScadenzaVeicoloDetail.IdScadenza=scadenzaVeicoloDaModificare.IdScadenza;
    // this.newScadenzaVeicoloDetail.IdScadenzeVeicoli=scadenzaVeicoloDaModificare.IdScadenzeVeicoli;
    // this.newScadenzaVeicoloDetail.IdVeicolo=scadenzaVeicoloDaModificare.IdVeicolo;
    // this.newScadenzaVeicoloDetail.Note=scadenzaVeicoloDaModificare.Note;

    // /*damigliorare*/
    // this.newTempVeicolo.Targa = this.getTargaById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.newTempVeicolo.Marca = this.getMarcaById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.newTempVeicolo.Modello = this.getModelloById(scadenzaVeicoloDaModificare.IdVeicolo);

    console.log("scad ricevuta:"); console.log(this.scadenzaVeicoloDetail);
    console.log("new scad:"); console.log(this.newScadenzaVeicoloDetail);

    this.titolo = `Scadenze - Modifica della scadenza`;
    this.isEditing = true;

    this.isDocBntDisabled = (this.newScadenzaVeicoloDetail.IdDocumento == 0 || this.newScadenzaVeicoloDetail.IdDocumento == null || this.newScadenzaVeicoloDetail.IdDocumento == undefined);
  }

  /* Da fare. */
  aggiuntaTipoScadenzaView(): void { console.log("Non ancora implementata.") }

  /* Da fare, incompleto. */
  visualizzazioneDocumentoView(idDoc: number): void {
    this.page = 'mostraDocumento';

    this.titolo = `Scadenze - Mostra documento`;
    //this.isEditing = true;
    //this.isDocBntDisabled = true;
    this.documentoDaMostrare = null;
    this.documentoDaMostrare = this.getDocumentoImgByIdDocumento(idDoc);
    // this.documentoDaMostrare.IdDocumento = idDoc;
    // this.documentoDaMostrare.Documento = this.getDocumentoImgByIdDocumento(idDoc);
  }

  /* Da fare. */
  listDocumentiView(): void { console.log("Non ancora implementata.") }

  /* Da fare. */
  aggiuntaScadenzaAVeicoloView(v: Veicolo): void {
    this.page = 'aggiuntaScadenzaAVeicolo';

    this.titolo = 'Scadenze - Creazione di una nuova scadenza ed assegnamento ad un veicolo';
    this.isEditing = true;
    this.isDocBntDisabled = true;
  }

  /* Metodi per le azioni eseguite sul DB (CRUD). */

  /* Da fare - in lavoro. */
  editScadenzaVeicolo(scadenzaVeicoloAggiornata: ScadenzaVeicolo): void {
    this.dataSrvc.editScadenzaVeicolo(scadenzaVeicoloAggiornata)
      .subscribe(
        data => {
          this.isEditing = false;
          this.scadenzaVeicoloDetail = scadenzaVeicoloAggiornata;
        },
        error => { }
      );
  }

  /* Da fare. */
  deleteScadenzaVeicolo(scadenzaVeicoloDaEliminare: ScadenzaVeicolo): void { console.log("Non ancora implementata.") }

  /* Da fare. */
  addScadenzaVeicolo(scadenzaVeicoloDAggiiungere: ScadenzaVeicolo): void { console.log("Non ancora implementata.") }

  /* Metodi per il confronto di date. */

  differenzaData1_Meno_Data2(data1, data2): number {
    return (((new Date(data1).valueOf()) - (new Date(data2)).valueOf())) / 86_400_000; // 86'400'000 ms in un giorno
  }

  differenzaOggiData2(data2): number {
    return ((this.oggi.valueOf() - (new Date(data2)).valueOf())) / 86_400_000; // 86'400'000 ms in un giorno
    // return ( ((new Date()).valueOf() - (new Date(data2)).valueOf()) ) / 86_400_000; // 86'400'000 ms in un giorno
  }

  isData1MenoData2MaggioreN(data1, data2, n: number): boolean {
    return (this.differenzaData1_Meno_Data2(data1, data2) > n);
  }

  differenzaOggiData2MaggioreN(data2, n: number): boolean {
    return (this.differenzaOggiData2(data2) > n);
  }

  /* Acquisizione dati dalle altre liste/tabelle. */

  getlistProvince(dtSrvc: DataService): void {
    var self = this;
    dtSrvc.getListProvince(function (items: Array<Province>): void {
      self.listProvince = items;
    });
  }

  getVeicoloByTarga(targa: string): Veicolo {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloByTarga = this.listVeicoli.find(v => v.Targa == targa);
      return veicoloByTarga;
    }
    else {
      return null;
    }
  }

  getVeicoloById(id: number): Veicolo {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById;
    }
    else {
      return null;
    }
  }


  getTargaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Targa;
    }
    else {
      return "";
    }
  }

  getModelloById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Modello;
    }
    else {
      return "";
    }
  }

  getMarcaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Marca;
    }
    else {
      return "";
    }
  }

  getNomeTipoScadenzaByIdTipoScadenza(id: number): string {
    if (this.listTipiScadenza != null && this.listTipiScadenza != null) {
      var tipoScadenzaById = this.listTipiScadenza.find(s => s.IdScadenza == id);
      return tipoScadenzaById.Scadenza;
    }
    else {
      return "";
    }
  }

  getGiorniDiPreavvisoByIdTipoScadenza(id: number): number {
    if (this.listTipiScadenza != null && this.listTipiScadenza != null) {
      var tipoScadenzaById = this.listTipiScadenza.find(s => s.IdScadenza == id);
      return tipoScadenzaById.GiorniPreavviso;
    }
    else {
      return 0;
    }
  }

  getScadenzaById(id: number): Scadenza {
    if (this.listTipiScadenza != null && this.listTipiScadenza != null) {
      var scadenzaById = this.listTipiScadenza.find(s => s.IdScadenza == id);
      return scadenzaById;
    }
    else {
      return null;
    }
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