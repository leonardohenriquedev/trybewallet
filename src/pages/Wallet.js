import React from 'react';
import FormExpenses from '../components/FormExpenses';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-wrapper">
        <div className="sidebar">
          <Header />
          <FormExpenses />
        </div>
        <TableExpenses />
      </div>
    );
  }
}

export default Wallet;
