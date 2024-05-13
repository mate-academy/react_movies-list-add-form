import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

const movies: Movie[] = moviesFromServer.map(movie => movie);

export const App = () => {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  const addMovie = (newMovie: Movie) => {
    setMovieList([...movieList, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
