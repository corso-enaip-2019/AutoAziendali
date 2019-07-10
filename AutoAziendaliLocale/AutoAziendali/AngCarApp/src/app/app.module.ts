import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatTableModule, MatListModule, MatButtonModule, MatSortModule, MatCheckboxModule } from '@angular/material';

//import { FilterPipeModule } from 'ngx-filter-pipe';

import { SidenavModule } from './modules/sidenav/sidenav.module';
import { CarsComponent } from './modules/cars/cars.component';
import { StateComponent } from './modules/state/state.component';
import { UtilizationComponent } from './modules/utilization/utilization.component';
import { ExpiryComponent } from './modules/expiry/expiry.component';
import { HomeComponent } from './modules/home/home.component';
import { HomeModule } from './modules/home/home.module';

import { DataService } from './services/data-service';

import { DocviewerComponent } from './components/docviewer/docviewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarsComponent,
    StateComponent,
    UtilizationComponent,
    ExpiryComponent,
    DocviewerComponent
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
    MatNativeDateModule,
    MatSortModule,
    MatCheckboxModule,
    //FilterPipeModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }