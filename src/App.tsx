import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

import './App.scss';

export const App = () => {
  const [movies, setMovie] = useState<Movie[]>(moviesFromServer);

  const onAdd = (newMovie: Movie) => {
    setMovie(currentMovie => [...currentMovie, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
