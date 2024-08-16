import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    SignupComponent,
    HttpClientModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
