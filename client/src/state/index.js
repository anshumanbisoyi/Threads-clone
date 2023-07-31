import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  page: 1,
  totalPages: 1,
  hasMore: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existenet in state");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload.totalPages;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload.hasMore;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPage,
  setPosts,
  setPost,
  setTotalPages,
  setHasMore,
} = authSlice.actions;
export default authSlice.reducer;
