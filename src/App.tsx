import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [allMovie, setNewMovie] = useState(moviesFromServer);
  const addNewMovie = (
    title:string,
    description:string,
    imgUrl:string,
    imdbUrl:string,
    imdbId:string,
  ) => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setNewMovie([
      ...allMovie, newMovie,
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={allMovie} />
      </div>
      <div className="sidebar">
        <NewMovie addNewMovie={addNewMovie} />
      </div>
    </div>
  );
};
