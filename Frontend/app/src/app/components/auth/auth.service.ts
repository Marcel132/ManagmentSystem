import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidationResult, PasswordValidationResult } from './auth.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  validateEmail(email: string) {

    const invalidCharacters = /[^a-zA-Z0-9@._-]/.test(email)
    const invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const validEmail:boolean = !invalidCharacters && !invalidEmail
    
    return validEmail

  }

  validatePassword(password: string){

    const specialChars = /[!@#$%^&*-_]/

    const invalidCharacters = /[^a-zA-Z0-9!@#$%^&*_-]/.test(password);
    const shortPassword = password.length < 8
    const missingUppercase = !/[A-Z]/.test(password)
    const missingLowercase = !/[a-z]/.test(password)
    const missingNumber = !/[0-9]/.test(password)
    const missingSpecialChar = !specialChars.test(password)
    const validPassword: boolean = !invalidCharacters && !shortPassword && !missingUppercase && !missingLowercase && !missingNumber && !missingSpecialChar

    return validPassword

  }


  loginUser(email: string, password: string){
    console.log("loginUser", email, password)
  }
  registerUser(email: string, password: string, acceptedRules: boolean){
    const url = 'http://localhost:3000/api/users';
    const body = {
      email: email,
      password: password,
      acceptedRules: acceptedRules
    }

    return this.http.post<any>(url, body).subscribe(
      response => {
        if (response.success) {
          sessionStorage.setItem('isLogged', 'true');
          setTimeout(() => {
            window.location.reload();
          }, 1500)
        }
      },
      error => {
        console.error('Wystąpił błąd podczas rejestracji:', error);
      }
    );
  }

}
