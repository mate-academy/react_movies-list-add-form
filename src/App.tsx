import './App.scss';
import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [movieList, setMovieList] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMovieList(moviesList => [
      ...moviesList,
      newMovie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
