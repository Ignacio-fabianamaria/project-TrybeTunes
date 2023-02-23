import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

import '../styles/music-card.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    // usando o ciclo de vida (Montagem) para chamar a função showUsersaveFavoritesong
    // e recuperar a lista de musicas favoritadas assim que entrar na página
    this.saveFavoritesong();
  }

  addFavoriteSong = async ({ target }) => { // função para favoritar e desfavoritar uma musica
    // descontruindo event.target
    const { song } = this.props;
    console.log(song);
    if (target.checked) { // quando o checkbox favorite for selecionado:
      this.setState({ loading: true }); // --> passa loading para true enquento aguarda a resosta da função addSong
      await addSong(song);// após o retorno na função addSong:
      await this.saveFavoritesong();// --> chama novamente a função que recupera a lista de musicas favoritas
      this.setState({ loading: false });// --> retorna loading para false.
    } else {
      // quando o checkbox não estiver mais clicado:
      this.setState({ loading: true }); // --> passar loading para true enquanto aguarda o retorno da função removeSong,
      await removeSong(song); // --> Chama a função removeSong,
      await this.saveFavoritesong();// --> chama novamente a função que recupera a lista de musicas favoritas
      this.setState({ loading: false });// --> após o retorno das funções acima, passa loading para false
    }
  };

  saveFavoritesong = async () => { // função para recuperar as musicas favoritadas
    const retGetFavoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: retGetFavoriteSongs });
    console.log(retGetFavoriteSongs);
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { addFavoriteSong } = this;
    const { loading, favoriteSongs } = this.state;

    return (
      //  <audio> tag de audio para exivir as musicas
      <div className="page-musicacard">
        {loading && (<Loading />)}
        <div className="musiccard">
          <div className="card-audio">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <p>{ trackName }</p>
          </div>
          <label htmlFor="favorite" className="like">
            Favoritar
            <input
              type="checkbox"
              name="favorite"
              onChange={ addFavoriteSong }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ favoriteSongs
                .find((e) => e.trackName === trackName) }
            />
          </label>

        </div>
      </div>
    );
  }
}

// Validação das props
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({}).isRequired,
};

export default MusicCard;
