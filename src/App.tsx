import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

const initialMovies: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const addMovie = (movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, movie]);
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
