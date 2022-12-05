import './App.scss';
import { useState } from 'react';

import moviesFromServer from './api/movies.json';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMoviesList, setVisibleMoviesList] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setVisibleMoviesList([...visibleMoviesList, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
