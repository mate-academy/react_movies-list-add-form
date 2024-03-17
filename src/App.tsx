import { useState } from 'react';

import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const initialMovies: Movie[] = moviesFromServer.map(movie => movie);

export const App = () => {
  const [movies, setMovie] = useState<Movie[]>(initialMovies);

  const addMovie = (movie: Movie) => {
    setMovie(currentMovie => [...currentMovie, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
