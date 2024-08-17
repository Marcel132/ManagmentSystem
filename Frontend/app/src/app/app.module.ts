import { NgModule } from '@angular/core';
import { SharedModule } from './modules/shared.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './components/auth/auth.module';
import { MainModule } from './components/main/main.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MainModule
  ],
  exports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MainModule
  ],
  providers: [
  ]
})
export class AppModule { }
