import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Map, MapOptions, latLng, tileLayer, TileLayer, marker, Icon, icon, Marker, LatLng } from 'leaflet';

interface IDialogData {
  mode: 'creation' | 'edition' | 'normal';
  appartCode: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-form-map-dialog',
  templateUrl: './form-map-dialog.component.html',
  styleUrls: ['./form.component.css']
})
export class FormMapDialogComponent {
  public latitude: number = 44.835;
  public longitude: number = -0.57;

  // Since the map is provided by an outside context, it's defined value will not be know at instantiation time.
  //  As such, we'll use the "Definite Assignment Assertion" (!) to tell TypeScript that we know this value will
	//  be defined in some way by the time we use it; and, that TypeScript should not worry about the value until then.
  public map!: Map;
  public mapOptions: MapOptions;
  public tileLayerWiki: TileLayer;
  public layer: Marker<LatLng>;
  readonly MARKER_ICON: Icon;

  constructor(
    public dialogRef: MatDialogRef<FormMapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.MARKER_ICON = icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });
    const osmAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    this.tileLayerWiki = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', { attribution: osmAttribution});
    this.layer = marker(
      [ this.latitude , this.longitude ],
      { icon: this.MARKER_ICON }
    );
    this.mapOptions = {
      layers: [ this.tileLayerWiki ],
      zoom: 16,
      minZoom: 13,
      maxZoom: 18,
      center: latLng([ this.latitude , this.longitude ])
    };
  }

  public isDisabled(): boolean {
    const latitudeIsEqual = (this.data.lat.toFixed(5) === this.latitude.toFixed(5));
    const longitudeIsEqual = (this.data.lon.toFixed(5) === this.longitude.toFixed(5));
    return (latitudeIsEqual && longitudeIsEqual);
  }

  public onMapReady(map: Map) {
    this.map = map;
    if (this.data.lat && this.data.lon) {
      this.map.panTo(new LatLng(this.data.lat, this.data.lon));
    }
  }

  public handleMapMove(event: any) {
    const newCenter = event.target.getCenter();
    this.latitude = newCenter.lat;
    this.longitude = newCenter.lng;

    this.layer = marker(
      [newCenter.lat, newCenter.lng],
      { icon: this.MARKER_ICON }
    );
  }

  public saveCoordinates() {
    const updatedCoordinates = {
      lat: +this.latitude.toFixed(5),
      lon: +this.longitude.toFixed(5)
    };
    this.dialogRef.close(updatedCoordinates);
  }

}
