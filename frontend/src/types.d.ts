export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export interface Comment {
  id: number;
  news_id: number;
  author: string;
  text: string;
}

export interface NewComment {
  newId: number,
  author: string | null,
  text: string;
}