import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

type Movie = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description?: string;
};

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (movie: Movie) => {
  setMovies(prevMovies => [...prevMovies, movie]);
};

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
