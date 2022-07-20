import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);

  const addMovie = (movie: Movie) => {
    setMovies((prevMovies) => ([...prevMovies, movie]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <h1>Add your movie</h1>

        <NewMovie addMovie={addMovie} />
      </div>
    </div>
  );
};
