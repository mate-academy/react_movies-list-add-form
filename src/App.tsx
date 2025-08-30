import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);

  const addMovie = movie =>
    setMoviesList(currentMovies => [...currentMovies, movie]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            addMovie(movie);
          }}
        />
      </div>
    </div>
  );
};
