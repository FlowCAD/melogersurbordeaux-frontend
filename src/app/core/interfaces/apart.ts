export interface IApart {
  name: string;
  description: string;
  image: string;
  comments: IComment[];
}

interface IComment {
  text: string;
  date: string;
}