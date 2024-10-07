import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>(moviesFromServer);

  function onAdd(newFilm: Movie) {
    setVisibleMovies((current: Movie[]) => [...current, newFilm]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
