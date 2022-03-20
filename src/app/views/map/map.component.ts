import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Map, MapOptions, latLng, tileLayer, TileLayer, geoJSON } from 'leaflet';
import * as cryptoJS from 'crypto-js';

import { MapService } from '@core/services/map.service';

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
  public tileLayerOsm : TileLayer;
  public tileLayerWiki : TileLayer;
  public layersControl: any;

  constructor(
    private http: HttpClient,
    private _mapService: MapService
  ) {
    this.lat = 44.8454;
    this.lng = -0.5698;
    const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    this.tileLayerOsm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: osmAttribution});
    this.tileLayerWiki = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', { attribution: osmAttribution});
    this.mapOptions = {
      layers: [ this.tileLayerOsm, this.tileLayerWiki ],
      zoom: 13,
      minZoom: 13,
      maxZoom: 19,
      center: latLng([ this.lat, this.lng])
    };
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.tileLayerOsm,
        'Wikimedia Maps': this.tileLayerWiki
      }
    };
  }

  ngOnInit(): void {
    this._getMapApiKey();
  }

  public onMapReady(map: Map) {
    this.map = map;
    this.http.get('assets/geojsons/ped_15mn.json').subscribe((json: any) => {
      geoJSON(json).addTo(this.map).bindTooltip(json.properties.title);
    })
  }

  public handleMapMove(event: any) {
    const newCenter = event.target.getCenter();
    this.lat = newCenter.lat;
    this.lng = newCenter.lng;
  }

  private _getMapApiKey() {
    this._mapService._getApiKey()
      .subscribe(
        (res: any) => {
          let key = cryptoJS.AES.decrypt(res, 'myGreatPass').toString(cryptoJS.enc.Utf8);
          console.log('key: ', key);
        },
        err => console.error(err)
      )
  }
}
