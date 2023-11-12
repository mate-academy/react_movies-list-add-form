import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const moviesList: Movie[] = moviesFromServer.map(movie => ({ ...movie }));

export const App = () => {
  const [movies, setMovies] = useState(moviesList);

  const handleAddFilm = (movie: Movie) => {
    setMovies(prevMovies => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddFilm} />
      </div>
    </div>
  );
};
