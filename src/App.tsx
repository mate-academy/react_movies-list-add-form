import { useState } from 'react';
import { Movie } from './types/Movie';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { NewMovie } from './components/NewMovie';
import './App.scss';

const movies: Movie[] = moviesFromServer.map((movie) => ({
  ...movie,
  id: movie.imdbId,
}));

export const App = () => {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  const onAdd = (movie: Movie) => {
    setMovieList((prev) => [...prev, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
