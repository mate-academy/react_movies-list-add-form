import React, { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { moviesFromServer } from './api/movies.json';

export interface Movie {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description?: string;
}

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Movies from IMDB</h1>
      <NewMovie onAdd={addMovie} />
      <MoviesList movies={movies} />
    </div>
  );
};
