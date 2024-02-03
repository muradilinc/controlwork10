import { News } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNews, getSingleNews } from './newsThunk';
import { RootState } from '../../app/store';

interface NewsState {
  items: News[];
  item: News | null;
  getNewsLoading: boolean;
}

const initialState: NewsState = {
  items: [],
  item: null,
  getNewsLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.getNewsLoading = true;
    });
    builder.addCase(getNews.fulfilled, (state, {payload: items}: PayloadAction<News[]>) => {
      state.getNewsLoading = false;
      state.items = items;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.getNewsLoading = false;
    });
    builder.addCase(getSingleNews.pending, (state) => {
      state.getNewsLoading = true;
    });
    builder.addCase(getSingleNews.fulfilled, (state, {payload: item}: PayloadAction<News>) => {
      state.getNewsLoading = false;
      state.item = item;
    });
    builder.addCase(getSingleNews.rejected, (state) => {
      state.getNewsLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;
export const selectNews = (state: RootState) => state.news.items;
export const selectSingleNews = (state: RootState) => state.news.item;