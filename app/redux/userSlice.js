import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: {},
};

const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
