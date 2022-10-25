import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movieslist, setMoviesList] = useState(moviesFromServer);
  const onAdd = (movie: Movie) => {
    setMoviesList([...movieslist, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieslist} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
