import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Veicolo } from '../models/Veicolo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilizzo } from '../models/utilizzo';
import { Province } from '../models/province';
import { Scadenza } from '../models/scadenza';
import { ScadenzaVeicolo } from '../models/scadenzaVeicolo';

/* const string per i percorsi*/
const PERCORSO_BASE:string="http://localhost";
const PORTA:string=':50680';
//Scadenze (tipi di s.)
const GET_SCAD:string='getscadenza';
const DEL_SCAD:string='deletescadenza';
const EDIT_SCAD:string='editscadenza';
const ADD_SCAD:string='addscadenza';
//ScadenzeVeicolo (singole s. per singoli veicoli)
const GET_SCAD_VEICOLO:string='getscadenzaveicolo';
const DEL_SCAD_VEICOLO:string='deletescadenzaveicolo';
const EDIT_SCAD_VEICOLO:string='editscadenzaveicolo';
const ADD_SCAD_VEICOLO:string='addscadenzaveicolo';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }
    
    /* • Veicolo */

    public getList(callback: (items: Array<Veicolo>) => void): void {
        var item = this.http.get<Array<Veicolo>>("http://localhost:50680/api/getveicolo")
            .subscribe(
                data => {
                    // Ho i dati
                    console.log(data);
                    callback(data);
                },
                error => {
                    console.log("errore");
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    deleteVeicolo(id: number): Observable<number>{
        return this.http.post<number>('http://localhost:50680/api/deleteVeicolo/', id);
    }

    editVeicolo(veicolo: Veicolo): Observable<Veicolo>{
        return this.http.post<Veicolo>('http://localhost:50680/api/editveicolo', veicolo);
    }

    addVeicolo(veicolo: Veicolo): Observable<Veicolo>{
        return this.http.post<Veicolo>('http://localhost:50680/api/addveicolo', veicolo);
    }

    /* • Province */

    public getListProvince(callback: (items: Array<Province>) => void): void {
        var item = this.http.get<Array<Province>>("http://localhost:50680/api/getProvince")
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("errore");
                }
            );
    }

    /* • Utilizzo */

    public getListUtilizzo(callback: (items: Array<Utilizzo>) => void): void {
        var item = this.http.get<Array<Utilizzo>>("http://localhost:50680/api/getUtilizzo")
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("errore");
                }
            );
    }

    /* • Scadenza (tipi di scadenza) */

    public getListTipiScadenza(callback: (items: Array<Scadenza>) => void): void {
        var item = this.http.get<Array<Scadenza>>(`${PERCORSO_BASE}${PORTA}/api/${GET_SCAD}`)
            .subscribe(
                data => {
                    // Ho i dati

                    console.log('dati (tipi scadenze) in data-service');
                    console.log(data);

                    callback(data);
                },
                error => {
                    console.log(`3rrore in ${GET_SCAD}`);
                    // Gestire eventuali errori della chiamata
                }
            );
    }

    /* • ScadenzaVeicolo (singole scadenze per singolo veicolo) */

    public getListScadenzaVeicolo(callback: (items: Array<ScadenzaVeicolo>) => void): void {
        var item = this.http.get<Array<ScadenzaVeicolo>>(`${PERCORSO_BASE}${PORTA}/api/${GET_SCAD_VEICOLO}`)
            .subscribe(
                data => {
                    // Ho i dati
                    
                    console.log('dati (scadVei) in data-service');
                    console.log(data);

                    callback(data);
                },
                error => {
                    console.log(`3rrore in «${GET_SCAD_VEICOLO}».`);
                    // Gestire eventuali errori della chiamata
                }
            );
    }
}