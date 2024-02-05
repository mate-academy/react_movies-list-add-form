import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [addMovie, setAddMovie] = useState(moviesFromServer);
  const add = (movie: Movie) => {
    setAddMovie(currentMovie => [...currentMovie, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={addMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={add} />
      </div>
    </div>
  );
};
