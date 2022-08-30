import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" componet={ Login } />
          <Route exact path="/search" componet={ Search } />
          <Route exact path="/album/:id" componet={ Album } />
          <Route exact path="/favorites" componet={ Favorites } />
          <Route exact path="/profile" componet={ Profile } />
          <Route exact path="/profile/edit" componet={ ProfileEdit } />
          <Route exact path="/#" componet={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default App;
