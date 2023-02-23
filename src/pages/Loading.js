import React from 'react';
import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-loading">
        <div className="loading-animation">.</div>
        <h4 className="text-loading">Carregando...</h4>
      </div>
    );
  }
}
export default Loading;
