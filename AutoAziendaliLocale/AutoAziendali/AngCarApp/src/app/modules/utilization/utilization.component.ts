import { Component, OnInit } from '@angular/core';
import { Utilizzo } from 'src/app/models/utilizzo';
import { DataService } from 'src/app/services/data-service';


@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css']
})
export class UtilizationComponent implements OnInit {

  public page: string;
  public isEditing: boolean;
  public list: Array<Utilizzo>;
  public isButtonDisabled: boolean;
  
  constructor(private data: DataService) {
    var self = this;
    data.getListUtilizzo(function (items: Array<Utilizzo>): void {
      self.list = items;
    })
    this.isButtonDisabled = false;
    this.page = 'listaUtilizzo';
   }

  ngOnInit() {
  }

}
