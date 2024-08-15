import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
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
    this.router.navigate(['/signup']);
  }

}
