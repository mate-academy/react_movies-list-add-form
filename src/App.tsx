import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React, { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [posts, setPosts] = useState<Movie[]>([...moviesFromServer]);

  const onAdds = (movie: Movie) => {
    setPosts([...posts, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={posts} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdds} />
      </div>
    </div>
  );
};
