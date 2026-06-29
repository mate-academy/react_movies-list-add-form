import { useState } from 'react';
import { TextField } from '../TextField';

// Інтерфейс для об'єкта фільму
interface Movies {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

// Оновлюємо назву пропсу на `onAdd`, як цього очікують тести
interface NewMovieProps {
  onAdd: (movie: Movies) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Ініціалізуємо стан форми об'єктом із пустими рядками
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // Перевіряємо невалідність форми: якщо хоча б одне з обов'язкових полів порожнє (description ігнорується)
  const isFormInvalid =
    !formValues.title.trim() ||
    !formValues.imgUrl.trim() ||
    !formValues.imdbUrl.trim() ||
    !formValues.imdbId.trim();

  // Лічильник для скидання стану помилок у полях TextField
  const [count, setCount] = useState(0);
  // Обробник відправки форми
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Скасовуємо стандартну поведінку браузера (перезавантаження)
    event.preventDefault();

    // Якщо всі обов'язкові поля заповнені
    if (!isFormInvalid) {
      // Викликаємо функцію додавання фільму, яку очікують тести
      onAdd(formValues);

      // Скидаємо значення полів форми до початкових
      setFormValues({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      // Збільшуємо лічильник для зміни key форми, що скине статус "touched" (помилки після blur)
      setCount(prev => prev + 1);
    }
  };


  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(newValue: string) =>
          setFormValues(currentValues => ({
            ...currentValues,
            title: newValue,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={(newValue: string) =>
          setFormValues(currentValues => ({
            ...currentValues,
            description: newValue,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={(newValue: string) =>
          setFormValues(currentValues => ({
            ...currentValues,
            imgUrl: newValue,
          }))
        }
        required // Переконайся, що тут є required, якщо TextField використовує його для валідації blur
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={(newValue: string) =>
          setFormValues(currentValues => ({
            ...currentValues,
            imdbUrl: newValue,
          }))
        }
        required // Переконайся, що тут є required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={(newValue: string) =>
          setFormValues(currentValues => ({
            ...currentValues,
            imdbId: newValue,
          }))
        }
        required // Переконайся, що тут є required
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
