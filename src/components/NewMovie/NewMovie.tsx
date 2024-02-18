import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  'onAdd': (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleInput, setTitleInput] = useState('');
  const [hasTitleError, setHasTitleError] = useState(true);

  const [descriptionInput, setDescriptionInput] = useState('');

  const [imgUrlInput, setImgUrlInput] = useState('');
  const [hasImgUrlInputError, setHasImgUrlInputError] = useState(true);

  const [imdbUrlInput, setImdbUrlInput] = useState('');
  const [hasImdbUrlInputError, setHasImdbUrlInputError] = useState(true);

  const [imdbIdInput, setImdbIdInput] = useState('');
  const [hasImdbIdInputError, setImdbIdInputError] = useState(true);

  const hasError = () => {
    if (
      !hasTitleError
      && !hasImgUrlInputError
      && !hasImdbUrlInputError
      && !hasImdbIdInputError) {
      return false;
    }

    return true;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: titleInput,
      description: descriptionInput,
      imgUrl: imgUrlInput,
      imdbUrl: imdbUrlInput,
      imdbId: imdbIdInput,
    };

    onAdd(newMovie);
    setCount(count + 1);

    setTitleInput('');
    setDescriptionInput('');
    setImdbUrlInput('');
    setImgUrlInput('');
    setImdbIdInput('');

    setHasTitleError(true);
    setHasImgUrlInputError(true);
    setHasImdbUrlInputError(true);
    setImdbIdInputError(true);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleInput}
        onChange={newValue => {
          setTitleInput(newValue);
          setHasTitleError(!newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionInput}
        onChange={newValue => setDescriptionInput(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlInput}
        onChange={newValue => {
          setImgUrlInput(newValue);
          setHasImgUrlInputError(!newValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlInput}
        onChange={newValue => {
          setImdbUrlInput(newValue);
          setHasImdbUrlInputError(!newValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdInput}
        onChange={newValue => {
          setImdbIdInput(newValue);
          setImdbIdInputError(!newValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
