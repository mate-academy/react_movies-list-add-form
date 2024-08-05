/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import NewMovie from './components/NewMovie/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const handleAddMovie = (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => {
    console.log('Movie added:', movie);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesFromServer} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
