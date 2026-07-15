import { useState } from 'react';
import { TextField } from '../TextField';

// Припустимо, що компонент приймає функцію onAdd для додавання фільму в загальний список
type Props = {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (field: string, value: string) => {
    setMovie(prev => ({ ...prev, [field]: value }));
  };

  // Перевіряємо, чи всі обов'язкові поля заповнені (без урахування пробілів)
  const isFormInvalid =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    // Передаємо копію об'єкта з обрізаними пробілами
    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    // Очищаємо форму
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    // Збільшуємо count, щоб перемонтувати форму і скинути помилки у TextField
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
