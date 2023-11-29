export type recentUsers = {
  id: string;
  name: string | null;
  image: string | null;
  _count: {
    questions: number;
  };
};
