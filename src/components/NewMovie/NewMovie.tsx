import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type MovieForm = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState<MovieForm>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  //перевірка чи всі реквайрд поля заповнені
  const isValid = Boolean(
    form.title.trim() &&
      form.imgUrl.trim() &&
      form.imdbUrl.trim() &&
      form.imdbId.trim(),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: form.title.trim(),
      description: form.description.trim(),
      imgUrl: form.imgUrl.trim(),
      imdbUrl: form.imdbUrl.trim(),
      imdbId: form.imdbId.trim(),
    };

    onAdd(newMovie);

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

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
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={value => setForm({ ...form, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={value => setForm({ ...form, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
