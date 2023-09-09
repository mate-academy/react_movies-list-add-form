import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesArr, setMoviesArr] = useState(moviesFromServer);
  const addMovie = (newMovie: Movie) => setMoviesArr([newMovie, ...moviesArr]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesArr} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
