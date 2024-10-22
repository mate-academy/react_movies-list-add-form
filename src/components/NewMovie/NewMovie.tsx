import { type FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from './utils/validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

const INITIAL_FORM_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>(INITIAL_FORM_VALUES);

  const reset = () => {
    setFormValues(INITIAL_FORM_VALUES);
  };

  const handleChange = (name: keyof Movie, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const getUrlValidationError = (value: string) => {
    return pattern.test(value) ? null : 'Invalid URL format';
  };

  const { title, imdbId, imgUrl, imdbUrl } = formValues;
  const isFormValid =
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    !getUrlValidationError(imgUrl) &&
    !getUrlValidationError(imdbUrl);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(formValues);
    reset();
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        validate={getUrlValidationError}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        validate={getUrlValidationError}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={value => handleChange('imdbId', value)}
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
