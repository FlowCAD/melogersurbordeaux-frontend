import { Component, OnInit } from '@angular/core';

import { DistrictService } from '@core/services/district.service';
import { IDistrict, IPriceInflation, IPricesItem } from '@core/interfaces';

import { EChartsOption } from 'echarts';

interface IPriceEvolutionByDistrict {
  districtName: string;
  priceMinList: number[];
  priceMaxList: number[];
  priceMoyList: number[];
}

interface IPercentEvolutionOfPriceByDistrict {
  district: string;
  evolution: number[];
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public loading: boolean;
  public districtsList: IDistrict[];
  public priceInflation: IPriceInflation[];
  public lastMonthPriceInflation: IPriceInflation[];
  public selectedDistrict: string = '';

  public chartOption!: EChartsOption;
  public chartOption2!: EChartsOption;
  public chartOption3!: EChartsOption;

  constructor(
    private _districtService: DistrictService
  ) {
    this.loading = false;
    this.districtsList = [];
    this.priceInflation = [];
    this.lastMonthPriceInflation = [];
  }

  ngOnInit(): void {
    this._getDistrictList();
  }

  public onChangeSelectedDistrict(districtCode: string) {
    this._computePriceEvolutionForSpecificDistrict(districtCode);
  }

  private async _getDistrictList() {
    this.loading = true;

    this.districtsList = await this._districtService.getDistrictList().toPromise();
    this.loading = false;
    this.priceInflation = this._computePriceInflation();
    this.lastMonthPriceInflation = this._computePriceInflation(1);
    this._displayPriceEvolutionByDistrict();
    this._displayPricePercentEvolutionByDistrict();
  }

  private _computePriceInflation(duration?: number): IPriceInflation[] {
    const priceInflation: IPriceInflation[] = [];

    this.districtsList.forEach((district: IDistrict) => {
      if (!district.prices) return;

      let olderPriceMoy:number, mostRecentPriceMoy: number;
      if (!duration) {
        // TODO Order is not guaranteed in an object, that's why a better solution is needed
        olderPriceMoy = district.prices[Object.keys(district.prices)[0]].prix_moy;
        mostRecentPriceMoy = district.prices[Object.keys(district.prices)[Object.keys(district.prices).length - 1]].prix_moy;
      } else {
        const durationBoundedPrices = Object.keys(district.prices).slice(-(duration+1));
        olderPriceMoy = district.prices[durationBoundedPrices[0]].prix_moy;
        mostRecentPriceMoy = district.prices[durationBoundedPrices[durationBoundedPrices.length-1]].prix_moy;
      }

      const priceInflationAsPercent = +((mostRecentPriceMoy * 100 / olderPriceMoy) - 100).toFixed(2);
      const priceInflationAsEuros = +(priceInflationAsPercent * olderPriceMoy / 100).toFixed(2);
      priceInflation.push({
        districtName: district.label,
        districtCode: district.code,
        priceInflationAsPercent: this._convertNumberAsNumberWithSign(priceInflationAsPercent),
        priceInflationAsEuros: this._convertNumberAsNumberWithSign(priceInflationAsEuros),
        time: Object.keys(district.prices).length
      });
    })
    return priceInflation.sort((a, b) => Number(a.priceInflationAsPercent) - Number(b.priceInflationAsPercent));
  }

  private _convertNumberAsNumberWithSign(number: number): string {
    let text: string;
    switch (Math.sign(number)) {
      case -1:
        text = `${number}`;
        break;
      case 1:
        text = `+${number}`;
        break;
      case 0:
        text = `${number}`;
        break;
      default:
        text = 'N/A';
        break;
    }
    return text;
  }

  /**
   * Display month by month, the price evolution of all the districts side by side
   */
  private _displayPriceEvolutionByDistrict() {
    const priceEvolutionByDistrictList: IPriceEvolutionByDistrict[] = [];
    this.districtsList.forEach((district: IDistrict) => {
      if (!district.prices) return;

      const priceEvolutionByDistrict: IPriceEvolutionByDistrict = {
        districtName: district.label,
        priceMinList: [],
        priceMaxList: [],
        priceMoyList: []
      };

      Object.keys(district.prices).forEach((dateCode: string) => {
        if (!district.prices) return;
        const priceItem: IPricesItem = district.prices[dateCode];
        priceEvolutionByDistrict.priceMinList.push(priceItem.prix_min);
        priceEvolutionByDistrict.priceMaxList.push(priceItem.prix_max);
        priceEvolutionByDistrict.priceMoyList.push(priceItem.prix_moy);
      });

      priceEvolutionByDistrictList.push(priceEvolutionByDistrict);
    });

    this.chartOption2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: { backgroundColor: '#6a7985'}
        }
      },
      legend: {
        data: priceEvolutionByDistrictList.map(evol => evol.districtName),
        top: 'top'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this._convertDateCodeListToReadableDateList(this._getDateList()),
      },
      yAxis: {
        type: 'value',
        name: 'Prix au m²',
        min: 4000,
        axisLabel: {
          formatter: (value: number) => `${value}€`
        }
      },
      series: priceEvolutionByDistrictList.map(evol => { return { name: evol.districtName, type: 'line', data: evol.priceMoyList }})
    };
  }

  /**
   * Compute price evolution (min/max/moy) of a district month by month
   *  and display it in a chart
   * @param districtCode District code
   */
  private _computePriceEvolutionForSpecificDistrict(districtCode: string) {
    const district = this.districtsList.find((district: IDistrict) => district.code === districtCode);
    if (!district || !district.prices || Object.keys(district.prices).length === 0) return;

    const readableDateList = this._convertDateCodeListToReadableDateList(Object.keys(district.prices));

    const priceEvolutionByDistrict: IPriceEvolutionByDistrict = {
      districtName: district.label,
      priceMinList: [],
      priceMaxList: [],
      priceMoyList: []
    };

    Object.keys(district.prices).forEach((dateCode: string) => {
      if (!district.prices) return;
      const priceItem: IPricesItem = district.prices[dateCode];
      priceEvolutionByDistrict.priceMinList.push(priceItem.prix_min);
      priceEvolutionByDistrict.priceMaxList.push(priceItem.prix_max);
      priceEvolutionByDistrict.priceMoyList.push(priceItem.prix_moy);
    });

    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: { backgroundColor: '#6a7985'}
        }
      },
      legend: {
        data: ['Prix min', 'Prix moy', 'Prix max'],
        top: 'top'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: readableDateList,
      },
      yAxis: {
        type: 'value',
        name: 'Prix au m²',
        min: 2500,
        axisLabel: {
          formatter: (value: number) => `${value}€`
        },
      },
      series: [
        {
          name: 'Prix mini',
          type: 'line',
          data: priceEvolutionByDistrict.priceMinList
        },
        {
          name: 'Prix moyen',
          type: 'line',
          data: priceEvolutionByDistrict.priceMoyList
        },
        {
          name: 'Prix maxi',
          type: 'line',
          data: priceEvolutionByDistrict.priceMaxList
        }
      ]
    };
  }

  /**
   * Display month by month, the price percentage evolution of all the districts side by side
   */
  private _displayPricePercentEvolutionByDistrict() {
    const pricePercentEvolutionByDistrictList: IPercentEvolutionOfPriceByDistrict[] = [];
    this.districtsList.forEach((district: IDistrict) => {
      if (!district.prices) return;

      const pricePercentEvolutionByDistrict: IPercentEvolutionOfPriceByDistrict = {
        district: district.label,
        evolution: []
      };

      let prevObj: IPricesItem;
      Object.keys(district.prices).forEach((dateCode: string, index: number) => {
        if (!district.prices) return;

        const curObj = district.prices[dateCode];
        if (index === 0) {
          pricePercentEvolutionByDistrict.evolution.push(0);
          prevObj = {...curObj};
        } else {
          const percMoy: number = +((curObj.prix_moy * 100 / prevObj.prix_moy) - 100).toFixed(2);
          pricePercentEvolutionByDistrict.evolution.push(percMoy);
          prevObj = {...curObj};
        }
      });

      pricePercentEvolutionByDistrictList.push(pricePercentEvolutionByDistrict);
    });

    this.chartOption3 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: { backgroundColor: '#6a7985'}
        }
      },
      legend: {
        data: pricePercentEvolutionByDistrictList.map(evol => evol.district),
        top: 'top'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this._convertDateCodeListToReadableDateList(this._getDateList()),
      },
      yAxis: {
        type: 'value',
        name: '%',
        axisLabel: {
          formatter: (value: number) => `${this._convertNumberAsNumberWithSign(value)}%`
        }
      },
      series: pricePercentEvolutionByDistrictList.map(evol => { return { name: evol.district, type: 'line', data: evol.evolution }})
    };
  }

  /**
   * Get the exhaustive list of dates (YYYYMM format) available in the districtsList
   */
   private _getDateList(): string[] {
    let dateList: string[] = [];

    this.districtsList.forEach(district => {
      if(!district.prices) return;
      Object.keys(district.prices).forEach(date => {
        if(dateList.includes(date)) return;
        dateList.push(date);
      })
    });
    return dateList;
  }

  /**
   * Convert a list of date codes (YYYYMM format) to a list of readable dates (MM/YYYY)
   * @param dateCode List of date codes
   */
  private _convertDateCodeListToReadableDateList(dateCode: string[]): string[] {
    return dateCode.map((date: string) => `${date.slice(4, 6)}/${date.slice(0, 4)}`);
  }

  get loadingOpts(): Object {
    return {
      text: 'Chargement...',
      color: 'light-blue',
      textColor: 'dark-blue',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0
    };
  }
}
