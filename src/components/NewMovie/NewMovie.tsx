import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
    description: '',
  });

  const isFormValid = Boolean(
    movie.title.trim() &&
      movie.imgUrl.trim().match(pattern) &&
      movie.imdbUrl.trim().match(pattern) &&
      movie.imdbId.trim(),
  );

  function handleTextFieldChange(key: keyof Movie, value: string) {
    setMovie(currentMovie => ({ ...currentMovie, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(movie);

    setMovie({
      title: '',
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
      description: '',
    });

    setCount(currentCount => currentCount + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleTextFieldChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => handleTextFieldChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => handleTextFieldChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleTextFieldChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => handleTextFieldChange('imdbId', newValue)}
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
