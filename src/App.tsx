import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [newMovieId, setNewMovieId] = useState('s');
  const addMovie = (movie: Movie) => {
    setMovies(existingMovies => [...existingMovies, movie]);
    setNewMovieId(Math.random().toString(16).slice(2));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={addMovie}
          key={newMovieId}
        />
      </div>
    </div>
  );
};
