export interface IApart {
  _id: string;
  code?: string;
  name: string;
  description: string;
  image: string;
  comments: IComment[];
  lat: number;
  lon: number;
}

interface IComment {
  text: string;
  date: string;
}

export class Apart {
  public _id: string;
  public code?: string;
  public name: string;
  public description: string;
  public image: string;
  public comments: IComment[];
  public lat: number;
  public lon: number;

  constructor() {
    this._id = '';
    this.name = '';
    this.description = '';
    this.image = '';
    this.comments = [];
    this.lat = 0;
    this.lon = 0;
  }
}