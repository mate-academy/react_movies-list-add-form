import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [updatedMovieList, setupdatedMovieList] = useState(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setupdatedMovieList([...updatedMovieList, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={updatedMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
