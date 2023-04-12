import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie, ObjectKeys } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const validationUrl = (value: string | null) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (value !== null) {
    return pattern.test(value);
  }

  return false;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<ObjectKeys>({
    title: null,
    description: '',
    imgUrl: null,
    imdbUrl: null,
    imdbId: null,
  });

  const [isSubmited, setIsSubmited] = useState(false);

  const getNewMovie = (name:string, newValue: string) => {
    setMovie(state => ({ ...state, [name]: newValue }));
  };

  const checkRequired = (): boolean => {
    const keys = Object.keys(movie);

    return keys.filter((key) => key !== 'description')
      .some(key => movie[key]?.trim() === '' || movie[key] === null);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMovie((state) => (
      {
        title: state.title !== null ? state.title.trim() : null,
        description: state.description.trim(),
        imgUrl: state.imgUrl !== null ? state.imgUrl.trim() : null,
        imdbUrl: state.imdbUrl !== null ? state.imdbUrl.trim() : null,
        imdbId: state.imdbId !== null ? state.imdbId.trim() : null,
      }
    ));

    const isUrlValid = validationUrl(movie.imdbUrl)
    && validationUrl(movie.imgUrl);

    if (!checkRequired() && isUrlValid) {
      onAdd(movie);

      setMovie(
        {
          title: null,
          description: '',
          imgUrl: null,
          imdbUrl: null,
          imdbId: null,
        },
      );
    }

    setIsSubmited(true);
  };

  const isDisable = checkRequired()
    || (!validationUrl(movie.imdbUrl)
    || !validationUrl(movie.imgUrl));

  return (
    <form
      className="NewMovie"
      onSubmit={submit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={getNewMovie}
        isSubmited={isSubmited}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={getNewMovie}
        isSubmited={isSubmited}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={getNewMovie}
        onValid={validationUrl}
        isSubmited={isSubmited}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={getNewMovie}
        onValid={validationUrl}
        isSubmited={isSubmited}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={getNewMovie}
        isSubmited={isSubmited}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
