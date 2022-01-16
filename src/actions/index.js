// Coloque aqui suas actions

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINISH_EDIT = 'FINISH_EDIT';
export const SET_EDITED_EXPENSE = 'SET_EDITED_EXPENSE';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveExpense = (expense, rates) => ({
  type: SAVE_EXPENSE,
  expense,
  rates,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const finishEdit = () => ({
  type: FINISH_EDIT,
});

export const setEditedExpense = (expense) => ({
  type: SET_EDITED_EXPENSE,
  expense,
});

export const saveCurrencies = (rates) => ({
  type: GET_CURRENCIES,
  rates,
});

export const requestRates = (expense) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((rates) => dispatch(saveExpense(expense, rates)));

export const requestCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((rates) => dispatch(saveCurrencies(rates)));
