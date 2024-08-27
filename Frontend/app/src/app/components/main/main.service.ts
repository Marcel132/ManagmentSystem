import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(
    private http: HttpClient
  ) { }
  
  getUserSettingsData() {
    const url = 'http://localhost:3000/v01/api/users/settings'
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
    })

    return this.http.get<any>(url)
  }
  changeUsername() {
   
  }
}
