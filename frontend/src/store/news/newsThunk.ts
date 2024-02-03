import { createAsyncThunk } from '@reduxjs/toolkit';
import { News } from '../../types';
import axiosApi from '../../axiosApi';

export const createNews = createAsyncThunk<void, News>(
  'news/createNews',
  async (news) => {
    await axiosApi.post('/news', news);
  },
);

export const getNews = createAsyncThunk<News[]>(
  'news/getNews',
  async () => {
    const response = await axiosApi.get<News[]>('/news');

    if (!response) {
      return [];
    }

    return response.data;
  },
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/deleteNews',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  },
);