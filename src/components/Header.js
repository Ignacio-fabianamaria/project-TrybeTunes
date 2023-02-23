import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: {}, // declarando como objeto vazio pq a função getUser retorna um objeto
    };
  }

  componentDidMount() { // usando o ciclo de vida (Montagem) para chamar a função showUser
    this.showUser();
  }

  showUser = async () => { // função exibir Loading enquanto  função getUser carrega o nome do usuário e exibe este nome no Header
    this.setState({ loading: true });// exibindo o componente Loading
    const user = await getUser();// guardando o retorno, que é uma Promisse, da função getUser em uma cont
    this.setState({ loading: false, userName: user });// exibindo o nome do usuário, que foi gerado pela GetUser, no componente Header
  };

  render() {
    const { loading, userName } = this.state;
    const { showUser } = this;
    return (
      <header data-testid="header-component">
        {loading ? (<Loading />)
          : (
            <div className="user-container">
              <div className="box-user">
                <img src="/profile.png" alt="imagem-logo" className="user-img" />
                <p data-testid="header-user-name">{ userName.name }</p>
              </div>
            </div>)}
        { showUser }
        <nav>
          <ul className="menu">

            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Músicas Favoritas
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
