import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  income: 0,
  expense: 0,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      if (action.payload.type === 'expense') {
        state.expense += action.payload.amount;
      } else {
        state.income += action.payload.amount;
      }
    },
    deleteExpense: (state, action) => {
      const expenseIndex = state.expenses.findIndex((expense) => expense.id === action.payload);
      const expense = state.expenses[expenseIndex];
      if (expense.type === 'expense') {
        state.expense -= expense.amount;
      } else {
        state.income -= expense.amount;
      }
      state.expenses.splice(expenseIndex, 1);
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
