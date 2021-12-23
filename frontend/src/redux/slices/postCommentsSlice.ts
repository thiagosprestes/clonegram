import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '~/models/comment';

export interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

export const postCommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    storeCommentsList: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
  },
});

export const { addComment, storeCommentsList } = postCommentsSlice.actions;

export default postCommentsSlice.reducer;
