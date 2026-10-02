import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [newMovie, setNewMovie] = useState<Movie[]>(moviesFromServer);

  const addPost = (newPost: Movie) => {
    setNewMovie((post) => [...post, newPost]);
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovie} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addPost} />
      </div>
    </div>
  );
};
