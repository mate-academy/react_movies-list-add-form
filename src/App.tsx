import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [moviesToRender, setMoviesToRender] =
    useState<Movie[]>(moviesFromServer);

  function addNewMovie(movie: Movie) {
    setMoviesToRender(prevMovies => {
      return [...prevMovies, movie];
    });
  }
  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesToRender} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addNewMovie} />
      </div>
    </div>
  );
};
