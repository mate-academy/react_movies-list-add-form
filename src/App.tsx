import React, { useState } from 'react';
import { Movie } from './types/Movie';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [newMovieList, setNewMovieList] = useState([...moviesFromServer]);
  const onAdd = (movie: Movie) => {
    setNewMovieList(
      state => [...state, movie],
    );
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
