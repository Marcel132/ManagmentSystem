import { NgModule } from '@angular/core';
import { SharedModule } from './modules/shared.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './components/auth/auth.module';
import { MainModule } from './components/main/main.module';
import { AdminModule } from './components/admin/admin.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MainModule,
    AdminModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MainModule,
    AdminModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ]
})
export class AppModule { }
