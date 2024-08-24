import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
  ], 
  exports: [
    CommonModule,
    HeaderComponent,
  ]
})
export class AdminModule { }
