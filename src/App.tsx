import { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

type State = {
  movies : Movie[],
};

export class App extends Component<{}, State> {
  state: State = {
    movies: moviesFromServer,
  };

  addMovies = (movie: Movie) => {
    this.setState(state => ({
      movies: [
        ...state.movies,
        movie,
      ],
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
          <NewMovie
            onAdd={this.addMovies}
          />
        </div>
      </div>
    );
  }
}
