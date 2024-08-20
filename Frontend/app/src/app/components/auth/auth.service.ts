import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidationResult, PasswordValidationResult } from './auth.interface'
import { catchError, map, Observable, of } from 'rxjs';

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
    const url = 'http://localhost:3000/v01/api/auth/login'
    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(url, body).pipe(
      map(response => {
        if(response.success){
          sessionStorage.setItem('isLogged', 'true')
          return {type: 'success'}
        } 
        else if(response.invalidPassword){
          return {type: 'invalidPassword', message: response.message}
        }  
        else {
          return { type: 'error', message: response.message}
        }
      }),
      catchError(error => {
        return of({type: 'error', message: 'Server error'})
      })
    )
  }
  registerUser(userData: any): Observable<{ type: string; message?: string }>{
    const url = 'http://localhost:3000/v01/api/auth/signup'
    const body = {
      email: userData.email,
      password: userData.password,
      acceptedRules: userData.acceptedRules,
      createdAt: userData.createdAt
    }

    return this.http.post<any>(url, body).pipe(
      map(response => {

        if(response.success){
          sessionStorage.setItem('isLogged', 'true')
          return { type:  'success' }
        } 
        else {
          return { type: 'error', message: 'Unknow error'}
        }
      }),
      catchError(error => {
        if(error.status === 409){
          return of({ type: 'invalidEmail', message: 'Email already exists'})
        } 
        return of({ type: 'error', message: 'Server error' });
      })
    );
  }

}
