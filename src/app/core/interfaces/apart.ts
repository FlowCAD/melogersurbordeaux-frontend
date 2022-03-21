export interface IApart {
  _id: string;
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