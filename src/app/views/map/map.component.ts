import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Map, MapOptions, latLng, tileLayer, TileLayer, geoJSON, marker, icon, Icon } from 'leaflet';

import { ApartService } from '@core/services/apart.service';
import { MapService } from '@core/services/map.service';
import { CryptoService } from '@core/services/crypto.service';

import { Apart } from '@core/interfaces';
import { MARKER_ICON, OSM_ATTRIBUTION } from '@core/constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Since the map is provided by an outside context, it's defined value will not be know at instantiation time.
  //  As such, we'll use the "Definite Assignment Assertion" (!) to tell TypeScript that we know this value will
	//  be defined in some way by the time we use it; and, that TypeScript should not worry about the value until then.
  public map!: Map;
  public mapOptions: MapOptions;
  public lat: number;
  public lng: number;
  public tileLayerWiki : TileLayer;
  public layersControl: any;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _apartService: ApartService,
    private _mapService: MapService,
    private _crypto: CryptoService
  ) {
    this.lat = 44.835;
    this.lng = -0.57;
    this.tileLayerWiki = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', { attribution: OSM_ATTRIBUTION});
    this.mapOptions = {
      layers: [ this.tileLayerWiki ],
      zoom: 13.5,
      minZoom: 13,
      maxZoom: 19,
      center: latLng([ this.lat, this.lng])
    };
  }

  ngOnInit(): void {
    this._initMap();
    this._getMapApiKey();
  }

  public onMapReady(map: Map) {
    this.map = map;
    this.http.get('assets/geojsons/ped_15mn.json').subscribe((json: any) => geoJSON(json).addTo(this.map).bindTooltip(json.properties.title))

    this.http.get('assets/geojsons/districts.geojson').subscribe((geojson: any) => geoJSON(geojson).addTo(this.map))

    this._displayApartMarkers();
  }

  public handleMapMove(event: any) {
    const newCenter = event.target.getCenter();
    this.lat = newCenter.lat;
    this.lng = newCenter.lng;
  }

  private _initMap() {
    const mainLayer = {'Wikimedia Maps': this.tileLayerWiki};
    this.layersControl = {
      baseLayers: {...mainLayer, ...this._mapService.baseLayersList}
    };
  }

  private _getMapApiKey() {
    this._mapService._getApiKey()
      .subscribe(
        (res: any) => {
          let key = this._crypto.decrypt(res);
          console.log('key: ', key);
        },
        err => console.error(err)
      )
  }

  private async _displayApartMarkers() {
    try {
      const apartlist = await this._apartService.getApartList().toPromise();
      apartlist.forEach((apart: Apart) => {
        if (apart.lat && apart.lon) {
          const popupInfo = `<a href="/list/${apart.code}">${apart.name}</a>`;
          marker([apart.lat, apart.lon], { icon: MARKER_ICON })
            .addTo(this.map)
            .bindPopup(popupInfo);
        }
      });
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this._router.navigate(['/login']);
        }
      }
    }
  }
}
