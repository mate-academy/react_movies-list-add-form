import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import './App.scss';

type Props = {
  movies: Movie[];
};

export const App: React.FC<Props> = () => {
  const [movies, setMovies] = useState<Movie[]>([...moviesFromServer]);

  const addMovie = (newMovie: Movie) => {
    setMovies((prev) => ([
      ...prev,
      newMovie,
    ]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAddMovie={addMovie} />
      </div>
    </div>
  );
};
