// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária

import {
  SAVE_EXPENSE,
  GET_CURRENCIES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  FINISH_EDIT,
  SET_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: '',
  editExpense: '',
};

function setEdited(state, action) {
  const newArr = state.expenses.map((expense2) => {
    if (expense2.id === action.expense.id) {
      return action.expense;
    }
    return expense2;
  });

  return {
    ...state,
    expenses: newArr,
    editing: false,
  };
}

function deleteExpense2(state, action) {
  const newArray = state.expenses.filter(
    (expense2) => expense2.id !== action.expense.id,
  );
  const newTotal = Number(
    Number(action.expense.value)
    * Number(action.expense.exchangeRates[action.expense.currency].ask),
  );

  return {
    ...state,
    expenses: newArray,
    total: Number(state.total - newTotal).toFixed(2),
  };
}

function wallet(state = INITIAL_STATE, action) {
  const { expense, rates } = action;
  switch (action.type) {
  case SAVE_EXPENSE: {
    expense.exchangeRates = rates;
    const valor = expense.value * rates[expense.currency].ask;
    const total = Number(state.total) + Number(valor);
    
    // if(expense.value===''){
    //   expense.value = '-'
    // }

    // if(expense.description===''){
    //   expense.description = '-'
    // }
    return {
      ...state,
      expenses: [...state.expenses, expense],
      total: Number(total).toFixed(2),
    };
  }

  case DELETE_EXPENSE: return deleteExpense2(state, action);

  case EDIT_EXPENSE: {
    return {
      ...state,
      editExpense: action.expense,
      editing: true,
    };
  }

  case FINISH_EDIT: {
    return {
      ...state,
      editExpense: '',
    };
  }

  case SET_EDITED_EXPENSE: return setEdited(state, action);

  case GET_CURRENCIES: {
    const asArray = Object.keys(action.rates);
    const currencies = asArray.filter((currency) => currency !== 'USDT');
    return {
      ...state,
      currencies,
    };
  }

  default:
    return state;
  }
}

export default wallet;
