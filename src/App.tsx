import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App: React.FC = () => {
  const [currMovies, setCurrMovies] = useState<Movie[]>(moviesFromServer);

  function addMovie(movie: Movie): void {
    setCurrMovies(currMoviesList => [...currMoviesList, movie]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={currMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
