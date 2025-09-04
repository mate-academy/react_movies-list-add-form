import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultMovieInfo: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};
const OPTIONAL_FIELD: keyof Movie = 'description';

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after succe ssful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movieInfo, setMovieInfo] = useState<Movie>(defaultMovieInfo);

  function getIsFilled(movie: Movie): boolean {
    const requiredFields = Object.entries(movie).filter(
      item => item[0] !== OPTIONAL_FIELD,
    );

    return requiredFields.every(item => item[1].trim() !== '');
  }

  const isFilled = getIsFilled(movieInfo);

  function handleChange(changeEvent: React.ChangeEvent<HTMLFormElement>): void {
    const field = changeEvent.target;
    const { name, value } = field;

    setMovieInfo(currentMovieInfo => ({
      ...currentMovieInfo,
      [name]: value,
    }));
  }

  function handleBlur(focusEvent: React.FocusEvent<HTMLFormElement>): void {
    const field = focusEvent.target;
    const { name, value } = field;

    setMovieInfo(currentMovieInfo => ({
      ...currentMovieInfo,
      [name]: value.trim(),
    }));
  }

  function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>): void {
    submitEvent.preventDefault();

    if (isFilled) {
      onAdd(movieInfo);
      setMovieInfo(defaultMovieInfo);
      setCount(prev => prev + 1);
    }
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onBlur={handleBlur}
      noValidate
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        // onChange={() => {}}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
