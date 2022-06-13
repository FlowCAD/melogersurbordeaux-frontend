import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Map, MapOptions, latLng, tileLayer, TileLayer, geoJSON, circleMarker, CircleMarker, LatLng, marker } from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';

import { ApartService } from '@core/services/apart.service';
import { DistrictService } from '@core/services/district.service';
import { MapService } from '@core/services/map.service';
import { CryptoService } from '@core/services/crypto.service';

import { Apart, IDistrict } from '@core/interfaces';
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
  private _circleMarkerList: {[key: string]: CircleMarker<any>} = {};

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _apartService: ApartService,
    private _districtService: DistrictService,
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
      maxZoom: 18,
      center: latLng([ this.lat, this.lng])
    };
  }

  ngOnInit(): void {
    this._initMap();
    this._getMapApiKey();
  }

  public onMapReady(map: Map) {
    this.map = map;

    this.map.on('click', () => this._resetCircleMarkerListStyle());

    new Geocoder({
      collapsed: false,
      placeholder: 'Rechercher',
      errorMessage: 'Aucun résultat.',
      showUniqueResult: false,
      showResultIcons: true,
      defaultMarkGeocode: false
    })
      .addTo(this.map)
      .on('markgeocode', e => {
        const latlng: LatLng = e.geocode.center;
        marker(latlng, { icon: MARKER_ICON })
          .bindPopup(e.geocode.html || e.geocode.name)
          .openPopup()
          .addTo(map);
        map.flyTo(latlng, 17);
      });

    this._displayIsochrones();
    this._displayDistrictsLayer();
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
    const circleMarkerOptions = {
      radius: 10,
      fillColor: '#94CDFE',
      color: '#2C58A5',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };

    try {
      const apartList = await this._apartService.getApartList().toPromise();
      apartList.forEach((apart: Apart) => {
        if (apart.lat && apart.lon) {
          let currentCircleMarker: CircleMarker<any>;
          currentCircleMarker = circleMarker(
            [apart.lat, apart.lon],
            circleMarkerOptions
          )
            .addTo(this.map)
            .on('click', () => {
              this._resetCircleMarkerListStyle();
              currentCircleMarker.setStyle({fillColor: '#105EE5'});
            })
            .bindPopup(`<a href="/list/${apart.code}">${apart.name}</a>`);
          this._circleMarkerList[apart.name] = currentCircleMarker;
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

  private async _displayDistrictsLayer() {
    try {
      const districtsList: any = await this.http.get('assets/geojsons/districts.geojson').toPromise();
      const districtsPricesList: IDistrict[] = await this._districtService.getDistrictList().toPromise();

      districtsList.features.forEach((item: any) => {
        const districtPrices = districtsPricesList.find(districtPrices => (districtPrices.code === item.properties.ma_code));
        if (districtPrices && districtPrices.prices) {
          const lastKey = Object.keys(districtPrices.prices)[Object.keys(districtPrices.prices).length - 1];
          item.properties.prices = districtPrices.prices[lastKey];
          item.properties.pricesUpdate = lastKey;
        }
      })
      this.layersControl.overlays = {
        ...this.layersControl.overlays,
        'Quartiers': geoJSON(
          districtsList,
          {
            style: { 'color': '#ff7800', 'weight': 2, 'opacity': 0.5 },
            onEachFeature: (feature, layer) => {
              let popupContent = `<b>${feature.properties.nom}</b>`;
              if (feature.properties.prices) {
                popupContent += `<br><br>Prix au m&#178; moyen: <b>${feature.properties.prices.prix_moy}€</b><br>`;
                popupContent += `(min: ${feature.properties.prices.prix_min} / max: ${feature.properties.prices.prix_max})`;
                popupContent += `<br><br><i style="color:grey">mise à jour ${feature.properties.pricesUpdate}</i>`;
              };
              layer.bindPopup(popupContent);
            }
          }
        )
      };
    } catch (err) {
      console.error('Erreur lors de la récupération des quartiers.', err);
    }
  }

  private async _displayIsochrones() {
    try {
      const isochroneObject: any = await this.http.get('assets/geojsons/ped_15mn.json').toPromise()
      this.layersControl.overlays = {
        ...this.layersControl.overlays,
        'Isochrone - 15mn': geoJSON(
          isochroneObject,
          {
            style: { 'color': '#3df037', 'weight': 2, 'opacity': 0.5 },
            onEachFeature: (feature, layer) => layer.bindTooltip(`<i>${feature.properties.title}</i>`)
          }
        )
      };
    } catch (err) {
      console.error('Erreur lors de la récupération des isochrones.', err);
    }
  }

  private _resetCircleMarkerListStyle() {
    for (const k in this._circleMarkerList) {
      this._circleMarkerList[k].setStyle({fillColor: '#94CDFE'});
    }
  }

}
