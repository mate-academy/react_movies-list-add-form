import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovie] = useState<Movie[]>(moviesFromServer);

  const newMovie = (movie: Movie) => {
    setMovie(currentMovies => [movie, ...currentMovies]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={newMovie} />
      </div>
    </div>
  );
};
