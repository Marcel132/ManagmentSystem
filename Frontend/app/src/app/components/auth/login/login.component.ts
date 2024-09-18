import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
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
    this.router.navigate(['/signup']);
    console.log()
  }
  
  email: string = ''
  password: string = ''
  
  emailMessage!: string;
  passwordMessage!: string

  validData: boolean = false;
  invalidPassword: boolean = false;
  invalidEmail: boolean = false;;
  
  onSubmit() {
    let validateEmail = this.authService.validateEmail(this.email)
    let validatePassword = this.authService.validatePassword(this.password)
    if(validateEmail && validatePassword) {
      
      this.authService.loginUser(this.email, this.password).subscribe(response => {
        switch(response.type) {
          case 'success':
            this.validData = true
            document.body.style.cursor = 'wait';

            setTimeout(() => window.location.reload(), 1500);
            break
          
          case 'invalidPassword':
            this.invalidPassword = true
            this.passwordMessage = response.message
            break

          case 'serverError':
            this.invalidPassword = true
            this.passwordMessage = response.message
            break

        }
      })
      

    } 
    if(!validateEmail) {
      this.invalidEmail = true
      this.emailMessage = "Błędny email"
    } else {
      this.invalidEmail = false
    }
    if(!validatePassword){
      this.invalidPassword = true
      this.passwordMessage = `Twoje hasło nie spełnia warunków bezpieczeństwa`
    } else {
      this.invalidPassword = false
    }
  }
  
}
