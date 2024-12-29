import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './components/types';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([...moviesFromServer]);

  const addMovie = (newMovie: Movie) => {
    setMovies(moviesPrev => [...moviesPrev, newMovie]);
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
