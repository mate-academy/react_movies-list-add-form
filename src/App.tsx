import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { AddMovieForm } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movieList, setMovieList] = useState(moviesFromServer);

  const onAdd = (movie: Movie) => {
    setMovieList(prevState => (
      [...prevState, movie]
    ));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <AddMovieForm onAdd={onAdd} />
      </div>
    </div>
  );
};
