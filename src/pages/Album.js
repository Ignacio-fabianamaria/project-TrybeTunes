import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.showMusicList();
  }

  showMusicList = async () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true });
    const retGetMusics = await getMusics(id);
    this.setState({ musicList: retGetMusics, loading: false });
  };

  render() {
    const { musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        { console.log(musicList) }
      </div>
    );
  }
}

// Album.prototype = {
// match: PropTypes.shape({
//   params: PropTypes.shape({ id: PropTypes.string.isRequired })
//     .isRequired }).isRequired,
// };

export default Album;
