import { useState } from 'react';
import { TextField } from '../TextField';

// Типізація пропсів компонента
interface NewMovieProps {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0); // для скидання touched у TextField

  // Перевірка, чи всі обов'язкові поля заповнені
  const isFormValid =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    // Додаємо новий фільм
    onAdd(form);

    // Очищаємо форму
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    // Змінюємо count, щоб TextField скинув touched
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => setForm({ ...form, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => setForm({ ...form, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={value => setForm({ ...form, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={form.imdbUrl}
        onChange={value => setForm({ ...form, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={form.imdbId}
        onChange={value => setForm({ ...form, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
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
