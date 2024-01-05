import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const initialMovies: Movie[] = moviesFromServer.map(value => ({ ...value }));

export const App = () => {
  const [movies, setMovies] = useState(initialMovies);

  const addHandler = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addHandler} />
      </div>
    </div>
  );
};
