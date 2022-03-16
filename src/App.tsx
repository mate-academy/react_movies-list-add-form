import { useState } from 'react';
import './App.scss';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';

export const App: React.FC = () => {
  const [movies, setMovies] = useState([...moviesFromServer]);

  const addMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie addNew={addMovie} />
      </div>
    </div>
  );
};
