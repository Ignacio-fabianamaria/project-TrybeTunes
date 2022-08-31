import React from 'react';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isEnterBtnDisabled: true,
      loading: false,
      userName: '',
    };
  }

  hendleInputName = ({ target }) => { // função para capturar o value do input userName e chamar função que valida o botão Entrar.
    // desconstruindo  event.target
    const { value } = target; // acessando propriedade value do imput
    this.setState({ userName: value }, () => this.validateBtnEnter());
  };

  validateBtnEnter = () => { // função para validar os critérios do botão Entrar
    const { userName } = this.state;
    const validateUserName = 3;
    if (userName.length >= validateUserName) {
      // habilita btn Entrar caso o userName digitado tenha 3 caracteres ou mais.
      this.setState({ isEnterBtnDisabled: false });
    } else {
      this.setState({ isEnterBtnDisabled: true });
    }
  };

  handleClickEnter = () => {
    const { userName } = this.setState;
  };

  render() {
    const { userName, loading, isEnterBtnDisabled } = this.state;
    const { hendleInputName } = this;
    return (
      <div data-testid="page-login">
        {loading && (<Loading />)}
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="nome"
          value={ userName }
          onChange={ hendleInputName }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isEnterBtnDisabled }
          onClick={ async () => {
            this.setState({ loading: true });
            await createUser({ name: userName });
            this.setState({ loading: false });
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}
export default Login;
