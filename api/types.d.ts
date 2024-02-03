export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export type NewsItem = Omit<News, 'id' | 'createdAt'>;

export interface Comment {
  newsId: number;
  author: string | null;
  text: string;
}