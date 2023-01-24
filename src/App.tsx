import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [displayedMovies, setDisplayedMovies] = useState(moviesFromServer);

  const onAdd = (newMovieToAdd: Movie) => {
    setDisplayedMovies(state => [...state, newMovieToAdd]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={displayedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
