import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
}

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
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
