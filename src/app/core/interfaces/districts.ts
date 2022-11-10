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
  priceInflationAsPercent: string;
  priceInflationAsEuros: string;
  time: number;
}

interface IMADistrict {
  id: number;
  code: string;
  name: string;
  ma_code: string;
  ma_url: string;
}

export interface IMADistrictExtended extends IMADistrict {
  added_prices: IPricesItem;
}

export interface IMADistrictPayload extends IMADistrict {
  prices: IPricesList;
}