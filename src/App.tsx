import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import React from 'react';

const movies = [...moviesFromServer];

export const App = () => {
  const useForceUpdate = () => {
    const [, setToggle] = React.useState(false);

    return React.useCallback(() => setToggle(toggle => !toggle), []);
  };

  const forceUpdate = useForceUpdate();

  function handleAdd(movie: Record<string, string>) {
    const obj = {
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    };

    movies.push(obj);

    // Re-render the component now
    forceUpdate();
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={(movie: Record<string, string>) => {
            handleAdd(movie);
          }}
        />
      </div>
    </div>
  );
};
