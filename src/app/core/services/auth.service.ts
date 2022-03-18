import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private http: HttpClient,
    private _router: Router
  ) { }

  public registerUser(user: IUser): Observable<IJwt> {
    return this.http.post<IJwt>(`${this._serverUrl}/register`, user);
  }

  public loginUser(user: IUser): Observable<IJwt> {
    return this.http.post<IJwt>(`${this._serverUrl}/login`, user);
  }

  public logoutUser(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
