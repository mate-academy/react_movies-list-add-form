import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { useState } from 'react';
import { Movie } from './types/Movie';

export const App = () => {
  function getImageById(imdbID: string): string | null {
    return (
      moviesFromServer.find(movie => movie.imdbId === imdbID)?.imgUrl || null
    );
  }

  const [movies, setMovies] = useState(moviesFromServer);

  // функція для додавання нового фільму
  const handleAddMovie = (movie: Movie) => {
    // отримую зображення для нового фільму
    const imageUrl = getImageById(movie.imdbId);
    const newMovie = { ...movie, imageUrl }; //додаю зображення до фільму

    setMovies(prevMovies => [...prevMovies, newMovie]); // додаю новий фільм в список
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
