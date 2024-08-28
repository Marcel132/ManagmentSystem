import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(
    private http: HttpClient
  ) { }
  
  getUserSettingsData(token: string): Observable<any> {
    const url = 'http://localhost:3000/v01/api/users/settings/users_data'
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(url, {headers})
  }
  changeUsername(username: string) {
    const url = 'http://localhost:300/v01/api/users/settings/change_username'
    const body = {
      username: username   
    }

    return this.http.post<any>(url, body).pipe(
      map(response => {

      }),
      catchError(error => {
        return of()
      })
    )
  }
}
