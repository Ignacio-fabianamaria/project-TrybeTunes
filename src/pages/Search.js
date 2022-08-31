import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      isEnterBtnSearch: true,
    };
  }

  hendleInputSearch = ({ target }) => { // função para capturar o value do inputSearch e chamar função que valida o botão Pesquisar.
    const { value } = target; // acessando propriedade value do imput
    this.setState({ inputSearch: value }, () => this.validateBtnSearch());
  };

  validateBtnSearch = () => {
    const { inputSearch } = this.state;
    const validateinputSearch = 2;
    if (inputSearch.length >= validateinputSearch) {
      // habilita btn Pesquisar caso o nome digitado tenha 2 caracteres ou mais.
      this.setState({ isEnterBtnSearch: false });
    } else {
      this.setState({ isEnterBtnSearch: true });
    }
  };

  render() {
    const { inputSearch, isEnterBtnSearch } = this.state;
    const { hendleInputSearch, validateBtnSearch } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisar Artista</h1>
        <input
          type="search"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          value={ inputSearch }
          onChange={ hendleInputSearch }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isEnterBtnSearch }
          onClick={ validateBtnSearch }
        >
          Entrar
        </button>
      </div>
    );
  }
}
export default Search;
