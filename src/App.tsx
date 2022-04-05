import './App.scss';
import {
  FC, memo, useCallback, useState,
} from 'react';
import { MovieForm } from './components/MovieForm';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App: FC = memo(() => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = useCallback((movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  }, []);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <MovieForm onAdd={addMovie} />
      </div>
    </div>
  );
});
