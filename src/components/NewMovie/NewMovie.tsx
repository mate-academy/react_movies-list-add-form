import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [activeSubmit, setActiveSubmit] = useState(true);

  useEffect(() => {
    const isValid =
      form.title.trim() !== '' &&
      form.imgUrl.trim() !== '' &&
      form.imdbUrl.trim() !== '' &&
      form.imdbId.trim() !== '';

    setActiveSubmit(!isValid);
  }, [form]);

  function handleChange(field: keyof typeof form, value: string) {
    setForm(prevForm => ({ ...prevForm, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie: Movie = {
      title: form.title,
      description: form.description,
      imgUrl: form.imgUrl,
      imdbUrl: form.imdbUrl,
      imdbId: form.imdbId,
    };

    onAdd(newMovie);

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setActiveSubmit(true);
    setCount(prev => prev + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        required
        onChange={value => handleChange('imgUrl', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        required
        onChange={value => handleChange('imdbUrl', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        required
        onChange={value => handleChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={activeSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
