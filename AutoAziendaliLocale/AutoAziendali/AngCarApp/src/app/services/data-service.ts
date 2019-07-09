import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Veicolo } from '../models/Veicolo';
import { Utilizzo } from '../models/utilizzo';
import { Province } from '../models/province';
import { Scadenza } from '../models/scadenza';
import { Anagrafica } from '../models/anagrafica';
import { Commessa } from '../models/commessa';
import { ScadenzaVeicolo } from '../models/scadenzaVeicolo';
import { Portal } from '@angular/cdk/portal';
import { Documento } from '../models/documento';

/* const string per i percorsi*/
const PERCORSO_BASE: string = "http://localhost";
const PORTA: string = ':50680';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

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
        return this.http.post<number>(`${PERCORSO_BASE}${PORTA}/api/deleteVeicolo/`, id);
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

    /* • Commessa */

    public getListCommesse(callback: (items: Array<Commessa>) => void): void {
        var items = this.http.get<Array<Commessa>>(`${PERCORSO_BASE}${PORTA}/api/getCommesse`)
            .subscribe(
                data => {
                    callback(data)
                },
                error => {

                }

            );

    };

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

    editScadenzaVeicolo(scadenzaVeicolo: ScadenzaVeicolo): Observable<Veicolo> {
        return this.http.post<Veicolo>(`${PERCORSO_BASE}${PORTA}/api/editscadenzaveicolo`, scadenzaVeicolo);
    }

    addScadenzaVeicolo(scadenzaVeicolo: ScadenzaVeicolo): Observable<Veicolo> {
        return this.http.post<Veicolo>(`${PERCORSO_BASE}${PORTA}/api/addscadenzaveicolo`, scadenzaVeicolo);
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
}