import { createSlice } from '@reduxjs/toolkit';
import { PostResponse } from '~/models/post';

export interface FeedState {
  posts: PostResponse[];
}

const initialState: FeedState = {
  posts: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    storeFeedPosts: (state, action) => {
      state.posts = action.payload;
    },
    likePost: (state, action) => {
      const foundedPost = state.posts.find(
        (post) => post.id === action.payload.postId
      );

      if (foundedPost) {
        foundedPost.PostLike.push(action.payload);
      }
    },
    deleteLike: (state, action) => {
      state.posts = state.posts.map((post) => ({
        ...post,
        PostLike: post.PostLike.filter(
          (like) => like.id !== action.payload.likeId
        ),
      }));
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload.postId
      );
    },
  },
});

export const { deleteLike, likePost, storeFeedPosts, deletePost } =
  feedSlice.actions;

export default feedSlice.reducer;
