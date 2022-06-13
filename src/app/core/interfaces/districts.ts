export interface IDistrict {
  code: string;
  label: string;
  prices?: IPricesList;
}

interface IPricesList {
  [key: string]: IPricesItem
}

export interface IPricesItem {
  prix_moy: number;
  prix_max: number;
  prix_min: number;
}

export interface IPriceInflation {
  districtName: string;
  districtCode: string;
  priceInflationAsPercent: number;
  priceInflationAsEuros: number;
  time: number;
}
