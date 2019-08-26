export interface IProject {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  created: string;
  edited: string;
  votes: string[];
  user: { _id: string; name: string; avatar: string };
  tags: [{ _id: string; name: string }];
  ideas: [{ _id: string; user: string; project: string }];
}
