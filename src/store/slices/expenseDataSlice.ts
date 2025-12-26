import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ExpenseDataListType = {
  isLoggedIn: boolean;
  token: string | null;
};

const initialState: ExpenseDataListType = {
  isLoggedIn: false,
  token: null,
};

const userSlice = createSlice({
  name: 'expense_',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
