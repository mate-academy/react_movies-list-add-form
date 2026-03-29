import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, setMovieList] = React.useState<Movie[]>(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie movies={movieList} setMovies={setMovieList} />
      </div>
    </div>
  );
};
