import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [count, setCount] = useState<number>(0);
  const [newMovieList, setNewMovieList] = useState<Movie[]>(
    [...moviesFromServer],
  );

  const setNewMovie = (movie: Movie) => {
    setNewMovieList(current => [...current, movie]);
    setCount(state => state + 1);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={setNewMovie} key={count} />
      </div>
    </div>
  );
};
