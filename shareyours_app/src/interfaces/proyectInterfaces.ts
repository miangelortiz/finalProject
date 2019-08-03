export interface IProyect {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  created: Date;
  votes: number;
  user: string;
  tags: string[];
}
