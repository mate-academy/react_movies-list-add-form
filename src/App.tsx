import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [
    copyMoviesFromServer,
    setMoviesFromServer,
  ] = useState(moviesFromServer);

  const handleAddMovie = (movie: Movie) => {
    setMoviesFromServer((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={copyMoviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
