import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ApartService } from '@core/services/apart.service';
import { IApart } from '@core/interfaces';
import { STATES, DISCTRICTS } from '@core/constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  public loading: boolean;
  public dataSource: MatTableDataSource<IApart>;
  public apartments: IApart[];
  public columnsToDisplay = [
    'name',
    'type',
    'state',
    'price',
    'priceBySurface',
    'district',
    'surface',
    'exposition',
    'comments',
    'createdAt'
  ];
  public states: {[key: string]: { label: string, color: string }};
  public districtsObject: {[key: string]: string} = {};

  constructor(
    private _router: Router,
    private _apartService: ApartService
  ) {
    this.loading = false;
    this.apartments = [];
    this.dataSource = new MatTableDataSource(this.apartments);
    this.states = STATES;
    DISCTRICTS.forEach(district => this.districtsObject[district.key] = district.value);
  }

  ngOnInit(): void {
    this._getApartList();
  }

  public onClick(appart: IApart) {
    this._router.navigate([`/list/${appart.code}`]);
  }

  private _getApartList(): void {
    this.loading = true;

    this._apartService.getApartList()
      .subscribe(
        res => {
          this.apartments = res;
          this.dataSource.data = this.apartments;
          this.dataSource.sort = this.sort;
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
