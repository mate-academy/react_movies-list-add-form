import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface State {
  movies: Movie[];
}

export class App extends React.Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  onAdd = (movie: Movie) => {
    this.setState((currentState) => {
      return {
        movies: [...currentState.movies, movie],
      };
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie
            onAdd={this.onAdd}
          />
        </div>
      </div>
    );
  }
}
