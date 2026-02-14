import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

// Функція валідації URL
const validateUrl = (value: string): string | null => {
  if (!value.trim()) {
    return null; // Якщо порожнє, не перевіряємо (обов'язковість перевіряється окремо)
  }

  return pattern.test(value) ? null : 'Invalid URL format';
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  // створюємо стейт для кожної форми
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // перевірка на порожні поля всіх форм підряд
  const isReadyToSubmit = Boolean(
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim(),
  );

  // обробник до кожної форми
  const handleTitleChange = (value: string) => setTitle(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleImgUrlChange = (value: string) => setImgUrl(value);
  const handleImdbUrlChange = (value: string) => setImdbUrl(value);
  const handleImdbIdChange = (value: string) => setImdbId(value);

  // обробка submit-button
  const handleAddChange = (event: React.FormEvent) => {
    event.preventDefault();

    // cтворюємо новий фільм
    const movieToAdd = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    // додаємо новий фільм на сторінку
    onAdd(movieToAdd);

    //щчищуємо форму після додання фільму
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Змінюємо ключ для переініціалізації форми (скидання помилок)
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleAddChange}>
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
