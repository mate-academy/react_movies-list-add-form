import './App.scss';
import { useEffect, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const localMovies = localStorage.getItem('moviesArray');
  const realMovies = localMovies ? JSON.parse(localMovies) : moviesFromServer;
  const [movies, setMovies] = useState<Movie[]>(realMovies);

  const addMovie = (movie: Movie) => {
    setMovies(visibleMovies => [...visibleMovies, movie]);
  };

  useEffect(() => {
    localStorage.setItem('moviesArray', JSON.stringify(movies));
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
};
