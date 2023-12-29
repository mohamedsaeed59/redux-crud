import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "users/getUser",
  async ({id}) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      return response.data
  }
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser", 
  async ({id}) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (name, email) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", name, email);
    console.log('res', response.data);
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (payload) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${payload.id}`, payload);
  return response.data;
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    text: "",
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
      state.text = action.payload.text;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setEdit } = UserSlice.actions;
export default UserSlice.reducer;