export type ExpenseCategoryType = 'Food' | 'Bill' | 'Travel' | 'Shopping' | 'Others';

export type ExpenseitemProps = {
  type: 'header' | 'item',
  expenseTitle: string,
  category: ExpenseCategoryType,
  amount: number,
  date: string,
  notes?: string,
}