import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// Додамо інтерфейс для пропсів, щоб отримувати функцію додавання з App.tsx
interface Props {
  onAdd: (movie: Omit<Movie, 'id'>) => void; // Тимчасово any, пізніше замінимо на тип Movie
}

export const NewMovie = ({ onAdd }: Props) => {
  // Цей стейт потрібен для повного скидання форми (перезавантаження компонентів)
  const [count, setCount] = useState(0);

  // Створюємо стан для кожного поля
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Перевіряємо, чи всі обов'язкові поля заповнені (використовуємо .trim(), щоб ігнорувати пробіли)
  const isSubmitDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми (перезавантаження сторінки)

    // Формуємо об'єкт нового фільму
    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    // Відправляємо дані наверх у компонент App
    onAdd(newMovie);

    // Очищаємо поля
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Збільшуємо count, щоб змінити key форми. Це зітре історію помилок у TextField.
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
