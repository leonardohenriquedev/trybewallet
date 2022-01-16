import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail as saveEmailAction } from '../actions';

import wallet2 from '../images/Wallet-bro.png';
import wallet from '../images/Tax-bro.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loginIsValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.saveAndRedirect = this.saveAndRedirect.bind(this);
  }

  handleChange(event) {
    const { type, value } = event.target;

    this.setState(
      {
        [type]: value,
      },
      () => this.validateLogin()
    );
  }

  validateLogin() {
    const { email, password } = this.state;
    const minLength = 6;
    if (
      email.includes('@') &&
      email.includes('.com') &&
      password.length >= minLength
    ) {
      this.setState(() => ({
        loginIsValid: true,
      }));
    } else {
      this.setState(() => ({
        loginIsValid: false,
      }));
    }
  }

  saveAndRedirect() {
    const { email } = this.state;
    const { saveEmail, history } = this.props;

    saveEmail(email);

    history.push('/carteira');
  }

  render() {
    const { email, senha, loginIsValid } = this.state;

    return (
      <div className="login-page">
        <div className="login-box">
          <img src={wallet}></img>
          <h1>TrybeWallet</h1>
          {/* <p>Faça Login para continuar</p> */}
          <input
            type="email"
            data-testid="email-input"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            value={senha}
            onChange={this.handleChange}
          />

          {loginIsValid ? (
            <button type="submit" onClick={this.saveAndRedirect}>
              Entrar
            </button>
          ) : (
            <button type="submit" disabled>
              Entrar
            </button>
          )}
        </div>
        <div className="login-side">
          <p className="front-end">
            Projeto desenvolvido durante o modulo de <b>Front-End</b> enquanto
            estudava na <b>Trybe. </b>
          </p>
          <p className="login-instructions">
            <b>
              Para fazer login preencha um email válido e digite uma senha de no
              mínimo 6 caracteres.
            </b>
          </p>
          <img src={wallet2}></img>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
