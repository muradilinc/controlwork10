import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getComments } from './commentsThunk';
import { RootState } from '../../app/store';
import { Comment } from '../../types';

interface CommentsState {
  comments: Comment[],
  getCommentsLoading: boolean,
}

const initialState: CommentsState = {
  comments: [],
  getCommentsLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.getCommentsLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, {payload: comments}: PayloadAction<Comment[]>) => {
      state.getCommentsLoading = false;
      state.comments = comments;
    });
    builder.addCase(getComments.rejected, (state) => {
      state.getCommentsLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;