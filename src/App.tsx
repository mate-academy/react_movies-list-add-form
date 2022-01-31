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

  addMovie = (movie: Movie) => {
    this.setState(state => {
      const newMovie = {
        title: movie.title,
        imgUrl: movie.imgUrl,
        imdbUrl: movie.imdbUrl,
        imdbId: movie.imdbId,
        description: movie.description,
      };

      return {
        movies: [...state.movies, newMovie],
      };
    });

    // eslint-disable-next-line no-console
    console.log(movie);
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <NewMovie onMovie={this.addMovie} />
        </div>
      </div>
    );
  }
}
