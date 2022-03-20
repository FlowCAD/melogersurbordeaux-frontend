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

  public getApartList(): Observable<IApart[]> {
    return this.http.get<IApart[]>(`${this._serverUrl}/appart`);
  }

  public addApart(apart: IApart): Observable<IApart> {
    return this.http.post<IApart>(`${this._serverUrl}/appart`, apart);
  }

  public getApart(name: string): Observable<IApart> {
    return this.http.get<IApart>(`${this._serverUrl}/appart/${name}`);
  }

  public updateApart(name: string, apart: IApart): Observable<IApart> {
    return this.http.patch<IApart>(`${this._serverUrl}/appart/${name}`, apart);
  }

  public addCommentOnApart(name: string, comment: string): Observable<IApart> {
    return this.http.post<IApart>(`${this._serverUrl}/appart/${name}`, comment);
  }

  public deleteApart(name: string): Observable<IApart> {
    return this.http.delete<IApart>(`${this._serverUrl}/appart/${name}`);
  }
}
