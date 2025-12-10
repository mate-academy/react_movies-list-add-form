import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

const defaultFormValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd?: (movie: Movie) => void;
};

type FormErrors = Partial<Record<keyof typeof defaultFormValues, string>>;

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  // Increase the count after successful form submission to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] =
    React.useState<typeof defaultFormValues>(defaultFormValues);

  const isSubmitDisabled = Object.entries(movie).some(([key, value]) => {
    if (key === 'description') {
      return false;
    }

    return !value.trim();
  });

  const validURlPattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

  function validate(values: typeof defaultFormValues): FormErrors {
    const formErrors: FormErrors = {};

    if (!values.title.trim()) {
      formErrors.title = 'Title is required';
    }

    if (!values.imgUrl.trim()) {
      formErrors.imgUrl = 'Image URL is required';
    }

    if (!values.imdbUrl.trim()) {
      formErrors.imdbUrl = 'Imdb URL is required';
    }

    if (!values.imdbId.trim()) {
      formErrors.imdbId = 'Imdb ID is required';
    }

    return formErrors;
  }

  function handleChange(name: string, value: string) {
    setMovie(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(movie);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onAdd(movie);

    setMovie(defaultFormValues);
    // Clear the form
    setCount(currentCount => currentCount + 1);
  }

  const validateUrl = (
    fieldName: string,
    value: string,
  ): string | undefined => {
    return validURlPattern.test(value) ? undefined : fieldName + ' is invalid';
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        required
        onChange={value => handleChange('title', value)}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={value => handleChange('imgUrl', value)}
        validate={value => validateUrl('Image URL', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={value => handleChange('imdbUrl', value)}
        validate={value => validateUrl('Imdb URL', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={value => handleChange('imdbId', value)}
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
