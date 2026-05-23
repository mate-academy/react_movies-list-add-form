import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  // 1. Ініціалізуємо стан нашими даними з сервера
  const [movies, setMovies] = useState(moviesFromServer);

  // 2. Функція, яка приймає новий фільм і оновлює список
  const handleAddMovie = (newMovie: Omit<Movie, 'id'>) => {
    // Замість any краще використати тип (наприклад, Omit<Movie, 'id'>)
    // Генеруємо унікальний id для нового фільму (бо в нас немає справжнього бекенду)
    // Якщо у файлі types/Movie.ts поле id - це рядок (string), можеш додати .toString()
    const movieWithId = {
      ...newMovie,
      id: Date.now(),
    };

    // Додаєм новий фільм вкінець поточного масиву
    setMovies(currentMovies => [...currentMovies, movieWithId]);
  };

  return (
    <div className="page">
      <div className="page-content">
        {/* 3. Тепер передаємо сюди наш стан (state) замість статичного JSON */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        {/* 4. Передаємо функцію додавання у нашу форму */}
        <NewMovie onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
