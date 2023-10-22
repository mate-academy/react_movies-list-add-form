import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const loadedMovies = [...moviesFromServer];

export const App = () => {
  const [movies, setMovies] = useState(loadedMovies);

  const addNewMovieHandler = (movie:Movie) => {
    setMovies([...loadedMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovieHandler} />
      </div>
    </div>
  );
};
