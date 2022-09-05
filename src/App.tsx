import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';
import './App.scss';

export const App: React.FC = () => {
  const [movieList, setMovieList] = useState(moviesFromServer);

  const newMovieList = (createNewMovie: Movie) => {
    setMovieList(
      [...movieList, createNewMovie],
    );
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAddNewMovie={newMovieList} />
      </div>
    </div>
  );
};
