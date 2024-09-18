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
    const refreshToken = localStorage.getItem('RefreshToken')
    return this.http.post<any>(ApiConfig.apiRefreshToken, {token: refreshToken})
  }

  saveNewTokens(accessToken: string, refreshToken: string){
    sessionStorage.setItem("accessToken", accessToken)
    localStorage.setItem("RefreshToken", refreshToken)
  }
}
