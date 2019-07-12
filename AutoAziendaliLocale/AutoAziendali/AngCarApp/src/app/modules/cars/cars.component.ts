import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data-service';
import { Veicolo } from 'src/app/models/veicolo';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { Provider } from '@angular/compiler/src/core';
import { Province } from 'src/app/models/province';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent{

  public newVeicolo: Veicolo;
  public veicoloDetail: Veicolo;
  public page: string;
  public isEditing: boolean;
  public listVeicoli: Array<Veicolo>;
  public isButtonDisabled: boolean;
  public listProvince: Array<Province>;
  public picker: Date;
  public dataSource: MatTableDataSource<Veicolo>;

  constructor(private data: DataService) {
    this.page = "";
    var self = this;
    data.getListVeicoli(function (items: Array<Veicolo>): void {
      self.dataSource = new MatTableDataSource(items);
      self.isButtonDisabled = false;
      self.isEditing = false;
      self.page = 'listaVeicolo';
      self.veicoloDetail = null;
    });
  }
  displayedColumns: string[] = ['Targa', 'Marca', 'Modello', 'Dettaglio', 'Elimina'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // ngOnInit() {
  //   this.dataSource.sort = this.sort;
  // }

  getListProvince(data: DataService): void {
    var self = this;
    data.getListProvince(function (items: Array<Province>): void {
      self.listProvince = items;

    })
  }

  deleteVeicolo(id: number): void {
    if (Veicolo.operationConfirm()) {
      this.data.deleteVeicolo(id)
        .subscribe(
          data => {
            let index = this.listVeicoli.findIndex(a => a.IdVeicolo == id);
            this.listVeicoli.splice(index, 1);
          },
          error => {

          }
        );
    }
  }


  beginEdit(): void {
    if (this.isEditing == false) {
      this.isEditing = true;
      this.getListProvince(this.data);
    }

    else {
      this.isEditing = false;
    }
  }

  editVeicolo(veicolo: Veicolo): void {
    this.data.editVeicolo(veicolo)
      .subscribe(
        data => {
          this.isEditing = false;
          this.veicoloDetail = veicolo;
        },
        error => {

        }
      );
  }

  detailItemView(veicolo: Veicolo): void {
    this.page = "dettaglio";
    this.veicoloDetail = veicolo;
  }

  addVeicolo(veicolo: Veicolo): void {

    this.data.addVeicolo(veicolo)
      .subscribe(
        data => {
          location.reload();
          this.page = 'listaVeicolo';
        },
        error => {
        }
      );
  };

  addVeicoloView(): void {
    this.page = 'aggiungi';
    this.newVeicolo = new Veicolo(1, "", "", "", "", "", new Date(), 0, 0, 0, 0, "", "", "", "", null);
    this.getListProvince(this.data)
  };

  returnList(): void {
    this.page = "listaVeicolo";
  }
}
