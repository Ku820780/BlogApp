import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allPost: [],
  allPostByUser: [],
  isPostLoading: false,
  errorPost: "",
  post: {},
  isCreatePost: false,
  isUpdatedPost: false,
};

export const createPost = createAsyncThunk("createPost", async (formdata) => {
  console.log("formdata", formdata);
  return await axios
    .post(`/post/createpost`, formdata)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 400) {
        throw Error("Bad Request");
      }
      if (err.response.status === 500) {
        throw Error("Server Errors");
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

export const getAllPost = createAsyncThunk("getAllPost", async () => {
  return await axios
    .get(`/post/allpost`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 400) {
        throw Error("Bad Request");
      }
      if (err.response.status === 500) {
        throw Error("Server Errors");
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

export const getAllPostByUser = createAsyncThunk(
  "getAllPostByUser",
  async () => {
    return await axios
      .get(`/post/userpost`)
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 400) {
          throw Error("Bad Request");
        }
        if (err.response.status === 500) {
          throw Error("Server Errors");
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

export const deletePost = createAsyncThunk("deletePost", async (id) => {
  return await axios
    .get(`/post/deletepost/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 400) {
        throw Error(err.message);
      }
    });
});

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ postId, postData }) => {
    return await axios
      .patch(`/post/update`, { postId, postData })
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 400) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
      });
  }
);

export const searchByTitle = createAsyncThunk(
  "searchByTitle ",
  async (search) => {
    console.log("searchsearchsearch", search);
    return await axios
      .post(`/post/search`, { search })
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 400) {
          throw Error(err.message);
        }
      });
  }
);

export const searchByDate = createAsyncThunk("searchByDate", async (date) => {
  return await axios
    .post(`/post/searchByDate`, { date: date })
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 400) {
        throw Error(err.message);
      }
    });
});

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    deletePostById: (state, action) => {
      state.allPost = state.allPost.filter(({ _id }) => _id !== action.payload);
    },
    updateRowSelected: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ! Account create
    builder.addCase(createPost.pending, (state) => {
      state.isPostLoading = false;
      state.errorPost = "";
      state.isCreatePost = false;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isPostLoading = true;
      state.errorPost = "";
      state.post = action.payload.data;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isPostLoading = false;
      state.errorPost = action.error.message;
    });

    builder.addCase(getAllPost.pending, (state) => {
      state.isPostLoading = false;
      state.errorPost = "";
      state.allPost = [];
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.isPostLoading = true;
      state.errorPost = "";
      state.allPost = action.payload.data;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      state.isPostLoading = false;
      state.errorPost = action.error.message;
      state.allPost = [];
    });

    builder.addCase(getAllPostByUser.pending, (state) => {
      state.isPostLoading = false;
      state.errorPost = "";
      state.allPostByUser = [];
    });
    builder.addCase(getAllPostByUser.fulfilled, (state, action) => {
      state.isPostLoading = true;
      state.errorPost = "";
      state.allPostByUser = action.payload.data;
    });
    builder.addCase(getAllPostByUser.rejected, (state, action) => {
      state.isPostLoading = false;
      state.errorPost = action.error.message;
      state.allPostByUser = [];
    });

    builder.addCase(searchByTitle.pending, (state) => {
      state.isPostLoading = false;
      state.errorPost = "";
      state.allPost = [];
    });
    builder.addCase(searchByTitle.fulfilled, (state, action) => {
      state.isPostLoading = true;
      state.errorPost = "";
      state.allPost = action.payload?.data;
    });

    builder.addCase(searchByTitle.rejected, (state, action) => {
      state.isPostLoading = false;
      state.errorPost = action.error.message;
      state.allPost = [];
    });

    builder.addCase(searchByDate.pending, (state) => {
      state.isPostLoading = false;
      state.errorPost = "";
      state.allPost = [];
    });
    builder.addCase(searchByDate.fulfilled, (state, action) => {
      state.isPostLoading = true;
      state.errorPost = "";
      state.allPost = action.payload?.data;
    });

    builder.addCase(searchByDate.rejected, (state, action) => {
      state.isPostLoading = false;
      state.errorPost = action.error.message;
      state.allPost = [];
    });
  },
});

export default postSlice.reducer;
export const { deletePostById, updateRowSelected } = postSlice.actions;
