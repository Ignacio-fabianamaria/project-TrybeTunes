import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="*" component={ NotFound } />
      </Switch>

    );
  }
}

export default App;

// Recursos que auxiliaram no desenvolvimento do projeto:
// --> Curso React (Matheus Battisti): Implementando o React Router-#15-(https://www.youtube.com/watch?v=eJ8W3l371Jg&t=8s)
// --> ReactJS - Como extrair parâmetros da url com React Router.(https://www.youtube.com/watch?v=wRk5o-pZxEU)
// --> https://learn.co/lessons/react-router-params
