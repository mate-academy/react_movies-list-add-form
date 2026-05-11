import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(currentMovies => [...currentMovies, newMovie]);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={formKey} onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
