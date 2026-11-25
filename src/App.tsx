import './App.scss';
import React from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = React.useState(moviesFromServer);
  const [newMovieKey, setNewMovieKey] = React.useState(0);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setMovies([...movies, movie]);
            setNewMovieKey(newMovieKey + 1);
          }}
          key={newMovieKey}
        />
      </div>
    </div>
  );
};
