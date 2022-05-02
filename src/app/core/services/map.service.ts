import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tileLayer, TileLayer } from 'leaflet';

import { environment } from '../../../environments/environment';
import { OSM_ATTRIBUTION } from '@core/constants';

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

  get baseLayersList(): {[key: string]: TileLayer} {
    const baseLayersList = {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: OSM_ATTRIBUTION}),
      'OSM Hot': tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { attribution: OSM_ATTRIBUTION}),
      'OSM Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { attribution: OSM_ATTRIBUTION}),
      'Imagerie': tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      'Topo': tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png')
    };
    return baseLayersList;
  }

}
