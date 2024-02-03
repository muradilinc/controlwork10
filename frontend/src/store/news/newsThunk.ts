import { createAsyncThunk } from '@reduxjs/toolkit';
import { News } from '../../types';
import axiosApi from '../../axiosApi';

export const getNews = createAsyncThunk<News[]>(
  'news/getNews',
  async () => {
    const response = await axiosApi.get<News[]>('/news');

    if (!response) {
      return [];
    }

    return response.data;
  }
);