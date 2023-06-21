import { useState } from 'react';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

export const App = () => {
  const [addedMovies, setAddedMovies] = useState<[] | Movie[]>([]);

  const addMovie = (movie: Movie) => {
    setAddedMovies(state => [...state, movie]);
  };

  const visibleMovies = [...moviesFromServer, ...addedMovies];

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
