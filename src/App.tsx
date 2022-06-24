import {
  FC,
  useState,
} from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: FC = () => {
  const [movies, setMovie] = useState(moviesFromServer);

  const addMovie = (movie: Movie) => {
    const isAdded = movies
      .some((currMovie) => currMovie.imdbId === movie.imdbId);

    if (!isAdded) {
      setMovie([...movies, movie]);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAddMovie={addMovie} />
      </div>
    </div>
  );
};
