import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibilityMovies, setVisibilityMovies] = useState(moviesFromServer);
  // const visibilityMovies = [...moviesFromServer];

  const addMovies = (movie: Movie) => {
    setVisibilityMovies(prev => {
      return [...prev, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibilityMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovies} />
      </div>
    </div>
  );
};
