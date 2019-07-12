import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portal } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

import { Veicolo } from '../models/Veicolo';
import { Utilizzo } from '../models/utilizzo';
import { Province } from '../models/province';
import { Scadenza } from '../models/scadenza';
import { Anagrafica } from '../models/anagrafica';
import { Commessa } from '../models/commessa';
import { ScadenzaVeicolo } from '../models/scadenzaVeicolo';
import { Documento } from '../models/documento';
import { StatoVeicolo } from '../models/StatoVeicolo';
import { Stato } from '../models/stato';
import { Societa } from '../models/societa';
import { BusinessUnit } from '../models/businessUnit';
import { TelepassViacard } from '../models/telepassViacard';
import { Modalita } from '../models/modalita';
import { Fornitori } from '../models/fornitori';
import { CausaliManutenzione } from '../models/causalimanutenzione';
import { ManutenzioniVeicoli } from '../models/manutenzioniveicoli';

/* const string per i percorsi*/
const PERCORSO_BASE: string = "http://localhost";
const PORTA: string = ':50680';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    /* • Veicoli */

    public getListVeicoli(callback: (items: Array<Veicolo>) => void): void {
        var item = this.http.get<Array<Veicolo>>(`${PERCORSO_BASE}${PORTA}/api/getveicoli`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {
                    console.log("Errore in «getveicolo».");
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    deleteVeicolo(id: number): Observable<number> {
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/deleteveicolo/`, id);
    }

    editVeicolo(veicolo: Veicolo): Observable<Veicolo> {
        return this.http.post<Veicolo>(`${PERCORSO_BASE}${PORTA}/api/editveicolo`, veicolo);
    }

    addVeicolo(veicolo: Veicolo): Observable<Veicolo> {
        return this.http.post<Veicolo>(`${PERCORSO_BASE}${PORTA}/api/addveicolo`, veicolo);
    }

    /* • Province */

    public getListProvince(callback: (items: Array<Province>) => void): void {
        var item = this.http.get<Array<Province>>(`${PERCORSO_BASE}${PORTA}/api/getProvince`)
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("Errore in «getProvince».");
                }
            );
    }

    /* • Utilizzo */

    public getListUtilizzi(callback: (items: Array<Utilizzo>) => void): void {
        var item = this.http.get<Array<Utilizzo>>(`${PERCORSO_BASE}${PORTA}/api/getutilizzi`)
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("Errore in «getutilizzi».");
                }
            );
    }
    deleteUtilizzo(id: number): Observable<number> {
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/deleteUtilizzo/`, id);
    }


    editUtilizzo(utilizzo: Utilizzo): Observable<Utilizzo> {
        return this.http.post<Utilizzo>(`${PERCORSO_BASE}${PORTA}/api/editutilizzo`, utilizzo);
    }

    addUtilizzo(utilizzo: Utilizzo): Observable<Utilizzo> {
        return this.http.post<Utilizzo>(`${PERCORSO_BASE}${PORTA}/api/addutilizzo`, utilizzo)
    }

    /* • Commessa */

    public getListCommesse(callback: (items: Array<Commessa>) => void): void {
        var items = this.http.get<Array<Commessa>>(`${PERCORSO_BASE}${PORTA}/api/getcommesse`)
            .subscribe(
                data => {
                    callback(data)
                },
                error => {

                }

            );

    }

    /* • Scadenza (tipi di scadenza) */

    public getListTipiScadenza(callback: (items: Array<Scadenza>) => void): void {
        var item = this.http.get<Array<Scadenza>>(`${PERCORSO_BASE}${PORTA}/api/getscadenze`)
            .subscribe(
                data => {
                    // Ho i dati

                    console.log('Dati (tipi scadenze) in data-service:');
                    console.log(data);

                    callback(data);
                },
                error => {
                    console.log(`Errore in getscadenze.`);
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    deleteScadenza(id: number): Observable<number> {
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/deletescadenza/`, id);
    }

    editScadenza(scadenza: Scadenza): Observable<Scadenza> {
        return this.http.post<Scadenza>(`${PERCORSO_BASE}${PORTA}/api/editscadenza`, scadenza);
    }

    addScadenza(scadenza: Scadenza): Observable<Scadenza> {
        return this.http.post<Scadenza>(`${PERCORSO_BASE}${PORTA}/api/addscadenza`, scadenza);
    }

    /* • ScadenzaVeicolo (singole scadenze per singolo veicolo) */

    public getListScadenzeVeicoli(callback: (items: Array<ScadenzaVeicolo>) => void): void {
        var item = this.http.get<Array<ScadenzaVeicolo>>(`${PERCORSO_BASE}${PORTA}/api/getscadenzeveicoli`)
            .subscribe(
                data => {
                    // Ho i dati

                    console.log('Dati (scadVei) in data-service:');
                    console.log(data);

                    callback(data);
                },
                error => {
                    console.log(`Errore in «getscadenzeveicoli».`);
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    deleteScadenzaVeicolo(id: number): Observable<number> {
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/deletescadenzaveicolo/`, id);
    }

    editScadenzaVeicolo(scadenzaVeicolo: ScadenzaVeicolo): Observable<ScadenzaVeicolo> {
        return this.http.post<ScadenzaVeicolo>(`${PERCORSO_BASE}${PORTA}/api/editscadenzaveicolo`, scadenzaVeicolo);
    }

    addScadenzaVeicolo(scadenzaVeicolo: ScadenzaVeicolo): Observable<ScadenzaVeicolo> {
        return this.http.post<ScadenzaVeicolo>(`${PERCORSO_BASE}${PORTA}/api/addscadenzaveicolo`, scadenzaVeicolo);
    }

    /* • Anagrafica */

    public getListAnagrafiche(callback: (items: Array<Anagrafica>) => void): void {
        var item = this.http.get<Array<Anagrafica>>(`${PERCORSO_BASE}${PORTA}/api/getanagrafiche`)
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("Errore in «getanagrafiche».");
                }
            );
    }

    /* • Documenti */

    /* La tabella Documenti contiene (mischiati) i documenti d'identità di persone e documenti riguardanti i veicoli. */
    /* La tabella Documenti è composta dalle colonne IdDocumento (tipo T-SQL "int") e Documento (tipo T-SQL "image", deprecato). */
    /* Tipo T-SQL "image" -> Tipo C# (Entity FW) byte[]. */
    /* Probabilmente bisogna fare in Angulare byte[]->base64, buttarlo in un nuovo oggetto, dar nell'html come src: « src="unsafe:data:image/png;base64,[object Object]" ». */

    public getListDocumenti(callback: (items: Array<Documento>) => void): void {
        var item = this.http.get<Array<Documento>>(`${PERCORSO_BASE}${PORTA}/api/getdocumenti`)
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("Errore in «getdocumenti».");
                }
            );
    }

    /* • Stato Veicoli */

    public getListStatoVeicoli(callback: (items: Array<StatoVeicolo>) => void): void {
        var item = this.http.get<Array<StatoVeicolo>>(`${PERCORSO_BASE}${PORTA}/api/getstatoveicoli`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {

                }
            );
    }

    editStatoVeicolo(statoVeicolo: StatoVeicolo): Observable<StatoVeicolo> {
        return this.http.post<StatoVeicolo>(`${PERCORSO_BASE}${PORTA}/api/editstatoveicolo`, statoVeicolo);
    }

    addStatoVeicolo(statoVeicolo: StatoVeicolo): Observable<StatoVeicolo> {
        return this.http.post<StatoVeicolo>(`${PERCORSO_BASE}${PORTA}/api/addstatoveicolo`, statoVeicolo)
    }

    /*Stato*/

    public getListStati(callback: (items: Array<Stato>) => void): void {
        var item = this.http.get<Array<Stato>>(`${PERCORSO_BASE}${PORTA}/api/getstati`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {

                }
            );
    }

    /* • Societa */

    public getListSocieta(callback: (items: Array<Societa>) => void): void {
        var item = this.http.get<Array<Societa>>(`${PERCORSO_BASE}${PORTA}/api/getsocieta`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {

                }
            );
    }

    /* • BusinessUnit*/

    public getListBusinessUnit(callback: (items: Array<BusinessUnit>) => void): void {
        var item = this.http.get<Array<BusinessUnit>>(`${PERCORSO_BASE}${PORTA}/api/getbusinessunit`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {

                }
            );
    }

    /* • TelepassViacard*/

    public getListTelepassViacard(callback: (items: Array<TelepassViacard>) => void): void {
        var item = this.http.get<Array<TelepassViacard>>(`${PERCORSO_BASE}${PORTA}/api/gettelepassviacard`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {

                }
            );
    }
    
    /* • Modalita*/

    public getListModalita(callback: (items: Array<Modalita>) => void): void {
        var item = this.http.get<Array<Modalita>>(`${PERCORSO_BASE}${PORTA}/api/getmodalita`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {
                   
                }
            );
    }

    /* • Fornitori */
    
    public getListFornitori(callback: (items: Array<Fornitori>) => void): void {
        var item = this.http.get<Array<Fornitori>>(`${PERCORSO_BASE}${PORTA}/api/getfornitori`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {
                    console.log("Errore in getfornitori.");
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    /* • Causali di manutenzione */
    
    public getCausaliManutenzione(callback: (items: Array<CausaliManutenzione>) => void): void {
        var item = this.http.get<Array<CausaliManutenzione>>(`${PERCORSO_BASE}${PORTA}/api/getcausalimanutenzione`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {
                    console.log("Errore in getcausalimanutenzione.");
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    /* • Manutenzioni veicoli */

    public getManutenzioniVeicoli(callback: (items: Array<ManutenzioniVeicoli>) => void): void {
        var item = this.http.get<Array<ManutenzioniVeicoli>>(`${PERCORSO_BASE}${PORTA}/api/getmanutenzioniveicoli`)
            .subscribe(
                data => {
                    // Ho i dati
                    callback(data);

                },
                error => {
                    console.log("Errore in getmanutenzioniveicoli.");
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    deleteManutenzioneVeicolo(id: number): Observable<number> {
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/manutenzioneveicolo/`, id);
    }
}