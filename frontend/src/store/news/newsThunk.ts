import { createAsyncThunk } from '@reduxjs/toolkit';
import { News, NewsState } from '../../types';
import axiosApi from '../../axiosApi';

export const createNews = createAsyncThunk<void, NewsState>(
  'news/createNews',
  async (news) => {
    const formdata = new FormData();
    formdata.append('title', news.title);
    formdata.append('description', news.description);
    if (news.image) {
      formdata.append('image', news.image);
    }
    await axiosApi.post('/news', formdata);
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

export const getSingleNews = createAsyncThunk<News, number>(
  'news/getSingleNews',
  async (id) => {
    const response = await axiosApi.get<News[]>(`/news/${id}`);

    if (!response || response.data.length === 0) {
      throw new Error('not found!');
    }

    return response.data[0];
  },
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/deleteNews',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  },
);