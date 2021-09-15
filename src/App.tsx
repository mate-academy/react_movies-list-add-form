import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import 'bootstrap/dist/css/bootstrap.min.css';

interface State {
  movies: Movie[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  addMovie = (movie: Movie) => {
    this.setState(currentState => ({
      movies: [movie, ...currentState.movies],
    }));
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <h1 className="mb-4">Add new movie</h1>
          <NewMovie onAdd={this.addMovie} />
        </div>
      </div>
    );
  }
}
