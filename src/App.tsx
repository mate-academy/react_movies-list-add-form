import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';

export const App: React.FC = () => {
  const [movieList, setMovieList] = useState([...moviesFromServer]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movieList} />
      </div>
      <div className="sidebar">
        <NewMovie
          onAdd={movie => {
            setMovieList(movies => [...movies, movie]);
          }}
        />
      </div>
    </div>
  );
};
