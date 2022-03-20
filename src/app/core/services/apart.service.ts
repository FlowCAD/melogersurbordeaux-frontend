import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IApart } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApartService {
  private readonly env = environment;
  private _serverUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this._serverUrl = this.env.apiUrl;
  }

  public getApart(): Observable<IApart[]> {
    return this.http.get<IApart[]>(`${this._serverUrl}/appart`);
  }
}
