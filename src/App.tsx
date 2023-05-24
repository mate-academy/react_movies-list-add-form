import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMovie, setNewMovie] = useState(moviesFromServer);

  const handleMovies = (movie: Movie) => {
    setNewMovie((previousState) => [movie, ...previousState]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleMovies} />
      </div>
    </div>
  );
};
//
