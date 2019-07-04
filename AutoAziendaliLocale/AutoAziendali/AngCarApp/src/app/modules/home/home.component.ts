import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public imgCar: string = "assets/car.png";
  public imgState: string = "assets/state.png";
  public imgExpiry: string = "assets/expiry.png";
  public imgUtilization: string = "assets/utilization.png"
  constructor() { }

  ngOnInit() {
  }

}
