export type ExpenseCategoryType =
  | 'Food'
  | 'Bill'
  | 'Travel'
  | 'Shopping'
  | 'Others';

export type CategoryListItems = {
  label: ExpenseCategoryType;
  value: ExpenseCategoryType;
};

export type ExpenseitemProps = {
  id: string;
  type: 'header' | 'item';
  expenseTitle: string;
  category: ExpenseCategoryType;
  amount: number;
  date: string;
  notes?: string;
};

type AddExpenseParams = {
  type: 'Add';
};

type EditExpenseParams = {
  id: string;
  type: 'Edit';
  expenseTitle: string;
  category: ExpenseCategoryType;
  amount: number;
  date: string;
  notes?: string;
};

export type AddEditExpenseParams = AddExpenseParams | EditExpenseParams;
