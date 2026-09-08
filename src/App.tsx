import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [actualMovies, setActualMovies] = useState<Movie[]>(moviesFromServer);

  const addNewMovie = (movie: Movie) => {
    setActualMovies((movies: Movie[]) => {
      return [...movies, movie];
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={actualMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={(movie: Movie) => addNewMovie(movie)} />
      </div>
    </div>
  );
};
