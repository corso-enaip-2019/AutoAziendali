import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DataService } from 'src/app/services/data-service';

import { Scadenza } from 'src/app/models/scadenza';
import { ScadenzaVeicolo } from 'src/app/models/scadenzaVeicolo';
import { Province } from 'src/app/models/province';
import { Veicolo } from 'src/app/models/Veicolo';
import { Documento } from 'src/app/models/documento';
import { Fornitori } from 'src/app/models/fornitori';
import { CausaliManutenzione } from 'src/app/models/causalimanutenzione';
import { ManutenzioniVeicoli } from 'src/app/models/manutenzioniveicoli';

//import { DocviewerComponent } from 'src/app/components/docviewer';

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

  public listFornitori: Array<Fornitori>;
  public listCausaliManutenzione: Array<CausaliManutenzione>;
  public listManutenzioniVeicoli: Array<ManutenzioniVeicoli>;

  public dtSrcTipiScadenza: MatTableDataSource<Scadenza>;
  public dtSrcDocumenti: MatTableDataSource<Documento>;
  public dtSrcProvince: MatTableDataSource<Province>;
  public dtSrcFornitori: MatTableDataSource<Fornitori>;
  public dtSrcCasusaliManutenzione: MatTableDataSource<CausaliManutenzione>;
  public dtSrcVeicoli: MatTableDataSource<Veicolo>;
  public dtSrcScadenzeTuttiVeicoli: MatTableDataSource<ScadenzaVeicolo>;
  public dtSrcScadenzeSingoloVeicolo: MatTableDataSource<ScadenzaVeicolo>;
  public dtSrcManutenzioniVeicoli: MatTableDataSource<ManutenzioniVeicoli>;

  public newTipoScadenza: Scadenza; // Per la creazione d'un nuovo tipo di scadenza.
  public newScadenzaPerSingoloVeicolo: ScadenzaVeicolo; // Per l'aggiunta (ad un veicolo) d'una nuova scadenza.
  public newScadenzaVeicoloDetail: ScadenzaVeicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.
  public newScadenzaVeicoloPerConversione: ScadenzaVeicolo; // Per la conversione d'una manutenzione in una scadenzaVeicolo.
  public newTempVeicolo: Veicolo; // Per la aggiunta(creazione) d'una nuova scadenza ad un veicolo.
  public newIdTipoScadenzaPerConversione: number;

  public scadenzaDetail: Scadenza; // Per mostrare oltre al nome anche i gg di preavviso
  public scadenzaVeicoloDetail: ScadenzaVeicolo; // Per la visualizzazione/modifica delle scadenze impostate su d'un veicolo.
  public pickedDate: Date; // Data della scadenza, necessaria per la creazione/modifica della scadenza assegnata ad un veicolo.

  public isDocBtnEnabled: boolean; // boolean per l'attivazione / la disabilitazione del pulsante che fa mostrare l'immagine del documento.
  public showDocViewerDetail: boolean; // boolean per mostra/nascondi il docViewer (dei dettagli).
  public showDocViewerNew: boolean; // boolean per mostra/nascondi il docViewer (per la colonna di modifica/nuovo).

  public documentoDaMostrare: Documento;
  public oggi: Date;
  public dateStr: string;

  //Definizione colonne
  //Tabelle List
  displayedColsListTipSc: string[] = ['NomeScadenza', 'GgDiPreavviso', 'ColBtnModifica', 'ColBtnElimina'];
  displayedColsListVeico: string[] = ['Targa', 'Marca', 'Modello', 'ColBtnVediScadenze'];
  displayedColsListScTuV: string[] = ['DataScadenza', 'GgAllaScadenza', 'GgDiPreavviso', 'TipoDiScadenza', 'Targa', 'Marca', 'Modello', 'ColBtnVediDettagli', 'ColBtnModifica', 'ColBtnElimina'];
  displayedColsListScSiV: string[] = ['DataScadenza', 'GgAllaScadenza', 'GgDiPreavviso', 'TipoDiScadenza', 'Targa', 'Marca', 'Modello', 'ColBtnVediDettagli', 'ColBtnModifica', 'ColBtnElimina']; //E' uguale a quella con tutte le scadenze di tutti i veicoli (ho deciso di lasciare Targa-Marca-Modello).
  displayedColsListManVe: string[] = ['Data', 'Causale', 'Veicolo', 'Fornitore', 'Costo', 'Note', 'ColBtnConverti', 'ColBtnElimina'];
  //Tabelle Dettaglio
  displayedColsDettScSiV: string[] = ['DataScadenza', 'GgAllaScadenza', 'GgAllaScadenza', 'TipoDiScadenza', 'Targa', 'Marca', 'Modello', 'ColBtnVediDettagli', 'ColBtnModifica', 'ColBtnElimina']; //Non so bene come farla, la vedo bene così com'è; con la lista?.
  //Tabelle Edit
  displayedColsEditTipSc: string[] = ['ColTitoli', 'ScadenzaAttuale', 'ScadenzaAggiornata', 'ColDelta'];
  displayedColsEditScSiV: string[] = ['Data scadenza', 'GgAllaScadenza', 'GgDiPreavviso', 'TipoDiScadenza', 'Targa', 'Marca', 'Modello', 'ColBtnVediDettagli', 'ColBtnModifica', 'ColBtnElimina'];
  //Tabelle New
  //displayedColsNewTipSc: string[] = ['ColTitoli', 'ColDati']; //E' così minima che la lascio come tabella normale.
  displayedColsNewScSiV: string[] = ['Data scadenza', 'GgAllaScadenza', 'GgDiPreavviso', 'TipoDiScadenza', 'Targa', 'Marca', 'Modello', 'ColBtnVediDettagli', 'ColBtnModifica', 'ColBtnElimina'];

  constructor(private dataSrvc: DataService) {
    // "Inizializzazioni" necessarie.
    this.listVeicoli = null;
    this.listTipiScadenza = null;
    this.listScadenzeTuttiVeicoli = null;
    this.listScadenzeDelSingoloVeicolo = null;
    this.listProvince = null;
    this.listDocumenti = null;

    this.listFornitori = null;
    this.listCausaliManutenzione = null;
    this.listManutenzioniVeicoli = null;

    this.scadenzaVeicoloDetail = null;
    this.newScadenzaVeicoloDetail = null;

    this.newTempVeicolo = null;
    this.newTipoScadenza = null;
    this.newScadenzaPerSingoloVeicolo = null;
    this.newScadenzaVeicoloDetail = null;
    this.newTempVeicolo = null;
    this.newScadenzaVeicoloPerConversione = null;
    this.scadenzaDetail = null;
    this.scadenzaVeicoloDetail = null;
    this.pickedDate = null;
    this.isDocBtnEnabled = null;
    this.showDocViewerDetail = null;
    this.showDocViewerNew = null;
    this.documentoDaMostrare = null;
    this.oggi = null;
    this.newIdTipoScadenzaPerConversione = 1;

    /* Riempimento DataSorce. */
    var self = this;
    dataSrvc.getListDocumenti(function (items: Array<Documento>): void {
      self.listDocumenti = items; self.dtSrcDocumenti = new MatTableDataSource(self.listDocumenti);
    });

    dataSrvc.getListProvince(function (items: Array<Province>): void {
      self.listProvince = items; self.dtSrcProvince = new MatTableDataSource(self.listProvince);
    });

    dataSrvc.getListVeicoli(function (items: Array<Veicolo>): void {
      self.listVeicoli = items; self.dtSrcVeicoli = new MatTableDataSource(self.listVeicoli);
    });

    dataSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void {
      self.listTipiScadenza = items; self.dtSrcTipiScadenza = new MatTableDataSource(self.listTipiScadenza);
    });

    dataSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void {
      self.listScadenzeTuttiVeicoli = items; self.dtSrcScadenzeTuttiVeicoli = new MatTableDataSource(self.listScadenzeTuttiVeicoli);
    });

    dataSrvc.getListFornitori(function (items: Array<Fornitori>): void { self.listFornitori = items; });
    dataSrvc.getCausaliManutenzione(function (items: Array<CausaliManutenzione>): void { self.listCausaliManutenzione = items; });
    dataSrvc.getManutenzioniVeicoli(function (items: Array<ManutenzioniVeicoli>): void { self.dtSrcManutenzioniVeicoli = new MatTableDataSource(items); });

    /* Preparazione dei MatTableDataSource. */
    dataSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void { self.dtSrcTipiScadenza = new MatTableDataSource(items); });
    // dataSrvc.getListDocumenti(function (items: Array<Documento>): void {
    //   self.dtSrcDocumenti = new MatTableDataSource(items);
    // }); dataSrvc.getListProvince(function (items: Array<Province>): void {
    //   self.dtSrcProvince = new MatTableDataSource(items);
    // });
    // dataSrvc.getListFornitori(function (items: Array<Fornitori>): void { self.dtSrcFornitori = new MatTableDataSource(items); });
    // dataSrvc.getCausaliManutenzione(function (items: Array<CausaliManutenzione>): void { self.dtSrcCasusaliManutenzione = new MatTableDataSource(items); });
    // dataSrvc.getListVeicoli(function (items: Array<Veicolo>): void { self.dtSrcVeicoli = new MatTableDataSource(items); });
    // dataSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void { self.dtSrcScadenzeTuttiVeicoli = new MatTableDataSource(items); });
    // dataSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void { self.dtSrcScadenzeSingoloVeicolo = new MatTableDataSource(items); });
    // dataSrvc.getManutenzioniVeicoli(function (items: Array<ManutenzioniVeicoli>): void { self.dtSrcManutenzioniVeicoli = new MatTableDataSource(items); });

    this.page = 'listScadenzeTuttiVeicoli';
    this.titolo = 'Scadenze';

    this.oggi = new Date(); // « new Date() » senza parametri restituisce la data di oggi.
    this.pickedDate = new Date();

    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
    this.showDocViewerNew = false;
    //this.dateStr = '1999-12-31';

    //Schermata da mostrare all'arrivo alla / caricamento della pagina.
    this.listScadenzeTuttiVeicoliView();
  }

  /* Metodi per il "cambio di schermata". */

  listScadenzeTuttiVeicoliView(): void {
    this.page = 'listScadenzeTuttiVeicoli';

    this.titolo = 'Scadenze - Scadenze di tutti i veicoli';
    this.isEditing = false;
    this.isDocBtnEnabled = false;
  }

  listVeicoliView(): void {
    this.page = 'listVeicoli';

    this.titolo = 'Scadenze - Selezionare veicolo per vederne le scadenze';
    this.isEditing = false;
    this.isDocBtnEnabled = false;
  }

  listScadenzeVeicoloView(veicolo: Veicolo): void {
    this.page = 'listScadenzePerVeicolo';

    this.titolo = `Scadenze per veicolo ${veicolo.Marca} ${veicolo.Modello}`;
    this.isEditing = false;
    this.isDocBtnEnabled = false;

    this.listScadenzeDelSingoloVeicolo = [];
    for (let i = 0; i < this.listScadenzeTuttiVeicoli.length; i++) {
      if (this.listScadenzeTuttiVeicoli[i].IdVeicolo == veicolo.IdVeicolo) {
        this.listScadenzeDelSingoloVeicolo.push(this.listScadenzeTuttiVeicoli[i]);
      }
    }

    this.dtSrcScadenzeSingoloVeicolo = new MatTableDataSource(this.listScadenzeDelSingoloVeicolo);
  }

  listManutenzioniVeicoliView(): void {
    this.page = 'listManutenzioniVeicoli';

    this.titolo = 'Scadenze - Lista delle manutenzioni';
    this.isEditing = false;
    this.isDocBtnEnabled = false;

    this.newIdTipoScadenzaPerConversione = this.listTipiScadenza[0].IdScadenza;
  }

  detailSingolaScadenzaPerVeicoloView(sV: ScadenzaVeicolo): void {
    this.page = 'dettaglioSingolaScadenzaPerVeicolo';
    this.titolo = `Scadenze - Dettaglio della scadenza`;

    this.scadenzaVeicoloDetail = null;
    this.scadenzaVeicoloDetail = sV;
    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }

  /*editTipoScadenzaView*/
  editTipoScadenzaView(scadenzaOriginale: Scadenza): void {
    this.page = 'editTipoScadenza';
    this.titolo = `Scadenze - Modifica del tipo di scadenza`;

    this.isEditing = true;
    this.scadenzaDetail = null;
    this.newTipoScadenza = null;
    this.scadenzaDetail = new Scadenza(scadenzaOriginale.IdScadenza, scadenzaOriginale.Scadenza, scadenzaOriginale.GiorniPreavviso);
    this.newTipoScadenza = new Scadenza(scadenzaOriginale.IdScadenza, scadenzaOriginale.Scadenza, scadenzaOriginale.GiorniPreavviso);
  }

  editScadenzaVeicoloView(scadenzaVeicoloDaModificare: ScadenzaVeicolo) {
    this.titolo = `Scadenze - Modifica della scadenza`;

    this.scadenzaVeicoloDetail = null;
    this.newScadenzaVeicoloDetail = null;
    this.newTempVeicolo = null;
    this.newTempVeicolo = this.getVeicoloById(scadenzaVeicoloDaModificare.IdVeicolo);
    this.scadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);
    this.newScadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);

    this.titolo = `Scadenze - Modifica della scadenza`;
    this.isEditing = true;

    this.isDocBtnEnabled = (!(this.newScadenzaVeicoloDetail.IdDocumento == 0 || this.newScadenzaVeicoloDetail.IdDocumento == null || this.newScadenzaVeicoloDetail.IdDocumento == undefined));
    this.showDocViewerDetail = false;
    this.showDocViewerNew = false;

    this.pickedDate = this.newScadenzaVeicoloDetail.Data;

    this.page = 'editSingolaScadenzaPerVeicolo';
  }

  newTipoScadenzaViewQuestion(): void {
    if (this.dataSrvc.operationConfirmWithMessage("Passare alla creazione d\'un nuovo tipo di scadenza? I dati attuali verranno persi.")) {
      this.isEditing = true;
      this.newTipoScadenzaView();
    }
  }

  newTipoScadenzaView(): void {
    this.page = 'creazioneTipoScadenza';
    this.titolo = `Scadenze - Creazione di un nuovo tipo di scadenza`;
    this.isEditing = true;

    this.newTipoScadenza = null;
    this.newTipoScadenza = new Scadenza(1, 'NOME TIPO SCADENZA - ND', 1);

    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }

  newScadenzaVeicoloView(): void {
    this.page = 'creazioneScadenzaVeicolo';
    this.titolo = `Scadenze - Creazione ed assegnamento di una nuova scadenza ad un veicolo`;

    this.newScadenzaPerSingoloVeicolo = null;
    /* this.listVeicoli[0] = 1ªauto */
    this.newScadenzaPerSingoloVeicolo = new ScadenzaVeicolo(1, this.listVeicoli[0].IdVeicolo, new Date('1999-12-31'), 1, 8888, this.listDocumenti[0].IdDocumento, 'Note - ND', false, false);
    //Commentato via finchè non riesco a risolvere la sstoria del doc=null.
    //this.newScadenzaPerSingoloVeicolo = new ScadenzaVeicolo(1, 1, new Date('19991231'), 1, 8888, null, 'Note - ND', false, false);
    this.isEditing = true;
    this.isDocBtnEnabled = true;
    this.showDocViewerDetail = false;
  }

  listTipiScadenzaView(): void {
    this.page = 'listTipiScadenza';
    this.titolo = `Scadenze - Lista di tipi di scadenze`;

    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }

  /* Metodi per le azioni eseguite sul DB (CRUD). */

  /* Da fare - in lavoro. */
  /* funzionano: cambioVeicolo, note, cambio prezzo, documento, presenza/assenza doc (non mette null), avviso */
  /* non funzionano: cambio tipo scadenza (err406), data (da convertire in formato !=). */
  editScadenzaVeicolo(scadenzaVeicoloAggiornata: ScadenzaVeicolo): void {
    /* "Nullabilità" dei vari campi, presa manualmente dallo script di creazione:
     * NoteIsNullableInDB = true; AvvisoIsNullableInDB = true; AvvisoInviatoIsNullableInDB = true; */

    if (typeof (scadenzaVeicoloAggiornata.Costo) == 'undefined') {
      scadenzaVeicoloAggiornata.Costo = null;
    }
    if (typeof (scadenzaVeicoloAggiornata.IdDocumento) == 'undefined') {
      scadenzaVeicoloAggiornata.IdDocumento = null;
    }
    if (typeof (scadenzaVeicoloAggiornata.Note) == 'undefined') {
      scadenzaVeicoloAggiornata.Note = null;
    }
    if (typeof (scadenzaVeicoloAggiornata.Avviso) == 'undefined') {
      scadenzaVeicoloAggiornata.Avviso = null;
      scadenzaVeicoloAggiornata.AvvisoInviato = null;
    }
    if (typeof (scadenzaVeicoloAggiornata.AvvisoInviato) == 'undefined') {
      scadenzaVeicoloAggiornata.AvvisoInviato = null;
    }

    /* Se la tick-box non è spuntata, l'IdDocumento sarà null. */
    if (this.isDocBtnEnabled == false) {
      scadenzaVeicoloAggiornata.IdDocumento = null;
    }
    scadenzaVeicoloAggiornata.Avviso = this.newScadenzaVeicoloDetail.Avviso;
    //scadenzaVeicoloAggiornata.AvvisoInviato=this.newScadenzaVeicoloDetail.AvvisoInviato; // Per adesso mantengo quella "vecchia" già presente nel DB.
    /* Conversione data. */
    //scadenzaVeicoloAggiornata.Data = new Date(this.pickedDate.getTime());
    scadenzaVeicoloAggiornata.Data = this.pickedDate;


    console.log('data ricevuta');
    console.log(scadenzaVeicoloAggiornata.Data);
    console.log(this.pickedDate);

    // this.dateStr = `${this.newScadenzaPerSingoloVeicolo.Data.getFullYear().toString()}-${this.newScadenzaPerSingoloVeicolo.Data.getMonth().toString()}-${this.newScadenzaPerSingoloVeicolo.Data.getDate().toString()}`;
    // scadenzaVeicoloAggiornata.Data = new Date(this.dateStr);
    // console.log('data inviata');
    // console.log(scadenzaVeicoloAggiornata.Data);

    /*  */

    this.dataSrvc.editScadenzaVeicolo(scadenzaVeicoloAggiornata)
      .subscribe(
        data => {
          this.scadenzaVeicoloDetail = scadenzaVeicoloAggiornata;
          this.detailSingolaScadenzaPerVeicoloView(this.scadenzaVeicoloDetail);
          location.reload();
          this.page = 'dettaglioSingolaScadenzaPerVeicolo';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante la fase d\'edit di scadenzaveicolo.");
          console.log(scadenzaVeicoloAggiornata);
        }
      );
  }

  deleteScadenzaVeicolo(id: number): void {
    if (this.dataSrvc.operationConfirmWithMessage('Eliminare questa scadenza da questo veicolo?')) {
      this.dataSrvc.deleteScadenzaVeicolo(id)
        .subscribe(
          data => {
            let index = this.listScadenzeTuttiVeicoli.findIndex(sV => sV.IdScadenzeVeicoli == id);
            this.listScadenzeTuttiVeicoli.splice(index, 1);
            location.reload();
            this.page = 'listScadenzeTuttiVeicoli';
            this.isEditing = false;
          },
          error => {
            console.log('3rr in delete scad veicolo');
          }
        );
    }
  }

  addScadenzaVeicolo(scadenzaVeicoloDAggiungere: ScadenzaVeicolo): void {
    this.dataSrvc.addScadenzaVeicolo(scadenzaVeicoloDAggiungere)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listScadenzeTuttiVeicoli';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante l\'aggiunta d\'una nuova scadenzaVeicolo ad un veicolo.");
          console.log(scadenzaVeicoloDAggiungere);
        }
      );
  }

  addTipoScadenza(tipoScadenzaDaAggiungere: Scadenza): void {
    this.dataSrvc.addScadenza(tipoScadenzaDaAggiungere)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listTipiScadenza';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante l\'aggiunta d\'un nuovo tipo di scadenza.")
          console.log(tipoScadenzaDaAggiungere);
        }
      );
  }

  editTipoScadenza(scadenzaModificata: Scadenza): void {
    this.dataSrvc.editScadenza(scadenzaModificata)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listTipiScadenza';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante la modifica d\'un tipo di scadenza.")
          console.log(scadenzaModificata);
        }
      );
  }

  deleteTipoScadenza(id: number): void {
    if (this.dataSrvc.operationConfirmWithMessage('Eliminare questo tipo di scadenza?')) {
      this.dataSrvc.deleteScadenza(id)
        .subscribe(
          data => {
            let index = this.listTipiScadenza.findIndex(s => s.IdScadenza == id);
            this.listTipiScadenza.splice(index, 1);
            location.reload();
            this.page = 'listTipiScadenza';
            this.isEditing = false;
          },
          error => {
            console.log('Errore in delete tipo scad veicolo');
          }
        );
    }
  }

  /* Metodo speciale per convertire una ManutenzioneVeicolo in una ScadenzaVeicolo e salvarla nel DB. */
  convertManutenzioneVeicoloToScadenzaAndAddToList(manutenzioneVeicoloDaConvertire: ManutenzioniVeicoli, idScadenza: number): void {
    this.newScadenzaVeicoloPerConversione = null;
    this.newScadenzaVeicoloPerConversione = new ScadenzaVeicolo(1, this.listVeicoli[0].IdVeicolo, this.oggi, this.listTipiScadenza[0].IdScadenza, 1, this.listDocumenti[0].IdDocumento, 'NOTE - ND', false, false);
    this.newScadenzaVeicoloPerConversione.Costo = manutenzioneVeicoloDaConvertire.Costo;
    // Commentato via per problemi con le date
    this.newScadenzaVeicoloPerConversione.Data = manutenzioneVeicoloDaConvertire.Data;
    // this.newScadenzaVeicoloPerConversione.Data = new Date('1999-12-31');
    this.newScadenzaVeicoloPerConversione.IdDocumento = manutenzioneVeicoloDaConvertire.IdDocumento;
    this.newScadenzaVeicoloPerConversione.IdScadenza = idScadenza;
    this.newScadenzaVeicoloPerConversione.IdVeicolo = manutenzioneVeicoloDaConvertire.IdVeicolo;
    this.newScadenzaVeicoloPerConversione.Note = `Manut.conv.Scad.|Caus.:«${this.getNomeCausaleManutenzioneById(manutenzioneVeicoloDaConvertire.IdManutenzioneVeicoli)}»|Note:«${manutenzioneVeicoloDaConvertire.Note}»`;

    this.addScadenzaVeicolo(this.newScadenzaVeicoloPerConversione);
  }

  deleteManutenzioneVeicolo(id: number): void {
    if (this.dataSrvc.operationConfirmWithMessage('Eliminare questa manutenzione veicolo?')) {
      this.dataSrvc.deleteManutenzioneVeicolo(id)
        .subscribe(
          data => {
            let index = this.listManutenzioniVeicoli.findIndex(mV => mV.IdManutenzioneVeicoli == id);
            this.listManutenzioniVeicoli.splice(index, 1);
            location.reload();
            this.page = 'listManutenzioniVeicoli';
            this.isEditing = false;
          },
          error => {
            console.log('3rr in delete ManutenzioniVeicoli');
          }
        );
    }
  }

  /* Metodi per il confronto di date. */

  differenzaData1_Meno_Data2(data1, data2): number {
    return (((new Date(data1).getTime()) - (new Date(data2)).getTime())) / 86_400_000; // 86'400'000 ms in un giorno
  }

  differenzaOggiData2(data2): number {
    return ((this.oggi.getTime() - (new Date(data2)).getTime())) / 86_400_000; // 86'400'000 ms in un giorno
    // return ( ((new Date()).getTime() - (new Date(data2)).getTime()) ) / 86_400_000; // 86'400'000 ms in un giorno
  }

  isData1MenoData2MaggioreN(data1, data2, n: number): boolean {
    return (this.differenzaData1_Meno_Data2(data1, data2) > n);
  }

  /* Usata per controllare se i giorni restanti sono troppo pochi. */
  rimastiTroppoPochiGiorni(data2, n: number): boolean {
    return ((this.differenzaOggiData2(data2)) <= 1) && ((this.differenzaOggiData2(data2)) > (-1 * n));
  }

  /* Acquisizione dati dalle altre liste/tabelle. */

  // Tabella Province

  getlistProvince(dtSrvc: DataService): void {
    var self = this;
    dtSrvc.getListProvince(function (items: Array<Province>): void {
      self.listProvince = items;
    });
  }

  // Tabella Veicoli

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
      return '';
    }

  }

  getModelloById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Modello;
    }
    else {
      return '';
    }
  }

  getMarcaById(id: number): string {
    if (this.listVeicoli != null && this.listVeicoli != null) {
      var veicoloById = this.listVeicoli.find(v => v.IdVeicolo == id);
      return veicoloById.Marca;
    }
    else {
      return '';
    }
  }

  // Tabella Scadenze (contiene tipi di scadenza)

  getNomeTipoScadenzaByIdTipoScadenza(id: number): string {
    if (this.listTipiScadenza != null && this.listTipiScadenza != null) {
      var tipoScadenzaById = this.listTipiScadenza.find(s => s.IdScadenza == id);
      return tipoScadenzaById.Scadenza;
    }
    else {
      return '';
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

  // Tabella CausaliManutenzione

  getNomeCausaleManutenzioneById(idCausale: number): string {
    if (this.listCausaliManutenzione != null && this.listCausaliManutenzione != null) {
      var causaleManutenzioneById = this.listCausaliManutenzione.find(cM => cM.IdCausaleManutenzione == idCausale);

      return causaleManutenzioneById.CausaleManutenzione;
    }
    else {
      return 'listaVuota';
    }
  }

  // Tabella Fornitori

  getNomeFornitoreById(idFornitore: number): string {
    if (this.listFornitori != null && this.listFornitori != null) {
      var fornitoreById = this.listFornitori.find(f => f.IdFornitore == idFornitore);

      return fornitoreById.Fornitore;
    }
    else {
      return 'listaVuota';
    }
  }

  // Tabella Documenti

  //Vedi il component docviewer
  //"Documento" è un'immagine di tipo T-SQL "image", in C# "byte[]".
  //incompleto
  getDocumentoImgByIdDocumento(idDocumento: number): any {
    if (this.listDocumenti != null && this.listDocumenti != null) {
      var documentoById = this.listDocumenti.find(d => d.IdDocumento == idDocumento);
      return documentoById.Documento;
    }
    else {
      return 0;
    }
  }

  isItsIdDocPropUndefined(sV: ScadenzaVeicolo): boolean {
    return (typeof (sV.IdDocumento) == 'undefined');
  }

  /* • Metodi per i filtri delle view. */
  applyFilterVeicoli(filterValue: string) { this.dtSrcVeicoli.filter = filterValue.trim().toLowerCase(); }
  applyFilterTipiScadenza(filterValue: string) { this.dtSrcTipiScadenza.filter = filterValue.trim().toLowerCase(); }
  applyFilterScadenzeTuttiVeicoli(filterValue: string) { this.dtSrcScadenzeTuttiVeicoli.filter = filterValue.trim().toLowerCase(); }
  applyFilterScadenzeVeicolo(filterValue: string) { this.dtSrcScadenzeSingoloVeicolo.filter = filterValue.trim().toLowerCase(); }
  applyFilterManutenzioni(filterValue: string) { this.dtSrcManutenzioniVeicoli.filter = filterValue.trim().toLowerCase(); }

  // rimpolpamentoDeiNullDiScadenzaVeicolo(sV: ScadenzaVeicolo): ScadenzaVeicolo {

  //   if (typeof (sV.Costo) == 'undefined') {
  //     sV.Costo = null;
  //   }
  //   if (typeof (sV.IdDocumento) == 'undefined') {
  //     sV.IdDocumento = null;
  //   }
  //   if (typeof (sV.Note) == 'undefined') {
  //     sV.Note = null;
  //   }
  //   if (typeof (sV.Avviso) == 'undefined') {
  //     sV.Avviso = null;
  //     sV.AvvisoInviato = null;
  //   }
  //   if (typeof (sV.AvvisoInviato) == 'undefined') {
  //     sV.AvvisoInviato = null;
  //   }

  //   return sV;
  // }
}