/*import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
const [movies, setMovies] = useState(moviesFromServer);
const addMovie = (newMovie: Movie) => {
  setMovies([...movies, newMovie]);
};


export const App = () => {
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(NewMovie) => {
          moviesFromServer.push(NewMovie);

        }}  />
      </div>
    </div>
  );
};
*/
import { useState } from 'react';
import './App.scss';

import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

import moviesFromServer from './api/movies.json';

import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
