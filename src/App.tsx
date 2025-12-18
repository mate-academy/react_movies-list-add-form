import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  const handleAddMovie = movie => {
    setMovies(currentMovies => [...currentMovies, movie]);
    setFormKey(key => key + 1); // очищає форму та помилки
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
