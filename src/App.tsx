import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [count, setCount] = useState(0);

  const onAdd = (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ) => {
    moviesFromServer.push({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(count + 1);
  };

  return (
    <div className="page">
      <div className="page-content">

        <MoviesList
          movies={moviesFromServer}
        />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};
