export interface IIdea {
  _id: string;
  content: string;
  created: string;
  user: { _id: string; name: string };
  project: { _id: string; title: string };
}
