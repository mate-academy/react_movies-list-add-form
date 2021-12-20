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

  addMovie = ({
    title, description, imgUrl, imdbUrl, imdbId,
  }: Movie) => {
    this.setState(state => {
      const movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      return {
        movies: [...state.movies, movie],
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
            add={this.addMovie}
          />
        </div>
      </div>
    );
  }
}
