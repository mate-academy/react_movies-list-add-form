import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlPattern = new RegExp(
  `
  ^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|
  (?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)
  ((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$
`.replace(/\s+/g, ''),
);

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValid = () => {
    return (
      form.title.trim().length > 0 &&
      form.imgUrl.trim().length > 0 &&
      urlPattern.test(form.imgUrl.trim()) &&
      form.imdbUrl.trim().length > 0 &&
      urlPattern.test(form.imdbUrl.trim()) &&
      form.imdbId.trim().length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }

    const newMovie: Movie = {
      ...form,
      title: form.title.trim(),
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
    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
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
        onChange={value => handleChange('imgUrl', value)}
        required
        validate={(val: string) => urlPattern.test(val)}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={form.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
        validate={(val: string) => urlPattern.test(val)}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={form.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
