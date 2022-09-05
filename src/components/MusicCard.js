import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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

  addFavoriteSong = async ({ target }) => { // função para favoritar uma musica
    // descontruindo event.target
    const { song } = this.props;
    console.log(song);
    if (target.checked) { // quando o checkbox favorite for selecionado:
      this.setState({ loading: true }); // --> passa loading para true enquento aguarda a resosta da função addSong
      await addSong(song); // após o retorno na função addSong:
      this.setState({ loading: false });// --> retorna loading para false.
    }
  };

  saveFavoritesong = async () => { // função para recuperar as musicas favoritadas
    this.setState({ favoriteSongs: [] });
    const retGetFavoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: retGetFavoriteSongs });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { addFavoriteSong } = this;
    const { loading, favoriteSongs } = this.state;

    return (
      //  <audio> tag de audio para exivir as musicas
      <div>
        {loading && (<Loading />)}
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            onClick={ addFavoriteSong }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteSongs.some((e) => e.trackName === trackName) }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <p>{ trackName }</p>
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
