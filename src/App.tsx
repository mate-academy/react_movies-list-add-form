import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [visibleMovies, setVisibleMovies] = useState(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  function addMovie(movie: Movie) {
    setVisibleMovies([...visibleMovies, movie]);
    setFormKey(formKey + 1);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={visibleMovies} />
      </div>
      <div className="sidebar">
        <NewMovie key={formKey} onAdd={addMovie} />
      </div>
    </div>
  );
};
