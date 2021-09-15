import React from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { NewMovie } from './components/NewMovie';

interface State {
  movies: Movie[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <NewMovie movies={movies} />
      </div>
    );
  }
}
