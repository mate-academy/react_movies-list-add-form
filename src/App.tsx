import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const [visibleMovie, setVisibleMovie] = useState([...moviesFromServer]);

  const addMovie = (movie: Movie) => {
    setVisibleMovie(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
