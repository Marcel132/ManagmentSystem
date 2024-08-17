import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../modules/shared.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ){}
  
  passwordType: string = 'password'
  passwordSrc: string = './../../../assets/img/eye.svg'
  passwordAlt: string = 'Show Password'
  passwordTitle: string = 'Show Password'
  
  tooglePasswordsAttributes(){
    // Change passwords attributes when a user click on the img
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    this.passwordSrc = this.passwordSrc === './../../../assets/img/eye.svg' ? './../../../assets/img/eye-slash.svg' : './../../../assets/img/eye.svg'
    this.passwordAlt = this.passwordAlt === 'Show Password' ? 'Hide Password' : 'ShowPassword'
    this.passwordTitle = this.passwordTitle === 'Show Password' ? 'Hide Password' : 'ShowPassword'
  }
  
  changeForm() {
    this.router.navigate(['/login'])
  }
  email: string = '';
  password: string = '';
  acceptedRules: boolean = false;
  errorEmailMessage!: string 
  validDataMessage!: boolean
  invalidEmailMessage!: boolean;
  invalidPasswordMessage!: boolean
  notAcceptedRules!: boolean

  onSubmit() {
    const validateEmail = this.authService.validateEmail(this.email)
    const validatePassword = this.authService.validatePassword(this.password)

    if(validateEmail && validatePassword && this.acceptedRules) {
      
      const createdAt = this.getDate()
      const userData: any = {
        email: this.email,
        password: this.password,
        acceptedRules: this.acceptedRules,
        createdAt: createdAt,
      }
      
      this.authService.registerUser(userData).subscribe(response => {
        switch (response.type) {
          case 'success':
            this.validDataMessage = true;
            this.invalidEmailMessage = false;
            this.invalidPasswordMessage = false;
            this.notAcceptedRules = false;
            setTimeout(() => window.location.reload(), 1500);
            break;
          case 'invalidEmail':
            this.invalidEmailMessage = true;
            this.errorEmailMessage =  'Taki email już istnieje';
            break;
          case 'error':
            this.invalidEmailMessage = false;
            this.invalidPasswordMessage = false;
            this.notAcceptedRules = false;
            this.errorEmailMessage = 'Wystąpił błąd serwera';
            break;
          default:
            console.error('Unexpected response:', response);
            this.errorEmailMessage = 'Nieoczekiwany błąd';
            break;
        }
      });


      this.invalidPasswordMessage= false
      this.notAcceptedRules = false
    } 
    else if(!validateEmail) {
      this.invalidEmailMessage = true
      this.errorEmailMessage = 'Niepoprawny ares'
      this.invalidPasswordMessage = false
    } 
    else if(!validatePassword){
      this.invalidPasswordMessage = true
      this.invalidEmailMessage = false
    }
    else if(!this.acceptedRules){
      this.notAcceptedRules = true
      this.invalidPasswordMessage = false
      this.invalidEmailMessage = false
    }
    
  }
  getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seceonds = date.getSeconds()
  
   return `${day}/${month}/${year} ${hour}:${minute}:${seceonds}`
  }
}
