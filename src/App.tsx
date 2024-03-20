import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movies, setMovies] = React.useState<Movie[]>(moviesFromServer);

  const handleOnAdd = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleOnAdd} />
      </div>
    </div>
  );
};
