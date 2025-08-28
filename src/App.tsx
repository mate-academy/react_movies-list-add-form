import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [formKey, setFormKey] = useState(0);

  const handleAddMovie = (movie: {
    title: string;
    description?: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => {
    setMovies(prev => [
      ...prev,
      {
        ...movie,
        description: movie.description ?? '',
      },
    ]);
    setFormKey(k => k + 1);
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
