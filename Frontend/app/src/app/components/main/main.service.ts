import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(
    private http: HttpClient,
  ) { }
  
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
  
  getUserSettingsData(token: string): Observable<any> {
    const url = ApiConfig.apiSettingsData
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    
    return this.http.get<any>(url, {headers})
  }
  
  changeUsername(token: string, username: string): Observable<any> {
    const url = ApiConfig.apiChangeUsername
    const body = {
      username: username   
    }
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    
    return this.http.put<any>(url, body, {headers})
  }
  
  changePassword(token: string, password: string): Observable<any>{
    const url = ApiConfig.apiChangePassword
    const body = {
      password: password
    }
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.put(url, body, {headers})
  }
  deleteAccount(token: string): Observable<any> {
    const url = ApiConfig.apiDeleteAccount
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.delete(url, {headers})
  }
}
