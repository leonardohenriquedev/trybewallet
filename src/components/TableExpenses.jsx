import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteExpense as deleteExpenseACTION,
  editExpense as editExpenseACTION,
} from '../actions';

class TableExpenses extends Component {
  constructor() {
    super();

    this.convertido = this.convertido.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
  }

  convertido(expense) {
    const convertido = (
      expense.value * expense.exchangeRates[expense.currency].ask
    ).toFixed(2);

    if (convertido === 'NaN') {
      return 0;
    }

    return convertido;
  }

  formatCurrency(expense) {
    return expense.exchangeRates[expense.currency].name.match(/[^/]*/);
  }

  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <div className="table-expenses">
            <h1>Tabela de Despesas</h1>
        <table>
          <thead>
            {expenses.map((expense) => (
              <tr key={expense.id} className="box-expenses">
                <div className="table-column id-column">
                  <th>ID</th>

                  <td>{expense.id}</td>
                </div>

                <div className="table-column value-column">
                  <th>Valor</th>
                  <td>R$ {expense.value}</td>
                </div>

                <div className="table-column description-column">
                  <th>Descrição</th>
                  <td>{expense.description}</td>
                </div>

                <div className="table-column">
                  <th>Moeda</th>
                  <td>{this.formatCurrency(expense)}</td>
                </div>

                <div className="table-column payment-column">
                  <th>Pagamento</th>
                  <td>{expense.method}</td>
                </div>

                <div className="table-column tag-column">
                  <th>Tag</th>
                  <td>{expense.tag}</td>
                </div>

                <div className="table-column cambio-column">
                  <th>Câmbio</th>
                  <td>
                    {Number(
                      expense.exchangeRates[expense.currency].ask
                    ).toFixed(2)}
                  </td>
                </div>


                <div className="table-column">
                  <th>Convertido Para</th>
                  <td>Real</td>
                </div>


                <div className="table-column converted-column">
                  <th>Total</th>
                  <td>R$ {this.convertido(expense)}</td>
                </div>

                <div className="table-column buttons-column">
                  <th>Editar/Excluir</th>

                  <td>
                    <button
                      type="submit"
                      data-testid="edit-btn"
                      onClick={() => editExpense(expense)}
                      className="button-edit-table"
                    >
                      Editar
                    </button>

                    <button
                      type="submit"
                      data-testid="delete-btn"
                      onClick={() => deleteExpense(expense)}
                      className="button-delete-table"
                    >
                      Excluir
                    </button>
                  </td>
                </div>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpenseACTION(expense)),
  editExpense: (expense) => dispatch(editExpenseACTION(expense)),
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
