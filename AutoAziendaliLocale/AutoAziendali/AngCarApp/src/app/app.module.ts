import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavModule } from './modules/sidenav/sidenav.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CarsComponent } from './modules/cars/cars.component';
import { StateComponent } from './modules/state/state.component';
import { UtilizationComponent } from './modules/utilization/utilization.component';
import { ExpiryComponent } from './modules/expiry/expiry.component';
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data-service';

import{FormsModule}from'@angular/forms';
import { HomeModule } from './modules/home/home.module';
import { MatIconModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatTableModule, MatListModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarsComponent,
    StateComponent,
    UtilizationComponent,
    ExpiryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidenavModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule, 
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
