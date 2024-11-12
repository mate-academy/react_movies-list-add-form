import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const initialMovies: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const addMovie = (movie: Movie) => {
    const newMovie = {
      ...movie,
    };

    setMovies(currentMovies => [newMovie, ...currentMovies]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onSubmit={addMovie} />
      </div>
    </div>
  );
};
