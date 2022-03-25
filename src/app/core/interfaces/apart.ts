export interface IApart {
  _id: string;
  code?: string;
  name: string;
  price: number;
  state: string;
  description: string;
  image: string;
  comments: IComment[];
  lat: number;
  lon: number;
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
  public price: number;
  public state: string;
  public description: string;
  public image: string;
  public comments: IComment[];
  public lat: number;
  public lon: number;
  public createdBy?: string;
  public createdAt?: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.price = 0;
    this.state = 'new';
    this.description = '';
    this.image = '';
    this.comments = [];
    this.lat = 0;
    this.lon = 0;
  }
}