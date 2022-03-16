import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '@core/interfaces';

interface IJwt {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _serverUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  public registerUser(user: IUser): Observable<IJwt> {
    return this.http.post<IJwt>(`${this._serverUrl}/register`, user);
  }

  public loginUser(user: IUser): Observable<IJwt> {
    return this.http.post<IJwt>(`${this._serverUrl}/login`, user);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}