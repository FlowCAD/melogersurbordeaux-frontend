import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _serverUrl = "http://localhost:3000/";

  constructor(
    private http: HttpClient
  ) { }

  public registerUser(user: IUser) {
    return this.http.post(`${this._serverUrl}register`, user);
  }

  public loginUser(user: IUser) {
    return this.http.post(`${this._serverUrl}login`, user);
  }
}
