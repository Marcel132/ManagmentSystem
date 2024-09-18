import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '../components/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(
    private http: HttpClient,
  ) { }

  refreshToken(): Observable<any>{
    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    return this.http.post<any>(ApiConfig.apiRefreshToken, {accessToken, refreshToken})
  }


  saveNewToken(accessToken: string){
    sessionStorage.setItem("accessToken", accessToken)
  }
}
