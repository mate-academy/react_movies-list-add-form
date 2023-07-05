import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const onAdd = (newMovie: Movie) => {
    setMoviesList(
      (prevMovieList) => ([...prevMovieList, newMovie]),
    );
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};
