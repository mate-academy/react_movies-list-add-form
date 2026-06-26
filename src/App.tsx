import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { useState } from 'react';

export const App = () => {
  const [posts, setPosts] = useState(moviesFromServer);

  const handlePost = (movie: Movie) => {
    setPosts(currentPost => [...currentPost, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={posts} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handlePost} />
      </div>
    </div>
  );
};
