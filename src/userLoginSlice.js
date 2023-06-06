import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "user/login",
  async (userObj, { rejectWithValue }) => {
    try {
      let res = await axios.post(
        "http://localhost:1500/user/user-login",
        userObj
      );
      console.log(res);
      if (res.data.message === "success") {
        sessionStorage.setItem("token", res.data.token);
        return res.data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    errorMessage: "",
    status: "idle",
  },
  reducers: {
    clearState: (state, action) => {
      state.userObj = {};
      state.errorMessage = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.userObj = {};
      state.status = "pending";
      state.errorMessage = "";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userObj = action.payload;
      state.status = "success";
      state.errorMessage = "";
      sessionStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.userObj = {};
      console.log(action.payload);
      state.status = "failed";
      state.errorMessage = action.payload.message;
    });
  },
});

//export actions
export const { clearState } = userLoginSlice.actions;

//export userSlice
export default userLoginSlice.reducer;
