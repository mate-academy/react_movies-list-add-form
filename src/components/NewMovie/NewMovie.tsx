import React, { useState } from 'react';
import { validateUrl } from '../../lib/helpers/urlValidator';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface NewMovieProps {
  addMovie: (movie: Movie) => void;
}

const initialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<NewMovieProps> = ({ addMovie }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const isFormFilled = title.trim() && imgUrl && imdbUrl && imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateUrl(imdbUrl) || !validateUrl(imgUrl)) {
      setIsInvalidUrl(true);

      return;
    }

    addMovie(formState);

    setCount((currentCount) => currentCount + 1);
    setFormState(initialFormState);
    setIsInvalidUrl(false);
  };

  const changeFormState = (key: string, value: string) => {
    const normalizedValue = value
      .toLowerCase()
      .replace(/\s{2,}/g, ' '); // replaces 2 and more spaces in row to 1 space

    setFormState((currentFormState) => ({
      ...currentFormState,
      [key]: normalizedValue,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => changeFormState('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => changeFormState('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => changeFormState('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => changeFormState('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => changeFormState('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>

          {isInvalidUrl && (
            <h5 style={{ color: 'red' }}>
              Please, enter the valid url value!
            </h5>
          )}
        </div>
      </div>
    </form>
  );
};
