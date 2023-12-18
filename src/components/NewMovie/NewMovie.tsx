import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Form } from '../../types/Form';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY_FORM = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY_FORM);

  const handleChange = (key: keyof Form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    return form.title.trim()
    && form.imdbId.trim() && form.imdbUrl.trim() && form.imgUrl.trim();
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd(form);
      setCount((prevCount) => prevCount + 1);
      setForm(EMPTY_FORM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={(newValue) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
