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
    // getListVeicoli(): Observable<Veicolo>{
    //     return this.http.get<Veicolo>(`${PERCORSO_BASE}${PORTA}/api/getveicoli`)
    // }

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

    // const DEL_SCAD: string = 'deletescadenza';
    // const EDIT_SCAD: string = 'editscadenza';
    // const ADD_SCAD: string = 'addscadenza';

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

    // const DEL_SCAD_VEICOLO: string = 'deletescadenzaveicolo';
    // const EDIT_SCAD_VEICOLO: string = 'editscadenzaveicolo';
    // const ADD_SCAD_VEICOLO: string = 'addscadenzaveicolo';

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



}