import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App:React.FC = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  const addMovie = (
    newTitle: string,
    newDesctiption: string,
    newImgUrl: string,
    newImdbUrl: string,
    newImdbId: string,
  ) => {
    const newMovie: Movie = {
      title: newTitle,
      description: newDesctiption,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

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
