import React from 'react';
import { Redirect } from 'react-router-dom';// extraindo o componente Redirect da biblibotéca para trabalhar com redirecionamento.
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isEnterBtnDisabled: true,
      loading: false,
      userName: '',
      redirectTo: false,
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

  handleClickEnter = async () => { // função para criar e permitir acesso do usuário| mudar o estado do (loading)|após criar usuário redirecionar para (/search)
    const { userName } = this.state;
    this.setState({ loading: true });// mostra na tela o componente Loading
    await createUser({ name: userName });// chama função createUser que recebe uma Promisse para criar um novo usuário
    this.setState({ loading: false, redirectTo: true });// deixa de mostrar o componente Loading ma tela e redireciona para Search
  };

  render() {
    const { userName, isEnterBtnDisabled, loading, redirectTo } = this.state;
    const { hendleInputName, handleClickEnter } = this;

    return (
      <div data-testid="page-login">
        {loading && (<Loading />)}
        {redirectTo && (<Redirect to="/search" />)}
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
          onClick={ handleClickEnter }
        >
          Entrar
        </button>
      </div>
    );
  }
}
export default Login;
