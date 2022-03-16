import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApart } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApartService {
  private readonly _serverUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  public getApart(): Observable<IApart[]> {
    return this.http.get<IApart[]>(`${this._serverUrl}/appart`);
  }
}
