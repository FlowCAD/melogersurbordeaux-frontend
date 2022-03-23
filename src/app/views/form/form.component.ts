import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApartService } from '@core/services/apart.service';
import { IApart, Apart } from '@core/interfaces';

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
  public states: {value: string, viewValue: string}[];
  public commentPanelOpenState: boolean = false;
  private apartBackup!: Apart;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _apartService: ApartService
  ) {
    this.states = [
      {value: 'new', viewValue: 'Nouveau'},
      {value: 'accepted', viewValue: 'A visiter'},
      {value: 'refused', viewValue: 'Refusé'}
    ];
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

    if (this.mode === 'creation') api = this._apartService.addApart(this.apart);
    else if (this.mode === 'edition') api = this._apartService.updateApart(this.pk, this.apart);
    else return;

    api.subscribe(
      res => {
        console.log(res);
        this.mode = 'normal';
        this.loading = false;
      },
      err => console.error(err)
    )

  }

  private _getApart(): void {
    this.loading = true;

    this._apartService.getApart(this.pk)
      .subscribe(
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

}
