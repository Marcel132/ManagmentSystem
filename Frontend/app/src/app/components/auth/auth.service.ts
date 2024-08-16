import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }


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
