import { Component, OnInit } from '@angular/core';

import { DistrictService } from '@core/services/district.service';
import { IDistrict } from '@core/interfaces';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public loading: boolean;
  public districtsList: IDistrict[];

  constructor(
    private _districtService: DistrictService
  ) {
    this.loading = false;
    this.districtsList = [];
  }

  ngOnInit(): void {
    this._getDistrictList();
  }

  private async _getDistrictList() {
    this.loading = true;

    this.districtsList = await this._districtService.getDistrictList().toPromise();
    this.loading = false;
    console.log('this.districtsList:', this.districtsList);
  }

}
