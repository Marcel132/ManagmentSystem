import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiConfig } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  
  constructor(
    private http: HttpClient,
  ) { }
  
  // ---- resources.component.ts ----
  private resources: any | null = null
  private clearResourceDataCache(){
    this.resources = null
  }
  
  getResourcesData(): Observable<any>{

    if(this.resources != null){
      return of(this.resources)
    }

    const url = ApiConfig.apiResourcesData
    console.log(url)

    return this.http.get<any>(url).pipe(
      map((data) => {
        this.resources = data
        return data
      }),
      catchError((err) => {
        console.log(err)
        return of(err)
      })
    )
  }
  
  // ---- settings.component.ts ----

  private userData: any | null = null;
  

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

  private clearUserDataCache(){
    this.userData = null
  }
  
  getUserSettingsData(): Observable<any> {

    if(this.userData != null){
      return of(this.userData)
    }
    const url = ApiConfig.apiSettingsData
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${accessToken}`
    // })
    
    return this.http.get<any>(url).pipe(
      map((data)=> {
        this.userData = data
        return data
      }),
      catchError(error=> {
        console.log("Error: Cannot get user data", error)
        return of(error)
      })
    )
  }
  
  changeUsername(accessToken: string, username: string): Observable<any> {
    const url = ApiConfig.apiChangeUsername
    const body = {
      username: username   
    }
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    }
    
    return this.http.put<any>(url, body, {headers}).pipe(
      map((res) => {
        if(res.updated){
          this.clearUserDataCache()
        }
        return res
      }),
      catchError((error)=>{
        console.log("Error: Cannot change username", error)
        return of(error)
      })
    )
  }
  
  changePassword(accessToken: string, password: string): Observable<any>{
    const url = ApiConfig.apiChangePassword
    const body = {
      password: password
    }
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    }
    return this.http.put<any>(url, body, {headers}).pipe(
      map((res) => {
        if(res.updated){
          this.clearUserDataCache()
        }
        return res
      }),
      catchError((error) => {
        console.log("Error: Cannot change password", error)
        return of(error)
      })
    )
  }
  
  deleteAccount(accessToken: string): Observable<any> {
    const url = ApiConfig.apiDeleteAccount
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    }
    return this.http.delete<any>(url, {headers}).pipe(
      map((res) => {
        if(res.deleted){
          this.clearUserDataCache()
        }
        return res
      }),
      catchError((error) => {
        console.log("Error: Cannot delete account", error)
        return of(error)
      })
    )
  }
}
