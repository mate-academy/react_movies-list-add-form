import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);
  const [date, setDate] = useState(+new Date());

  const handleOnAdd = (movie: Movie) => {
    setMovies([...movies, movie]);
    setDate(+new Date());
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>

      <div className="sidebar">
        <NewMovie onAdd={handleOnAdd} key={date} />
      </div>
    </div>
  );
};
