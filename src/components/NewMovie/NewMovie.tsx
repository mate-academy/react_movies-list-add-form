import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (name: keyof Movie, value: string) => {
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedMovie = Object.fromEntries(
      Object.entries(movie).map(([key, value]) => [key, value.trim()])
    ) as Movie;

    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];
    const isValid = requiredFields.every(field => trimmedMovie[field as keyof Movie] !== '');

    if (isValid) {
      console.log('is valid');
      onAdd(trimmedMovie);

      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setFormKey(prevKey => prevKey + 1);
    } else {
      Object.keys(movie).forEach(name => {
        const inputElement = document.querySelector(`[data-cy="movie-${name}"]`) as HTMLInputElement;
        if (inputElement) {
          inputElement.dispatchEvent(new Event('blur'));
        }
      });
    }
  };

  const isFormValid = (() => {
    const trimmedMovie = Object.fromEntries(
      Object.entries(movie).map(([key, value]) => [key, value.trim()])
    ) as Movie;

    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];
    return requiredFields.every(field => trimmedMovie[field as keyof Movie] !== '');
  })();

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={movie.title}
          onChange={value => handleChange('title', value)}
          required
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
          onChange={value => handleChange('imgUrl', value)}
          required
          validate={(value: string) => urlRegex.test(value) ? undefined : "Invalid Image URL"}
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={movie.imdbUrl}
          onChange={value => handleChange('imdbUrl', value)}
          required
          validate={(value: string) => urlRegex.test(value) ? undefined : "Invalid IMDB URL"}
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={movie.imdbId}
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
