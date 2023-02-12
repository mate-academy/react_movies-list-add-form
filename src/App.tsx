import './App.scss';
import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>(moviesFromServer);

  const updateMovies = (newMovie: Movie) => {
    setCurrentMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currentMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={updateMovies} />
      </div>
    </div>
  );
};
