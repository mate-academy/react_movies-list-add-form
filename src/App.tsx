import { useState, useCallback, memo } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = memo(() => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = useCallback((movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  }, [movies]);

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
});
