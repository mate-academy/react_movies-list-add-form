import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [addMovieList, setAddMovieList] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={addMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setAddMovieList([...addMovieList, movie]);
          }}
        />
      </div>
    </div>
  );
};
