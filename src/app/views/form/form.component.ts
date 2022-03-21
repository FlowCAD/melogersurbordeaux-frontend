import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApartService } from '@core/services/apart.service';
import { IApart } from '@core/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public loading: boolean;
  public apart!: IApart;

  constructor(
    private _router: Router,
    private _apartService: ApartService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this._getApart();
  }

  public save() {
    console.log('appart: ', this.apart);
  }

  private _getApart(): void {
    this.loading = true;
    const name = this._router.url.replace('/apartments/','');

    this._apartService.getApart(name)
      .subscribe(
        (res: IApart) => {
          console.log(res);
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
