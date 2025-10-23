import { useState } from 'react';
import { TextField } from '../TextField/TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd?: (movie: Omit<Movie, 'imdbId'> & { imdbId: string }) => boolean;
}

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formKey, setFormKey] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { title, description, imgUrl, imdbUrl, imdbId } = formValues;

  const isSubmitDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
    setSubmitError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const trimmedDescription = description.trim();

    const movie: Omit<Movie, 'imdbId'> & { imdbId: string } = {
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
      ...(trimmedDescription && { description: trimmedDescription }),
    };

    if (onAdd) {
      const isAdded = onAdd(movie);

      if (isAdded) {
        setFormValues(defaultValues);
        setFormKey(currentKey => currentKey + 1);
      } else {
        setSubmitError('Movie with this IMDb ID already exists!');
      }
    }
  };

  const validateUrl = (value: string) =>
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/.test(
      value,
    )
      ? ''
      : 'Invalid URL format';

  const validateImdbId = (value: string) =>
    /^tt\d{7,}$/.test(value)
      ? ''
      : 'IMDb ID must start with "tt" followed by at least 7 digits';

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      {submitError && <p className="help is-danger">{submitError}</p>}

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
        isTextArea
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
        validate={validateUrl}
      />
      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
        validate={validateUrl}
      />
      <TextField
        name="imdbId"
        label="IMDb ID"
        value={imdbId}
        onChange={handleChange}
        required
        validate={validateImdbId}
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
