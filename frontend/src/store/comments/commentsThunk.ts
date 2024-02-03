import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { NewComment , Comment} from '../../types';

export const createComment = createAsyncThunk<void, NewComment>(
  'comments/create',
  async (comment) => {
    await axiosApi.post('/comments', comment);
  },
);

export const getComments = createAsyncThunk<Comment[], number | undefined>(
  'comments/get',
  async (id) => {
    let comments: Comment[] = [];

    if (id) {
      const response = await axiosApi.get<Comment[]>(`/comments?news_id=${id}`);

      if (!response) {
        comments = [];
      }
      comments = response.data;
    } else {
      const response = await axiosApi.get<Comment[]>('/comments');

      if (!response) {
        comments = [];
      }
      comments = response.data;
    }
    return comments;
  },
);

export const deleteComment = createAsyncThunk<void, number>(
  'comments/delete',
  async (id) => {
    await axiosApi.delete(`/comments/${id}`);
  },
);