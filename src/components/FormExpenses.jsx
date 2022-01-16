import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestRates as requestRatesACTION,
  requestCurrencies as requestCurrenciesACTION,
  finishEdit as finishEditACTION,
  setEditedExpense as setEditedExpenseACTION,
} from '../actions';

class FormExpenses extends Component {
  constructor() {
    super();

    this.state = {
      id: 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;

    requestCurrencies();
  }

  handleChange(event) {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  addExpense() {
    const { requestRates } = this.props;
    const { id } = this.state;

    requestRates(this.state);

    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  }

  editExpense() {
    const { setEditedExpense } = this.props;

    this.setState({
      // editing: false,
      value: '',
      description: '',
    });

    setEditedExpense(this.state);
  }

  render() {
    const { currencies, editExpense, finishEdit, editing } = this.props;
    const { description, value, currency, method, tag } = this.state;

    if (editExpense) {
      this.setState({
        id: editExpense.id,
        value: editExpense.value,
        description: editExpense.description,
        currency: editExpense.currency,
        method: editExpense.method,
        tag: editExpense.tag,
        exchangeRates: editExpense.exchangeRates,
        // editing: true,
      });

      finishEdit();
    }

    return (
      <div className="form-add">
        <p className='add-despesa'>Adicione uma Despesa</p>
        {/* <div className="form-wrapper"> */}
        <div className="input-value">
          <p>Valor</p>
          <input
            data-testid="value-input"
            id="value"
            value={value}
            onChange={this.handleChange}
            className="value"
            autoComplete="off"
            placeholder="R$"
          />
        </div>

        <div className="input-value">
          <p>Descrição</p>
          <input
            data-testid="description-input"
            id="description"
            value={description}
            onChange={this.handleChange}
            className="input-descricao"
            autoComplete="off"
            placeholder="Breve Descrição"
          />
        </div>

        <div className="input-value">
          <p>Moeda</p>
          <select
            data-testid="currency-input"
            onChange={this.handleChange}
            id="currency"
            value={currency}
          >
            {currencies.map((currency2) => (
              <option key={currency2} data-testid={currency2}>
                {currency2}
              </option>
            ))}
          </select>
        </div>

        <div className="input-value">
          <p>Pagamento</p>
          <select
            data-testid="method-input"
            onChange={this.handleChange}
            id="method"
            value={method}
            className="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>

        <div className="input-value">
          <p>Etiqueta</p>
          <select
            data-testid="tag-input"
            onChange={this.handleChange}
            id="tag"
            value={tag}
            className="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>

        {editing ? (
          <button type="submit" onClick={this.editExpense} className='button-edit'>
            Editar Despesa
          </button>
        ) : (
          <button type="submit" onClick={this.addExpense} className='button-add' >
            Adicionar Despesa
          </button>
        )}
        {/* </div> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestRates: (payload) => dispatch(requestRatesACTION(payload)),
  requestCurrencies: () => dispatch(requestCurrenciesACTION()),
  finishEdit: () => dispatch(finishEditACTION()),
  setEditedExpense: (expense) => dispatch(setEditedExpenseACTION(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editExpense: state.wallet.editExpense,
  editing: state.wallet.editing,
});

FormExpenses.propTypes = {
  requestCurrencies: PropTypes.func.isRequired,
  requestRates: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  editExpense: PropTypes.string,
  setEditedExpense: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

FormExpenses.defaultProps = {
  editExpense: '',
  editing: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
