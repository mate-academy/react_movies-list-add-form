import { useState } from 'react';

import { Movie } from './types/Movie';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import './App.scss';

export const App = () => {
  const initialMovies = [...moviesFromServer];
  const [moviesToRender, setMoviesToRender] = useState([...initialMovies]);
  const addMovie = (movie: Movie) => {
    setMoviesToRender(currentMovies => [...currentMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
