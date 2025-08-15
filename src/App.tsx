import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAdd = (movie: Movie) => {
    setMovies(prev => {
      if (prev.some(m => m.imdbId === movie.imdbId)) {
        return prev;
      }

      return [...prev, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAdd} />
      </div>
    </div>
  );
};
