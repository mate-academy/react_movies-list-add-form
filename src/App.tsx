import { useState } from 'react'; // 1. Імпортуємо useState
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  // 2. Створюємо стан для фільмів. Передаємо початковий масив `moviesFromServer`
  // TypeScript автоматично зрозуміє тип даних на основі цього масиву.
  const [movies, setMovies] = useState(moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        {/* 3. Тепер передаємо в список фільми зі стану, а не static JSON */}
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        {/* Тут ми маємо розкоментувати та передати onAdd */}
        <NewMovie
          onAdd={newMovie => {
            // Нам потрібно оновити стан 'movies', додавши новий фільм
            // Оновлюємо стан, створюючи новий масив
            setMovies(prevMovies => [...prevMovies, newMovie]);
          }}
        />
      </div>
    </div>
  );
};
