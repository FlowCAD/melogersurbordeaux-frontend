import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ApartService } from '@core/services/apart.service';
import { IApart } from '@core/interfaces';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  public dataSource: MatTableDataSource<IApart>;
  public apartments: IApart[];
  public columnsToDisplay = ['name', 'description', 'comments'];

  constructor(
    private _router: Router,
    private _apartService: ApartService
  ) {
    this.apartments = [];
    this.dataSource = new MatTableDataSource(this.apartments);
  }

  ngOnInit(): void {
    this._getApartList();
  }

  public onClick(appart: IApart) {
    this._router.navigate([`/apartments/${appart.name}`]);
  }

  private _getApartList(): void {
    this._apartService.getApartList()
      .subscribe(
        res => {
          this.apartments = res;
          this.dataSource.data = this.apartments;
          this.dataSource.sort = this.sort;
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
