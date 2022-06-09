import { Component, OnInit } from '@angular/core';

import { DistrictService } from '@core/services/district.service';
import { IDistrict, IPriceInflation } from '@core/interfaces';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public loading: boolean;
  public districtsList: IDistrict[];
  public priceInflation: IPriceInflation[];

  constructor(
    private _districtService: DistrictService
  ) {
    this.loading = false;
    this.districtsList = [];
    this.priceInflation = [];
  }

  ngOnInit(): void {
    this._getDistrictList();
  }

  private async _getDistrictList() {
    this.loading = true;

    this.districtsList = await this._districtService.getDistrictList().toPromise();
    this.loading = false;
    this._computePriceInflation();
  }

  private _computePriceInflation() {
    this.districtsList.forEach((district: IDistrict) => {
      if (!district.prices) return;

      // TODO Order is not guaranteed in an object, that's why a better solution is needed
      const olderPriceMoy = district.prices[Object.keys(district.prices)[0]].prix_moy;
      const mostRecentPriceMoy = district.prices[Object.keys(district.prices)[Object.keys(district.prices).length - 1]].prix_moy;
      const priceInflationAsPercent = +((mostRecentPriceMoy * 100 / olderPriceMoy) - 100).toFixed(2);
      const priceInflationAsEuros = +(priceInflationAsPercent * olderPriceMoy / 100).toFixed(2);
      this.priceInflation.push({
        districtName: district.label,
        districtCode: district.code,
        priceInflationAsPercent,
        priceInflationAsEuros,
        time: Object.keys(district.prices).length
      });
    })
  }

}
