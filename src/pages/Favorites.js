import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import '../styles/favorite.css';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
  };

  componentDidMount() {
    this.FavoriteSongs();
  }

  FavoriteSongs = async () => {
    const getFavoriteList = await getFavoriteSongs();
    this.setState({
      favoriteList: getFavoriteList,
    });
  };

  render() {
    const { favoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="music-favoritelist">
          {
            (
              favoriteList.map((music) => (
                <MusicCard
                  music={ music }
                  key={ music.trackId }
                  FavoriteSongs={ this.FavoriteSongs }
                />))
            )
          }
        </div>
      </div>
    );
  }
}
export default Favorites;
