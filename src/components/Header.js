import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

import './header.css';

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
    this.setState({ userName: user, loading: false });// exibindo o nome do usuário, que foi gerado pela GetUser, no componente Header
  };

  render() {
    const { loading, userName } = this.state;
    const { showUser } = this;
    return (
      <header data-testid="header-component">
        <img src="./hadset.png" alt="imagem-hadset" className="hadset-header" />
        {loading ? (<Loading />)
          : <p data-testid="header-user-name">{ userName.name }</p>}
        { showUser }
        <nav>
          <ul className="menu">
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquizar</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Músicas Favoritas
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
