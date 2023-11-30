import { useState } from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [moviesToView, setMoviesToView] = useState(moviesFromServer);

  const addMovie = (movie: Movie): void => {
    setMoviesToView([...moviesToView, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToView} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
