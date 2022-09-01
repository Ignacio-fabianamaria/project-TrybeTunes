import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '', // input que recebe o nome do artista a ser pesquisado
      artistName: '', // recebe o value do inputSearch
      isEnterBtnSearch: true,
      loading: false,
      returnArtist: false, // declarando o estado do retorno da requisição para buscar album de artista com false

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

  handleClickBtnSearch = async () => { // função que faz requisição para buscar artista
    const { inputSearch } = this.state;
    this.setState({ loading: true, inputSearch: '' });
    await searchAlbumsAPIs(inputSearch);// faz requisição à searchAlbumsAPIs que retorna uma Promisse
    this.setState({ loading: false, artistName: inputSearch, returnArtist: true });
  };

  render() {
    const {
      inputSearch, isEnterBtnSearch, loading, artistName, returnArtist } = this.state;
    const { hendleInputSearch, handleClickBtnSearch } = this;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />)
          : (
            <div>
              <form>
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
                  onClick={ handleClickBtnSearch }
                >
                  Entrar
                </button>
              </form>
              { returnArtist // quando a requisição para buscar artista for true, retornar o nome do artista buscado
                && (
                  <div>
                    <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
                    {console.log(artistName)}
                  </div>) }
            </div>
          )}
      </div>
    );
  }
}

export default Search;
