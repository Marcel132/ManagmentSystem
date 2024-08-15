import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _changeFormsSubject = new BehaviorSubject<boolean>(true)

  get changeFormValue$(){
    return this._changeFormsSubject.asObservable();
  }

  set changeFormValue(value: boolean) {
    this._changeFormsSubject.next(value);
  }
}
