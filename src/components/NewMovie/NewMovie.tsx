import './NewMovie.scss';
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState(defaultMovie);

  const onInputChange = (name: string, value: string) => {
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const customValidation = (movieToCheck: Movie) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)(?:[/,\d_.\w]+)$/gmi;

    if (!movieToCheck.imgUrl.match(pattern)) {
      setIsImgUrlValid(true);
    } else {
      setIsImgUrlValid(false);
    }

    if (!movieToCheck.imdbUrl.match(pattern)) {
      setIsImdbUrlValid(true);
    } else {
      setIsImdbUrlValid(false);
    }

    return movieToCheck.imgUrl.match(pattern)
      && movieToCheck.imdbUrl.match(pattern);
  };

  const isFormValid = () => {
    return movie.title.length && movie.imgUrl.length
      && movie.imdbUrl.length && movie.imdbId.length;
  };

  const onFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid() && customValidation(movie)) {
      onAdd(movie);
      setCount(count + 1);
      setMovie(defaultMovie);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmition}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={onInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={onInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={onInputChange}
        isImgUrlValid={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={onInputChange}
        isImdbUrlValid={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={onInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
