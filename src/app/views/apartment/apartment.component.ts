import { Component, OnInit, ViewChild } from '@angular/core';

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
    private _apartService: ApartService
  ) {
    this.apartments = [];
    this.dataSource = new MatTableDataSource(this.apartments);
  }

  ngOnInit(): void {
    this._getApart();
  }

  public onClick(appart: IApart) {
    console.log(appart);
  }

  private _getApart(): void {
    this._apartService.getApart()
      .subscribe(
        res => {
          this.apartments = res;
          this.dataSource.data = this.apartments;
          this.dataSource.sort = this.sort;
        },
        err => console.error(err)
      )
  }

}
