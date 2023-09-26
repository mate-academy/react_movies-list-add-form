import './App.scss';
import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { MovieType } from './components/Types';

export const App = () => {
  const [
    preparedMovies,
    setPreparedMovies,
  ] = useState<MovieType[]>(moviesFromServer);

  const handleAdd = (movie: MovieType) => setPreparedMovies([
    ...preparedMovies,
    movie,
  ]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={preparedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
};
