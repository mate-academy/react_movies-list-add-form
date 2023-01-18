import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [renderedMovies, setRenderedMovies]
    = useState<Movie[]>([...moviesFromServer]);

  const handleNewMovie = (movie: Movie) => {
    setRenderedMovies(prevState => prevState.concat(movie));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={renderedMovies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleNewMovie} />
      </div>
    </div>
  );
};
