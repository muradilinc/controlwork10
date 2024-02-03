import { News } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getNews } from './newsThunk';

interface NewsState {
  items: News[];
  getNewsLoading: boolean;
}

const initialState: NewsState = {
  items: [],
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
    builder.addCase(getNews.fulfilled, (state, {payload: items}) => {
      state.getNewsLoading = false;
      state.items = items;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.getNewsLoading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;