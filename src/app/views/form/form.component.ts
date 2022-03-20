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

  constructor(
    private _router: Router,
    private _apartService: ApartService
  ) { }

  ngOnInit(): void {
    this._getApart();
  }

  private _getApart(): void {
    const name = this._router.url.replace('/apartments/','');
    this._apartService.getApart(name)
      .subscribe(
        (res: IApart) => console.log(res),
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
