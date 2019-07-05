import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Veicolo } from '../models/Veicolo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilizzo } from '../models/utilizzo';
import { Province } from '../models/province';
import { Anagrafica } from '../models/anagrafica';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
    }

    public getListVeicoli(callback: (items: Array<Veicolo>) => void): void {
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

    public getListAnagrafica(callback: (items: Array<Anagrafica>) => void): void {
        var item = this.http.get<Array<Anagrafica>>("http://localhost:50680/api/getanagrafica")
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log("errore");
                }
            );
    }

    deleteUtilizzo(id: number): Observable<number>{
        return this.http.post<number>('http://localhost:50680/api/deleteUtilizzo/', id);
    }
}