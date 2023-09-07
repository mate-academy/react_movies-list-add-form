import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesArr, setMoviesArr] = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => setMoviesArr([...moviesArr, newMovie]);

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
