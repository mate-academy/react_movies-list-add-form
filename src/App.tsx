import React, { useState } from 'react'; // Додано імпорт useState
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie'; // Не забудь імпортувати тип Movie

export const App = () => {
  // 1. Ініціалізуємо стан даними з сервера
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const addMovie = (newMovie: Movie) => {
    // 2. Додаємо новий фільм до стану
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* 3. ВАЖЛИВО: Передаємо стан 'movies', а не 'moviesFromServer' */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={addMovie} />
      </div>
    </div>
  );
};
