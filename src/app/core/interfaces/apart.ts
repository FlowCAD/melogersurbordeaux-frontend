export interface IApart {
  _id: string;
  code?: string;
  name: string;
  link: string;
  state: string;
  price: number;
  priceBySurface?: number;
  agencyPrice?: number;
  notaryFees?: number;
  district?: string;
  address?: string;
  lat?: number;
  lon?: number;
  surface: number;
  surfaceCarrez?: number;
  exterior?: string;
  surfaceExterior?: number;
  exposition?: string;
  visAVis?: boolean;
  floor?: number;
  floors?: number;
  dpe?: string;
  ges?: string;
  parking?: boolean;
  bikeParking?: boolean;
  annualCondominiumFees?: number;
  description?: string;
  image?: string;
  comments: IComment[];
  createdBy?: string;
  createdAt?: string;
}

export interface IComment {
  text: string;
  author: string;
  date?: string;
}

export class Apart {
  public _id: string;
  public code?: string;
  public name: string;
  public link: string;
  public state: string;
  public price: number;
  public priceBySurface?: number;
  public agencyPrice?: number;
  public notaryFees?: number;
  public district?: string;
  public address?: string;
  public lat?: number;
  public lon?: number;
  public surface: number;
  public surfaceCarrez?: number;
  public exterior?: string;
  public surfaceExterior?: number;
  public exposition?: string;
  public visAVis?: boolean;
  public floor?: number;
  public floors?: number;
  public dpe?: string;
  public ges?: string;
  public parking?: boolean;
  public bikeParking?: boolean;
  public annualCondominiumFees?: number;
  public description?: string;
  public image?: string;
  public comments: IComment[];
  public createdBy?: string;
  public createdAt?: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.link = '';
    this.state = 'new';
    this.price = 0;
    this.surface = 0;
    this.comments = [];
  }
}