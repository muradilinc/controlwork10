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
  newsId: number,
  author: string | null,
  text: string;
}

export type NewCommentState = Omit<NewComment, 'newsId'>;