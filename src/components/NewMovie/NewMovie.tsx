import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(newMovie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const pattern =
    //eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const movieToAdd = {
    title: newTitle.trim(),
    description: newDescription.trim(),
    imgUrl: newImgUrl.trim(),
    imdbUrl: newImdbUrl.trim(),
    imdbId: newImdbId.trim(),
  };

  function handleOnChange(
    title = newTitle,
    imgUrl = newImgUrl,
    imdbUrl = newImdbUrl,
    imdbId = newImdbId,
  ) {
    if (title !== '' && imgUrl !== '' && imdbUrl !== '' && imdbId !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  function handleSubmit(newMovie: Movie) {
    if (
      newTitle !== '' &&
      newImdbId !== '' &&
      newImgUrl !== '' &&
      newImdbUrl !== '' &&
      pattern.test(newImgUrl) &&
      pattern.test(newImdbUrl)
    ) {
      onAdd(newMovie);
      setCount(count + 1);
    } else {
      return;
    }
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(movieToAdd);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={value => {
          setNewTitle(value);
          handleOnChange(value, newImgUrl, newImdbUrl, newImdbId);
        }}
        required={true}
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={value => {
          setNewDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={value => {
          setNewImgUrl(value);
          handleOnChange(newTitle, value, newImdbUrl, newImdbId);
        }}
        required={true}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={value => {
          setNewImdbUrl(value);
          handleOnChange(newTitle, newImgUrl, value, newImdbId);
        }}
        required={true}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={value => {
          setNewImdbId(value);
          handleOnChange(newTitle, newImgUrl, newImdbUrl, value);
        }}
        required={true}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
