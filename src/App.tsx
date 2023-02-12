import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

export const App = () => {
  const [preparedMovie, setPreparedMovie] = useState<Movie[]>(moviesFromServer);

  const handleAdd = (movie: Movie) => {
    setPreparedMovie((prevMovieList) => [...prevMovieList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAdd} />
      </div>
    </div>
  );
};
