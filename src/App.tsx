import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [totalFilm, setTotalFilm] = useState(moviesFromServer);
  const addFilm = (newFilm: Movie) => {
    setTotalFilm(
      [...moviesFromServer, newFilm],
    );
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={totalFilm} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addFilm} />
      </div>
    </div>
  );
};
