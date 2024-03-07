import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
