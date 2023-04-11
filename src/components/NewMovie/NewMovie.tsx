import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const validationUrl = (value: string) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(value);
};

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

  const getNewMovie = (name:string, newValue: string) => {
    setMovie(state => ({ ...state, [name]: newValue }));
  };

  const checkRequired = (): boolean => {
    const keys = Object.keys(movie);
    const isEmpty: boolean[] = [];

    keys.filter(key => key !== 'description').forEach(key => (
      !movie[key as keyof Movie].trim()
        ? isEmpty.push(true)
        : isEmpty.push(false)
    ));

    return isEmpty.some(el => el === true);
  };

  const isUrlValid = validationUrl(movie.imdbUrl)
  && validationUrl(movie.imgUrl);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMovie((state) => (
      {
        title: state.title.trim(),
        description: state.description.trim(),
        imgUrl: state.imgUrl.trim(),
        imdbUrl: state.imdbUrl.trim(),
        imdbId: state.imdbId.trim(),
      }
    ));

    if (!checkRequired() && isUrlValid) {
      onAdd(movie);

      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      setCount(state => state + 1);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={getNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={getNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={getNewMovie}
        onValid={validationUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={getNewMovie}
        onValid={validationUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={getNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkRequired() || !isUrlValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
