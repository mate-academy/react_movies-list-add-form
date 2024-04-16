import './App.scss';

import { useState } from 'react';

import moviesFromServer from './api/movies.json';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handlerAddMovie = (movie: Movie) => {
    setMovies(currentMovie => [...currentMovie, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handlerAddMovie} />
      </div>
    </div>
  );
};
