export interface IBrain {
  _id: string;
  title: string;
  created: string;
}

export interface IBsIdea {
  _id: string;
  content: string;
  created: string;
  user: { _id: string; name: string };
  brain: { _id: string; title: string };
  votes: string[];
}
