import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [movie, setMovie] = useState<Movie[]>(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  const addMovie = (newMovie: Movie) => {
    setMovie(currentMovies => [...currentMovies, newMovie]);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie key={formKey} onAdd={addMovie} />{' '}
      </div>
    </div>
  );
};
