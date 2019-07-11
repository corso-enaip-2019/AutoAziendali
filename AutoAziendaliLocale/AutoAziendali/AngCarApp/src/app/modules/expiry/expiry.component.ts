import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data-service';

import { Scadenza } from 'src/app/models/scadenza';
import { ScadenzaVeicolo } from 'src/app/models/scadenzaVeicolo';
import { Province } from 'src/app/models/province';
import { Veicolo } from 'src/app/models/Veicolo';
import { Documento } from 'src/app/models/documento';

//import { DocviewerComponent } from 'src/app/components/docviewer';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html',
  styleUrls: ['./expiry.component.css']
})
export class ExpiryComponent implements OnInit{
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

  public scadenzaDetail: Scadenza; // Per mostrare oltre al nome anche i gg di preavviso
  public scadenzaVeicoloDetail: ScadenzaVeicolo; // Per la visualizzazione/modifica delle scadenze impostate su d'un veicolo.
  public pickedDate: Date; // Data della scadenza, necessaria per la creazione/modifica della scadenza assegnata ad un veicolo.

  public isDocBtnEnabled: boolean; // boolean per l'attivazione / la disabilitazione del pulsante che fa mostrare l'immagine del documento.
  public showDocViewerDetail: boolean; // boolean per mostra/nascondi il docViewer (dei dettagli).
  public showDocViewerNew: boolean; // boolean per mostra/nascondi il docViewer (per la colonna di modifica/nuovo).

  public documentoDaMostrare: Documento;
  public oggi: Date;
  public dateStr:string;

  constructor(private dataSrvc: DataService) {
    // "Inizializzazioni" necessarie.
    this.listVeicoli = null;
    this.listTipiScadenza = null;
    this.listScadenzeTuttiVeicoli = null;
    this.listScadenzeDelSingoloVeicolo = null;
    this.listProvince = null;
    this.listDocumenti = null;

    this.scadenzaVeicoloDetail = null;
    //this.scadenzaVeicoloDetail=new ScadenzaVeicolo(1,1,new Date('19991224'),1,1,1,'no',false,false);
    this.newScadenzaVeicoloDetail = null;
    //this.newScadenzaVeicoloDetail=new ScadenzaVeicolo(1,1,new Date('19991224'),1,1,1,'no',false,false);

    this.newTempVeicolo = null;
    this.newTipoScadenza = null;
    this.newScadenzaPerSingoloVeicolo = null;
    this.newScadenzaVeicoloDetail = null;
    this.newTempVeicolo = null;
    this.scadenzaDetail = null;
    this.scadenzaVeicoloDetail = null;
    this.pickedDate = null;
    this.isDocBtnEnabled = null;
    this.showDocViewerDetail = null;
    this.showDocViewerNew = null;
    this.documentoDaMostrare = null;
    this.oggi = null;

    var self = this;
    dataSrvc.getListDocumenti(function (items: Array<Documento>): void { self.listDocumenti = items; });
    dataSrvc.getListProvince(function (items: Array<Province>): void { self.listProvince = items; });
    dataSrvc.getListVeicoli(function (items: Array<Veicolo>): void { self.listVeicoli = items; });
    dataSrvc.getListTipiScadenza(function (items: Array<Scadenza>): void { self.listTipiScadenza = items; });
    dataSrvc.getListScadenzeVeicoli(function (items: Array<ScadenzaVeicolo>): void { self.listScadenzeTuttiVeicoli = items; });

    this.page = 'listScadenzeTuttiVeicoli';
    this.titolo = 'Scadenze';

    this.oggi = new Date(); // « new Date() » senza parametri restituisce la data di oggi.
    this.pickedDate = new Date();

    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
    this.showDocViewerNew = false;
this.dateStr="1999-12-31";

    //Schermata da mostrare all'arrivo alla/della pagina.
    this.listScadenzeTuttiVeicoliView();
  }

  ngOnInit(){
   // this.rimpolpamentoDeiNull();
  }

  /* Metodi per il "cambio di schermata". */

  listScadenzeTuttiVeicoliView(): void {
    this.page = 'listScadenzeTuttiVeicoli';

    this.titolo = 'Scadenze - Scadenze di tutti i veicoli';
    this.isEditing = false;
    this.isDocBtnEnabled = false;
  }

  /*incompleto*/
  listVeicoliView(): void {
    this.page = 'listVeicoli';

    this.titolo = 'Scadenze - Selezionare veicolo per vederne le scadenze';
    this.isEditing = false;
    this.isDocBtnEnabled = false;
  }

  listScadenzePerVeicoloView(veicolo: Veicolo): void {
    this.page = 'listScadenzePerVeicolo';

    this.titolo = `Scadenze per veicolo ${veicolo.Marca} ${veicolo.Modello}`;
    this.isEditing = false;
    this.isDocBtnEnabled = false;

    //this.listScadenzePerVeicolo=[];
    //.forEach(element => {

    //});
  }

  detailSingolaScadenzaPerVeicoloView(sV: ScadenzaVeicolo): void {
    this.page = 'dettaglioSingolaScadenzaPerVeicolo';
    this.titolo = `Scadenze - Dettaglio della scadenza`;
    
    this.scadenzaVeicoloDetail = null;
    this.scadenzaVeicoloDetail = sV;
    console.log("veicolo per dettagli");
    console.log(this.scadenzaVeicoloDetail);
    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }
  
/*editTipoScadenzaView*/
editTipoScadenzaView(scadenzaOriginale: Scadenza): void {
  this.page = 'editTipoScadenza';
  this.titolo = `Scadenze - Dettaglio della scadenzaModifica del tipo di scadenza`;

  this.scadenzaDetail = null;
  this.newTipoScadenza = null;
    this.scadenzaDetail = new Scadenza(scadenzaOriginale.IdScadenza, scadenzaOriginale.Scadenza, scadenzaOriginale.GiorniPreavviso);
    this.newTipoScadenza = new Scadenza(scadenzaOriginale.IdScadenza, scadenzaOriginale.Scadenza, scadenzaOriginale.GiorniPreavviso);
}

  /* Da fare - in lavoro. */
  /* Se c'è un null in IdDocumento -> «Cannot read property 'IdDocumento' of undefined» e non riesce a caricare il resto. */
  editScadenzaVeicoloView(scadenzaVeicoloDaModificare: ScadenzaVeicolo) {
    this.titolo = `Scadenze - Modifica della scadenza`;
    
    //provato ad aggiungere questo per il "cannot read property ..." non ha funzionato.
    // if (scadenzaVeicoloDaModificare.IdDocumento==undefined) { 
      //   scadenzaVeicoloDaModificare.IdDocumento=null;
      // }
      //!!!!!!!!!
      //if (typeof(scadenzaVeicoloDaModificare.IdDocumento==undefined)) {scadenzaVeicoloDaModificare.IdDocumento=null;}
      //!!!!!!!!!

    this.scadenzaVeicoloDetail = null;
    this.newScadenzaVeicoloDetail = null;
    this.newTempVeicolo = null;

    //prova d'inizializzazione, non vanno bene perché su undefined
    // this.scadenzaVeicoloDetail.Costo = null;
    // this.scadenzaVeicoloDetail.IdDocumento = null;
    // this.scadenzaVeicoloDetail.Note = null;
    // this.scadenzaVeicoloDetail.Avviso = null;
    // this.scadenzaVeicoloDetail.AvvisoInviato = null;
    //prova d'inizializzazione, non vanno bene perché su undefined
    // this.newScadenzaVeicoloDetail.Costo = null;
    // this.newScadenzaVeicoloDetail.IdDocumento = null;
    // this.newScadenzaVeicoloDetail.Note = null;
    // this.newScadenzaVeicoloDetail.Avviso = null;
    // this.newScadenzaVeicoloDetail.AvvisoInviato = null;

    this.newTempVeicolo = this.getVeicoloById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.newTempTipoScadenza = null;
    // this.newTempTipoScadenza = this.getScadenzaById(scadenzaVeicoloDaModificare.IdScadenza);
    this.scadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);

    /* BEGIN svuoto, riempio, metto a null il nullable, ri-riempio */
    /*non è bastato*/
    // this.scadenzaVeicoloDetail = null;
    // this.newScadenzaVeicoloDetail = null;

    // this.newTempVeicolo = this.getVeicoloById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.scadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);
    // this.newScadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);

    // this.scadenzaVeicoloDetail.Costo = null;
    // this.scadenzaVeicoloDetail.IdDocumento = null;
    // this.scadenzaVeicoloDetail.Note = null;
    // this.scadenzaVeicoloDetail.Avviso = null;
    // this.scadenzaVeicoloDetail.AvvisoInviato = null;

    // this.newScadenzaVeicoloDetail.Costo = null;
    // this.newScadenzaVeicoloDetail.IdDocumento = null;
    // this.newScadenzaVeicoloDetail.Note = null;
    // this.newScadenzaVeicoloDetail.Avviso = null;
    // this.newScadenzaVeicoloDetail.AvvisoInviato = null;

    // this.newTempVeicolo = this.getVeicoloById(scadenzaVeicoloDaModificare.IdVeicolo);
    // this.scadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);
    // this.newScadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);
    /* END svuoto, riempio, metto a null il nullable, ri-riempio */

    console.log("!!!!! scadenza vecchia / scadenza nuova:");
    console.log("Esistono, non sono 'undefined' !!!!!");
    console.log(scadenzaVeicoloDaModificare);
    console.log(this.scadenzaVeicoloDetail);
    this.newScadenzaVeicoloDetail = new ScadenzaVeicolo(scadenzaVeicoloDaModificare.IdScadenzeVeicoli, scadenzaVeicoloDaModificare.IdVeicolo, scadenzaVeicoloDaModificare.Data, scadenzaVeicoloDaModificare.IdScadenza, scadenzaVeicoloDaModificare.Costo, scadenzaVeicoloDaModificare.IdDocumento, scadenzaVeicoloDaModificare.Note, scadenzaVeicoloDaModificare.Avviso, scadenzaVeicoloDaModificare.AvvisoInviato);

    console.log("scad ricevuta:"); console.log(this.scadenzaVeicoloDetail);
    console.log("new scad:"); console.log(this.newScadenzaVeicoloDetail);

    this.titolo = `Scadenze - Modifica della scadenza`;
    this.isEditing = true;

    this.isDocBtnEnabled = (!(this.newScadenzaVeicoloDetail.IdDocumento == 0 || this.newScadenzaVeicoloDetail.IdDocumento == null || this.newScadenzaVeicoloDetail.IdDocumento == undefined));
    this.showDocViewerDetail = false;
    this.showDocViewerNew = false;

    this.pickedDate = this.newScadenzaVeicoloDetail.Data;

    this.page = 'editSingolaScadenzaPerVeicolo';
  }

  /* Da fare. */
  newTipoScadenzaView(): void {
    if (this.isEditing) {
      /*alert per avvisare dell'uscita dalla pagina d'edit (se s'è in pagina d'edit)*/
    }
    this.page = 'creazioneTipoScadenza';
    this.titolo = `Scadenze - Creazione di un nuovo tipo di scadenza`;

    this.newTipoScadenza = null;
    this.newTipoScadenza = new Scadenza(1, "NOME TIPO SCADENZA - ND", 1);

    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }

  // /* Da fare, incompleto. */
  // /* Mostra-nasconde il component "docview". */
  // /* Non è più una nuova schermata. */
  // visualizzazioneDocumento(idDoc: number): void {
  //   //this.page = 'mostraDocumento';

  //   this.titolo = `Scadenze - Mostra documento`;
  //   //this.isEditing = true;
  //   //this.isDocBntEnabled = true;
  //   this.documentoDaMostrare = null;
  //   this.documentoDaMostrare = this.getDocumentoImgByIdDocumento(idDoc);
  //   // this.documentoDaMostrare.IdDocumento = idDoc;
  //   // this.documentoDaMostrare.Documento = this.getDocumentoImgByIdDocumento(idDoc);
  // }

  /* Da fare. */
  listDocumentiView(): void { console.log("Non ancora implementata."); }

  /* Da fare. */
  // aggiuntaScadenzaAVeicoloView(v: Veicolo): void {
  //   this.page = 'aggiuntaScadenzaAVeicolo';

  //   this.titolo = 'Scadenze - Creazione di una nuova scadenza ed assegnamento ad un veicolo';
  //   this.isEditing = true;
  //   this.isDocBtnEnabled = false;
  // }

  newScadenzaVeicoloView(): void {
    this.page = 'creazioneScadenzaVeicolo';
    this.titolo = `Scadenze - Creazione ed assegnamento di una nuova scadenza ad un veicolo`;

    this.newScadenzaPerSingoloVeicolo = null;
    /* La #10 è la prima auto. */
    this.newScadenzaPerSingoloVeicolo = new ScadenzaVeicolo(1, 10, new Date('1999-12-31'), 1, 8888, 1, 'Note - ND', false, false);
    //Commentato via finchè non riesco a risolvere la sstoria del doc=null.
    //this.newScadenzaPerSingoloVeicolo = new ScadenzaVeicolo(1, 1, new Date('19991231'), 1, 8888, null, 'Note - ND', false, false);
    console.log("Nuova scadenzaVeicolo appena creata, per creazione nuova scadenza:");
    console.log(this.newScadenzaPerSingoloVeicolo);
    this.isEditing = true;
    this.isDocBtnEnabled = true;
    this.showDocViewerDetail = false;
  }

  listTipoScadenzaView():void{
    this.page = 'listTipiScadenza';
    this.titolo = `Scadenze - Lista di tipi di scadenze`;

    this.isEditing = false;
    this.isDocBtnEnabled = false;
    this.showDocViewerDetail = false;
  }

  /* Metodi per le azioni eseguite sul DB (CRUD). */

  /* Da fare - in lavoro. */
  /* funzionano: cambioVeicolo, note, cambio prezzo, documento */
  /* non funzionano: cambio tipo scadenza (err406), data (da convertire in formato !=), presenza/assenza doc (non mette null), avviso. */
  editScadenzaVeicolo(scadenzaVeicoloAggiornata: ScadenzaVeicolo): void {
    /* "Nullabilità" dei vari campi, presa manualmente dallo script di creazione. */
    // NoteIsNullableInDB: boolean = true;
    // AvvisoIsNullableInDB: boolean = true;
    // AvvisoInviatoIsNullableInDB: boolean = true;

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
    // scadenzaVeicoloAggiornata.Data = new Date(this.pickedDate.getTime());
    
    console.log("data ricevuta");
    console.log(scadenzaVeicoloAggiornata.Data);

    this.dateStr=`${this.newScadenzaPerSingoloVeicolo.Data.getFullYear().toString()}-${this.newScadenzaPerSingoloVeicolo.Data.getMonth().toString()}-${this.newScadenzaPerSingoloVeicolo.Data.getDate().toString()}`;
    scadenzaVeicoloAggiornata.Data = new Date(this.dateStr);
    console.log("data inviata");
    console.log(scadenzaVeicoloAggiornata.Data);

    /*  */

    this.dataSrvc.editScadenzaVeicolo(scadenzaVeicoloAggiornata)
      .subscribe(
        data => {
          //this.isEditing = false;
          this.scadenzaVeicoloDetail = scadenzaVeicoloAggiornata;
          this.detailSingolaScadenzaPerVeicoloView(this.scadenzaVeicoloDetail);
          //location.reload();
          //this.page = 'dettaglioSingolaScadenzaPerVeicolo';
        },
        error => { console.log("errore durante la fase d\'edit di scadenzaveicolo.") }
      );
  }

  deleteScadenzaVeicolo(id: number): void {
    if (ScadenzaVeicolo.operationConfirm()) {
      this.dataSrvc.deleteScadenzaVeicolo(id)
        .subscribe(
          data => {
            let index = this.listScadenzeTuttiVeicoli.findIndex(sV => sV.IdScadenzeVeicoli == id);
            this.listScadenzeTuttiVeicoli.splice(index, 1);
            location.reload();
            this.page = 'listScadenzeTuttiVeicoli';
          },
          error => {
            console.log("3rr in delete scad veicolo");
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
          console.log("Errore durante l'aggiunta d'una nuova scadenzaVeicolo ad un veicolo.")
          console.log(scadenzaVeicoloDAggiungere);
        }
      );
  }

  addTipoScadenza(tipoScadenzaDaAggiungere: Scadenza): void {
    this.dataSrvc.addScadenza(tipoScadenzaDaAggiungere)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listScadenzeTuttiVeicoli';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante l'aggiunta d'un nuovo tipo di scadenza.")
          console.log(tipoScadenzaDaAggiungere);
        }
      );
  }

  editTipoScadenza(scadenzaModificata: Scadenza): void {
    console.log("scadenza in uscita per l\'edit:");
    console.log(scadenzaModificata);
    this.dataSrvc.editScadenza(scadenzaModificata)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listTipiScadenza';
          this.isEditing = false;
        },
        error => {
          console.log("Errore durante la modifica d'un tipo di scadenza.")
          console.log(scadenzaModificata);
        }
      );
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

  // Tabella Scadenze (contiene tipi di scadenza)

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

  // Tabella Documenti

  //Vedi il component docviewer
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

isItsIdDocPropUndefined(sV:ScadenzaVeicolo):boolean{
  return (typeof (sV.IdDocumento) == 'undefined');
}

  rimpolpamentoDeiNullDiScadenzaVeicolo(sV:ScadenzaVeicolo):ScadenzaVeicolo {
    
      if (typeof (sV.Costo) == 'undefined') {
        sV.Costo = null;
      }
      if (typeof (sV.IdDocumento) == 'undefined') {
        sV.IdDocumento = null;
      }
      if (typeof (sV.Note) == 'undefined') {
        sV.Note = null;
      }
      if (typeof (sV.Avviso) == 'undefined') {
        sV.Avviso = null;
        sV.AvvisoInviato = null;
      }
      if (typeof (sV.AvvisoInviato) == 'undefined') {
        sV.AvvisoInviato = null;
      }
    
      return sV;
  }
}