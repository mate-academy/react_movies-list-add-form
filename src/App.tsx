import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { getRandomDigits } from './components/TextField';

export const App = () => {
  const [session, setSession] = useState({
    movies: [...moviesFromServer],
  });
  const [formKey, setFormKey] = useState(getRandomDigits());

  const onAdd = (movie: Movie): void => {
    setSession(prev => ({
      movies: [...prev.movies, movie],
    }));
    setFormKey(getRandomDigits());
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={session.movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={formKey} onAdd={onAdd} />
      </div>
    </div>
  );
};
