import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseitemProps } from '../../constants/types';

type ExpenseDataListType = {
  data: ExpenseitemProps[];
};

type EditExpensePayload = {
  id: string;
  changes: Partial<Omit<ExpenseitemProps, 'id'>>;
};

const initialState: ExpenseDataListType = {
  data: [],
};

const expenseSlice = createSlice({
  name: 'expenseList',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseitemProps>) => {
      state.data.push(action.payload);
    },
    editExpense: (state, action: PayloadAction<EditExpensePayload>) => {
      const { id, changes } = action.payload;

      const index = state.data.findIndex(item => item.id === id);
      if (index === -1) return;

      state.data[index] = {
        ...state.data[index],
        ...changes,
      };
    },
    deleteExpense: (state, action: PayloadAction<String>) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
