import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ExpiryComponent} from './expiry.component';
import { DocviewerComponent } from 'src/app/components/docviewer/docviewer.component';

@NgModule({
  declarations: [ExpiryComponent,DocviewerComponent],
  imports: [
    CommonModule,

  ]
})
export class ExpiryModule { }