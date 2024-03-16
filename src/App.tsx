import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [posts, setPosts] = useState<Movie[]>(moviesFromServer);

  const addPost = (newPublication: Movie) => {
    setPosts(currentPos => [...currentPos, newPublication]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={posts} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addPost} />
      </div>
    </div>
  );
};
