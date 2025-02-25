import { useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

// Додаємо індекс-сігнатуру для динамічної індексації
interface FormData {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  [key: string]: string;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Стан для значень полів
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // Збільшуємо count після успішного додавання для скидання форми
  const [count, setCount] = useState(0);

  // Обробник зміни значень у TextField
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Перевірка, чи всі обов’язкові поля заповнені (з обрізкою пробілів)
  const areRequiredFieldsFilled = () => {
    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    return requiredFields.every(field => formData[field].trim() !== '');
  };

  // Обробник відправки форми
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (areRequiredFieldsFilled()) {
      onAdd(formData);
      // Очищаємо форму, скидаючи ключ
      setFormData({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setCount(prev => prev + 1); // Змінюємо ключ для реініціалізації
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areRequiredFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
