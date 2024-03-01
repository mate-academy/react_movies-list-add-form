import { useState } from 'react';
import 'bulma';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { NewMovie } from './components/NewMovie/NewMovie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const addMovie = (movie: Movie) => {
    setMovies((prevMovies: Movie[]) => [...prevMovies, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};

export default App;
