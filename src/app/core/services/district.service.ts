import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IDistrict } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private readonly env = environment;
  private _serverUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this._serverUrl = this.env.apiUrl;
  }

  public getDistrictList(): Observable<IDistrict[]> {
    return this.http.get<IDistrict[]>(`${this._serverUrl}/district`);
  }

  public getDistrict(code: string): Observable<IDistrict> {
    return this.http.get<IDistrict>(`${this._serverUrl}/district/${code}`);
  }
}
