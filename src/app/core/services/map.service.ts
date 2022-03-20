import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly env = environment;
  private _serverUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this._serverUrl = this.env.apiUrl;
  }

  public _getApiKey(): Observable<string> {
    return this.http.get<string>(`${this._serverUrl}/get-map-key`);
  }
}
