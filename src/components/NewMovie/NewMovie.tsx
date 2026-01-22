import { useState, FormEvent } from 'react'; // 1. Додали FormEvent для типізації події
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie'; // Перевір шлях, зазвичай він '../../types/Movie'

interface Props {
  onAdd: (movie: Movie) => void;
}

const URL_PATTERN =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // 2. NEW: Валідація. Кнопка активна, тільки якщо ці поля не пусті.
  // Description тут немає, бо він необов'язковий.
  const isFormValid =
    title.trim().length > 0 &&
    imgUrl.trim().length > 0 &&
    URL_PATTERN.test(imgUrl) && // Додали перевірку Regex
    imdbUrl.trim().length > 0 &&
    URL_PATTERN.test(imdbUrl) && // Додали перевірку Regex
    imdbId.trim().length > 0;

  // 3. NEW: Функція відправки форми
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault(); // Зупиняємо перезавантаження сторінки

    // Створюємо об'єкт фільму
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    // Відправляємо батьківському компоненту
    onAdd(newMovie);

    // Очищаємо поля
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Оновлюємо ключ форми, щоб скинути червоні рамки помилок
    setCount(prev => prev + 1);
  };

  const validateUrl = (value: string) => {
    // Якщо значення немає — повертаємо true (бо перевірку на required робить сам TextField),
    // АЛЕ якщо значення є — перевіряємо його регуляркою.
    if (!value) {
      return true;
    }

    return URL_PATTERN.test(value);
  };

  return (
    // 4. CHANGE: Додали onSubmit={handleFormSubmit}
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      {/* 5. CHANGE: Прибрали required, бо опис необов'язковий */}
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
        validator={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validator={validateUrl}
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
          {/* 6. CHANGE: Додали disabled, який залежить від валідації */}
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
