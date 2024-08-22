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
    this.passwordAlt = this.passwordAlt === 'Show Password' ? 'Hide Password' : 'Show Password'
    this.passwordTitle = this.passwordTitle === 'Show Password' ? 'Hide Password' : 'Show Password'
  }
  
  changeForm() {
    this.router.navigate(['/login'])
  }
  email: string = '';
  password: string = '';
  acceptedRules: boolean = false;
  
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;

  emailMessage!: string;
  passwordMessage!: string
    
  validData: boolean = false
  

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
            this.validData = true;
            document.body.style.cursor = 'wait';

            setTimeout(() => window.location.reload(), 1500);
            break;

          case 'invalidEmail':
            this.invalidEmail = true;
            this.emailMessage =  response.message || "Taki email już istneije";
            break;

          case 'error':
            this.invalidPassword = true;
            this.passwordMessage = response.message || "Nieoczekiwany błąd";
            break;
        }
      });
    } 

    if(!validateEmail) {
      this.invalidEmail = true
      this.emailMessage = 'Niepoprawny adres e-mail'
    } else {
      this.invalidEmail = false
    }

    if(!validatePassword){
      this.invalidPassword = true
      this.passwordMessage = `Twoje hasło nie spełnia norm bezpieczeństwa`
    } else {
      this.invalidPassword = false
    }

    if(!this.acceptedRules){
      this.notAcceptedRules = true
    } else {
      this.notAcceptedRules = false
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
