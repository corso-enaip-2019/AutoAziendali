import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ExpiryComponent} from './expiry.component';

@NgModule({
  declarations: [ExpiryComponent],
  imports: [
    CommonModule,

  ]
})
export class ExpiryModule { 
  titolo:string='Scedenze';
}