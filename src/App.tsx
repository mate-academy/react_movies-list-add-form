import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const changedListOfMovies = (movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={changedListOfMovies} />
      </div>
    </div>
  );
};
