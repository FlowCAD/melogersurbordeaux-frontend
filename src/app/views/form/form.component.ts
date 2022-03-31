import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ApartService } from '@core/services/apart.service';
import { IApart, Apart } from '@core/interfaces';
import { FormCommentDialogComponent } from '@views/form/form-comment-dialog.component';
import { FormMapDialogComponent } from '@views/form/form-map-dialog.component';
import { STATES_ARRAY } from '@core/constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public pk: string = '';
  public loading: boolean = false;
  public mode: 'creation' | 'edition' | 'normal' = 'normal';
  public apart!: Apart;
  public types: string[];
  public states = STATES_ARRAY;
  public districts: string[];
  public exteriorOptions: string[];
  public expositions: string[];
  public diagValues: string[];
  public commentPanelOpenState: boolean = false;
  private apartBackup!: Apart;

  constructor(
    public dialog: MatDialog,
    private _datePipe: DatePipe,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _apartService: ApartService,
    private _snackBar: MatSnackBar
  ) {
    this.types = ['T2', 'T2-Bis', 'T3', 'T3-Bis', 'T4'];
    this.districts = ['Saint Augustin', 'Saint Genès', 'La Bastide', 'Nansouty', 'Saint Paul', 'Saint Pierre', 'Chartrons', 'Autre'];
    this.exteriorOptions = ['Terasse', 'Balcon', 'Loggia', 'Jardin', 'Autre', 'Aucun'];
    this.expositions = ['Sud', 'Est', 'Nord', 'Ouest', 'Nord-Sud', 'Est-Ouest', 'Sud-Ouest', 'Sud-Est', 'Autre'];
    this.diagValues = [...'ABCDE'];
  }

  ngOnInit(): void {
    this.pk = this._activatedRoute.snapshot.paramMap.get("pk") || 'new';
    if (this.pk === 'new') {
      this.mode = 'creation';
      this.apart = new Apart();
    } else {
      this._getApart();
    }
  }

  public onClickOpenMap() {
    const data = {
      mode: this.mode,
      appartCode: this.pk,
      lat: this.apart.lat,
      lon: this.apart.lon
    }
    const dialogRef = this.dialog.open(FormMapDialogComponent, {minWidth: '500px', minHeight: '500px', data});
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.apart.lat = res.lat;
          this.apart.lon = res.lon;
        }
      },
      err => console.error(err)
    );
  }

  public onChangePrice() {
    this._computePriceBySurface();
    this.apart.notaryFees = this.apart.price * 9 / 100;
  }

  public onChangeSurface() {
    this._computePriceBySurface();
  }

  public onChangeParking() {
    this.apart.parking = !this.apart.parking;
    this._computePriceBySurface();
  }

  public edit() {
    this.apartBackup = {...this.apart};
    this.mode = 'edition';
  }

  public cancel() {
    this.apart = {...this.apartBackup};
    this.mode = 'normal';
  }

  public save() {
    this.loading = true;
    let api: Observable<IApart>;

    if (this.mode === 'creation') {
      this.apart = {...this.apart, createdBy: localStorage.getItem('userName') || 'admin'};
      api = this._apartService.addApart(this.apart);
    } else if (this.mode === 'edition') api = this._apartService.updateApart(this.pk, this.apart);
    else return;

    api.subscribe(
      res => {
        this._snackBar.open('Sauvegarde effectuée', 'OK');
        if (this.mode === 'creation') {
          this.pk = res.code || 'new';
          this._router.navigateByUrl(`/apartments/${res.code}`);
        }
        this.mode = 'normal';
        this.loading = false;
      },
      err => console.error(err)
    )

  }

  public getFooterText(): string {
    const id = this.apart._id;
    const createdAt = this._datePipe.transform(this.apart.createdAt,'dd/MM/yyyy');;
    const createdBy = this.apart.createdBy;

    return `${id} - Créé par ${createdBy} le ${createdAt}`;
  }

  public addComment() {
    const data = { appartCode: this.pk }
    const dialogRef = this.dialog.open(FormCommentDialogComponent, { width: '400px', data });

    dialogRef.afterClosed().subscribe(
      (appart: Apart) => {
        if (appart) this.apart = appart
      },
      err => console.error(err)
    );
  }

  private _getApart(): void {
    this.loading = true;

    this._apartService.getApart(this.pk).subscribe(
      (res: Apart) => {
        this.apart = res;
        this.loading = false;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }

  private _computePriceBySurface(): void {
    if (!this.apart.price || !this.apart.surface) return

    const priceToConsider = this.apart.price - (this.apart.parking ? 10000 : 0);
    const priceBySurface = priceToConsider / this.apart.surface;
    this.apart.priceBySurface = Math.round(priceBySurface * 100) / 100;
  }

}
