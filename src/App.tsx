import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [updatedMovies, setUpdatedMovies] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setUpdatedMovies(oldMovies => [...oldMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={updatedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={newMovie => {
            addMovie(newMovie);
          }}
        />
      </div>
    </div>
  );
};
