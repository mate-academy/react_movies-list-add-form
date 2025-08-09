import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const preparedMovies: Movie[] = moviesFromServer.map(movie => ({
  ...movie,
  id: movie.imdbId,
}));

export const App = () => {
  const [movies, setMovies] = useState(preparedMovies);

  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    const movieWithId: Movie = {
      id: crypto.randomUUID(),
      ...newMovie,
    };

    setMovies(currentMovies => [movieWithId, ...currentMovies]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
