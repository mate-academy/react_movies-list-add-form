import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import './App.scss';
import { Movie } from './types/Movie';

export const App = () => {
  const [filmList, setFilmList] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={filmList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Movie) => {
            setFilmList([...filmList, movie]);
          }}
        />
      </div>
    </div>
  );
};
