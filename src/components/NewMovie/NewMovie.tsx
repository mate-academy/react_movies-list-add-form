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

const urlPattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
  '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
  '((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?' +
  '(?:[,.!/\\\\\\w]*))?)$'
);


export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);
  const [form, setForm] = useState<MovieForm>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isValid = Boolean(
    form.title.trim() &&
      form.imgUrl.trim() &&
      form.imdbUrl.trim() &&
      form.imdbId.trim(),
  );

  const handleChange = (fieldName: keyof MovieForm, fieldValue: string) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
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

    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} className="NewMovie" onSubmit={handleSubmit}>
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
        customValidation={value => urlPattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={form.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
        customValidation={value => urlPattern.test(value)}
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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
