import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [newMovie, setNewMovie] = useState([...moviesFromServer]);

  const addMovie = (newMovieInfo : Movie) => {
    const newMovieObject = {
      ...newMovieInfo,
    };

    setNewMovie((currentMovies) => [...currentMovies, newMovieObject]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie addNewMovie={addMovie} />
      </div>
    </div>
  );
};
