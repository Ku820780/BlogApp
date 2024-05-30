import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userProfile: {},
  logout: false,
  accountCreated: false,
  error:"",
  profileLoading: false,
};

// ! User create account
export const createAccount = createAsyncThunk(
  "createAccount",
  async ({ name, email, password }) => {
    return await axios
      .post(`/user/register`, {
        name,
        email,
        password,
      })
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

// ! User login
export const loginAccount = createAsyncThunk(
  "loginAccount",
  async ({ email, password }) => {
    return await axios
      .post(`/user/login`, {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 400) {
          throw Error(err.message);
        }
      });
  }
);

// !  getUserProfile
export const getUserProfile = createAsyncThunk("getUserProfile", async () => {
  return await axios
    .get(`/user/me`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 404) {
        throw Error(err.message);
      }
      if (err.response.status === 500) {
        throw Error(err.message);
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

// !  userLogout
export const userLogout = createAsyncThunk("userLogout", async () => {
  return await axios
    .get(`/user/logout`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 400) {
        throw Error(err.message);
      }
    });
});


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  extraReducers: (builder) => {
    // ! Account create
    builder.addCase(createAccount.pending, (state) => {
      state.accountCreated = false;
      state.error = "";
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.accountCreated = true;
      state.error = "";
      state.userProfile = action.payload.data
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.accountCreated = false;
      state.error = action.error.message;
    });

    // ! Login
    builder.addCase(loginAccount.pending, (state) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.userProfile = action.payload.data
      state.error = "";
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = action.error.message;
    });

    // ! get Profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.userProfile = action.payload.data;
      state.error = "";
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });

    // ! userLogout
    builder.addCase(userLogout.pending, (state) => {
      state.logout = false;
      state.profileLoading = false;
      state.error = "";
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.logout = true;
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.logout = false;
      state.profileLoading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
