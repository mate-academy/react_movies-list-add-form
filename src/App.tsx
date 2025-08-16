import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  const [data, setData] = useState<Movie[]>(moviesFromServer);
  const handlerAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void = (movie: Movie) => {
    setData(prev => [...prev, movie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={data} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            handlerAdd(movie);
          }}
        />
      </div>
    </div>
  );
};
