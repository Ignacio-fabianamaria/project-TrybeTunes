import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input type="text" data-testid="login-name-input" placeholder="nome" />
        <button type="submit" data-testid="login-submit-button">Entrar</button>
      </div>
    );
  }
}
export default Login;
