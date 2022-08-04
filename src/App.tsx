import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const AddMovie = (newMovie: Movie) => {
    setMovies((state) => ([...state, newMovie]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={AddMovie} />
      </div>
    </div>
  );
};
