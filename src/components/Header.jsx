import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../images/Savings-bro.png';

class Header extends Component {
  constructor() {
    super();

    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    const { expenses } = this.props;
    let total = '';
    for (let index = 0; index < expenses.length; index += 1) {
      const sum = Number(
        Number(expenses[index].value) *
          Number(expenses[index].exchangeRates[expenses[index].currency].ask)
      ).toFixed(2);

      total = Number(total) + Number(sum);
    }
    console.log(total);
    if (isNaN(total)) {
      return 0;
    }

    return Number(total);
  }

  formatName(email) {
    const str = email.match(/[^@]*/)[0];
    const formated = str[0].toUpperCase() + str.substr(1) + ' 😃';
    return formated;
  }

  render() {
    const { user } = this.props;

    return (
      <div className="header">
        <img src={logo}></img>
        <h1>TrybeWallet</h1>
        <div>
          <p className="email-total" data-testid="email-field">
            Oi, {this.formatName(user.email)}
          </p>
          <div>
            <span data-testid="total-field" className="total-value">
              R${this.getTotal().toFixed(2)}
            </span>
            <p className="total-expenses">Total de Despesas</p>
            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  user: PropTypes.objectOf(String).isRequired,
};

export default connect(mapStateToProps)(Header);
