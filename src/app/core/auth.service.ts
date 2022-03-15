import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/register";

  constructor(
    private http: HttpClient
  ) { }

  public registerUser(user: IUser) {
    return this.http.post<any>(this._registerUrl, user);
  }
}
