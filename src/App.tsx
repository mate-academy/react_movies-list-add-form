import './App.scss';
import { useState } from 'react';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);

  const onAddNewMovie = (movie: Movie) => {
    setMovies(prevState => [...prevState, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={onAddNewMovie}
        />

      </div>
    </div>
  );
};
