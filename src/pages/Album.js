import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      collectionId: '',
      // loading: false,
    };
  }

  componentDidMount() {
    this.showMusicList();
  }

  showMusicList = async () => {
    const { match } = this.props;
    const { id } = match.params;
    // this.setState({ loading: true });
    this.setState({ artistName: '', collectionName: '' });
    const retGetMusics = await getMusics(id);
    this.setState({ musicList: retGetMusics.slice(1), // usando .slice para remover o primeiro índice do array e listar apenas os índices que são músicas
      // o índice do array que getMusics retorna é onde contém as informações de img e nome do album e o nome do artista
      artworkUrl100: retGetMusics.artworkUrl100,
      artistName: retGetMusics[0].artistName,
      collectionName: retGetMusics[0].collectionName });
  };

  render() {
    const { musicList, artistName, collectionName, artworkUrl100,
      collectionId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        <h1>Album</h1>
        { console.log(musicList) }

        <h2 data-testid="album-name">{ collectionName }</h2>
        <img src={ artworkUrl100 } alt={ collectionId } />
        <p data-testid="artist-name">{artistName}</p>
        <ul>
          { musicList.map((e) => (// usando .map em musicList para listar as músicas que são exibidas pelo componente MusicCard
            <MusicCard
              key={ e.trackId }
              trackName={ e.trackName }
              previewUrl={ e.previewUrl }
              trackId={ e.trackId }
            />
          ))}
        </ul>
      </div>
    );
  }
}
// Validação das props
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired })
      .isRequired }).isRequired,
};

export default Album;
