import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

const inititalMovies: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
}));

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(inititalMovies);

  const addMovie = ({ ...data }: Movie) => {
    const newMovie = {
      ...data,
    };

    setMovies(currentMovies => [...currentMovies, newMovie]);
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
