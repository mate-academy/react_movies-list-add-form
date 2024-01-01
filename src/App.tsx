import { useEffect, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie, MovieList } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<MovieList>([]);

  useEffect(() => {
    setMovies([...moviesFromServer]);
  }, []);

  const onMovieAdd = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onMovieAdd} />
      </div>
    </div>
  );
};
