export interface IProject {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  created: string;
  edited: string;
  votes: number;
  user: { _id:string, name: string };
  tags: [{ _id:string, name: string }];
}
