import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export interface Movie {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer as Movie[]);

  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    setMovies(prevMovies => {
      const maxId = prevMovies.reduce(
        (max, movie) => Math.max(max, movie.id),
        0,
      );

      const movieWithId: Movie = {
        ...newMovie,
        id: maxId + 1,
      };

      return [...prevMovies, movieWithId];
    });
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
