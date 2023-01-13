import { useState, FC } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: FC = () => {
  const [movie, setMovie] = useState(moviesFromServer);

  const onAdd = (newMovie: Movie) => setMovie(prevMovies => (
    [...prevMovies, newMovie]));

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movie} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};
