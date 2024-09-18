import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './components/auth/auth.module';
import { MainModule } from './components/main/main.module';
import { AdminModule } from './components/admin/admin.module';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthTokenService } from './interceptors/auth-token.service';




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
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthTokenService
  ]
})
export class AppModule { }
