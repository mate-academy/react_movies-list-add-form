import { useState, FC } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import './App.scss';

export const App: FC<{}> = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMovies(state => [...state, movie]);
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
