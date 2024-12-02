import { useState } from 'react';
import moviesFromServer from './api/movies.json';

import './App.scss';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const onAdd = (newMovie: Movie) => {
    setMovies(current => [...current, newMovie]);
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
