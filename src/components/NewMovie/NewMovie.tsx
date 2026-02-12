import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

// Регулярний вираз для перевірки URL
const urlPattern = /^https?:\/\/[^\s]+$/;

// Функція валідації URL
const validateUrl = (value: string): string | null => {
  if (!value.trim()) {
    return null; // Якщо порожнє, не перевіряємо (обов'язковість перевіряється окремо)
  }

  return urlPattern.test(value) ? null : 'Invalid URL format';
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Збільшуємо лічильник після успішного надсилання форми
  // щоб скинути статус touched для всіх полів
  const [count, setCount] = useState(0);

  // Стани для всіх полів форми
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Перевіряємо, чи всі обов'язкові поля заповнені (з урахуванням trim)
  const isReadyToSubmit =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  // Обробники зміни для кожного поля
  const handleTitleChange = (value: string) => setTitle(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleImgUrlChange = (value: string) => setImgUrl(value);
  const handleImdbUrlChange = (value: string) => setImdbUrl(value);
  const handleImdbIdChange = (value: string) => setImdbId(value);

  // Обробник надсилання форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Створюємо новий фільм
    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    // Додаємо фільм через callback
    onAdd(newMovie);

    // Очищуємо форму
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Змінюємо ключ для переініціалізації форми (скидання помилок)
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
