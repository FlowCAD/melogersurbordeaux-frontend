export interface IDistrict {
  code: string;
  label: string;
  prices?: IPricesList;
}

interface IPricesList {
  [key: string]: {
    prix_moy: number;
    prix_max: number;
    prix_min: number;
  }
}
