import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [initialMovies, setInitialMovoies]
  = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setInitialMovoies(currentMovieis => [...currentMovieis, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={initialMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
