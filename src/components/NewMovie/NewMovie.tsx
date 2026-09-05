import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

function checkUrl(url: string): boolean {
  const pattern = // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
}

// any keys from FormValues but with string values
type FormErrors = Record<keyof Omit<Movie, 'description'>, string>;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    title: 'Title is required',
    imgUrl: 'Img URL is required',
    imdbUrl: 'Imdb URL is required',
    imdbId: 'Imdb ID is required',
  });

  function handleError(label: string, field: keyof Movie, newValue: string) {
    if (field === 'description') {
      return;
    }

    if (newValue.trim() === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: `${label} is required`,
      }));
    }

    if (!errors[field] && field.includes('Url') && !checkUrl(newValue.trim())) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: `${label} is not valid`,
      }));
    }
  }

  function handleChange(field: keyof Movie, newValue: string) {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: '',
    }));
    setMovie(prevMovie => ({ ...prevMovie, [field]: newValue }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd(movie);
    setCount(prevCount => prevCount + 1);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
        onError={value => handleError('Title', 'title', value)}
        errorMessage={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
        onError={value => handleError('Description', 'description', value)}
        errorMessage={''}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onError={value => handleError('Image URL', 'imgUrl', value)}
        errorMessage={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onError={value => handleError('Imdb URL', 'imdbUrl', value)}
        errorMessage={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onError={value => handleError('Imdb ID', 'imdbId', value)}
        errorMessage={errors.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              errors.title !== '' ||
              errors.imgUrl !== '' ||
              errors.imdbUrl !== '' ||
              errors.imdbId !== ''
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
