import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Post Type
interface Post {
  id?: number;
  title: string;
  body: string;
}

// Posts initial state
interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Get posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Create post
export const createPost = createAsyncThunk("posts/createPost", async (post: Post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
});

// Update post
export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, post }: { id: number; post: Post }) => {
  const response = await axios.put(`${API_URL}/${id}`, post);
  return response.data;
});

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar los posts";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
