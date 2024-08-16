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
  validDataMessage!: boolean
  invalidEmailMessage!: boolean;
  invalidPasswordMessage!: boolean
  notAcceptedRules!: boolean

  onSubmit() {
    const validateEmail = this.authService.validateEmail(this.email)
    const validatePassword = this.authService.validatePassword(this.password)

    if(validateEmail && validatePassword && this.acceptedRules) {
      this.validDataMessage = true
      this.invalidPasswordMessage= false
      this.invalidEmailMessage = false
      this.notAcceptedRules = false

      this.authService.registerUser(this.email, this.password, this.acceptedRules)
    } 
    else if(!validateEmail) {
      this.invalidEmailMessage = true
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
}
