import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Map, MapOptions, latLng, tileLayer, TileLayer, marker, Icon, icon } from 'leaflet';

import { ApartService } from '@core/services/apart.service';
import { Apart } from '@core/interfaces';

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
export class FormMapDialogComponent implements OnInit {
  public latitude: number = 44.835;
  public longitude: number = -0.57;

  // Since the map is provided by an outside context, it's defined value will not be know at instantiation time.
  //  As such, we'll use the "Definite Assignment Assertion" (!) to tell TypeScript that we know this value will
	//  be defined in some way by the time we use it; and, that TypeScript should not worry about the value until then.
  public map!: Map;
  public mapOptions: MapOptions;
  public tileLayerWiki: TileLayer;
  public layers: any;
  readonly MARKER_ICON: Icon;

  constructor(
    public dialogRef: MatDialogRef<FormMapDialogComponent>,
    private _apartService: ApartService,
    private _snackBar: MatSnackBar,
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
    this.layers = [ marker([ this.latitude , this.longitude ], { icon: this.MARKER_ICON })];
    this.mapOptions = {
      layers: [ this.tileLayerWiki ],
      zoom: 13.5,
      minZoom: 13,
      maxZoom: 19,
      center: latLng([ this.latitude , this.longitude ])
    };
  }

  ngOnInit(): void {

  }

  public isDisabled(): boolean {
    return (this.data.lat === this.latitude && this.data.lon === this.longitude);
  }

  public onMapReady(map: Map) {
    this.map = map;
  }

  public handleMapMove(event: any) {
    const newCenter = event.target.getCenter();
    this.latitude = newCenter.lat;
    this.longitude = newCenter.lng;
  }

  public saveCoordinates() {
    // const payload = {
    //   text: this.comment,
    //   author: localStorage.getItem('userName') || 'admin'
    // }
    // this._apartService.addCommentOnApart(this.data.appartCode, payload).subscribe(
    //   (appart: Apart) => {
    //     this._snackBar.open('Commentaire ajouté', 'OK');
    //     this.dialogRef.close(appart);
    //   },
    //   err => console.error(err)
    // )
  }

}
