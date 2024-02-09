import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';
import './App.scss';

export const App = () => {
  const [films, setFilms] = useState(moviesFromServer);

  const addFilms = (newFilms: Movie) => {
    setFilms(currentFilms => [...currentFilms, newFilms]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={films} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addFilms} />
      </div>
    </div>
  );
};
