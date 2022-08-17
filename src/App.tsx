import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: React.FC = () => {
  const [moviesList, setMoviesList] = useState(moviesFromServer);
  const handlerAddMovie = (movie: Movie) => {
    setMoviesList(prevMovies => [
      ...prevMovies,
      movie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={handlerAddMovie}
        />
      </div>
    </div>
  );
};
