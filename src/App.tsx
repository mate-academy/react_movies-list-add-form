import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>(moviesFromServer);
  const adPost = (movie: Post) => {
    setPosts(currentPosts => [...currentPosts, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={posts} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={adPost} /* onAdd={(movie) => {}} */ />
      </div>
    </div>
  );
};
