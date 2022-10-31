import { FC, useState, Fragment } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [formCount, setFormCount] = useState(0);

  const onAdd = ((movie: Movie) => {
    setMovies(currentMovies => [...currentMovies, movie]);
    setFormCount(current => current + 1);
  });

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <Fragment key={formCount}>
          <NewMovie onAdd={onAdd} />
        </Fragment>
      </div>
    </div>
  );
};
