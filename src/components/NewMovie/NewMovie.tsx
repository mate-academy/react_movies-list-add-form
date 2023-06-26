import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movieToAdd: Movie) => void;
}

const initialFormState = {
  newTitle: '',
  newDescription: '',
  newImgUrl: '',
  newImdbUrl: '',
  newImdbId: '',
};

export const NewMovie: React.FC <Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovieInfo, setNewMovieInfo] = useState(initialFormState);

  const {
    newTitle,
    newDescription,
    newImgUrl,
    newImdbUrl,
    newImdbId,
  } = newMovieInfo;

  const handleChange = (formField: string | number, value: string | number) => {
    setNewMovieInfo((pevMovieInfo) => ({
      ...pevMovieInfo,
      [formField]: value,
    }));
  };

  const clearForm = () => {
    setNewMovieInfo(initialFormState);
  };

  const trimTextField = (textField: string): string => textField.trim();

  const canUseButton = () => {
    return (
      trimTextField(newTitle)
      && trimTextField(newImgUrl)
      && trimTextField(newImdbUrl)
      && trimTextField(newImdbId)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: trimTextField(newTitle),
      description: trimTextField(newDescription),
      imgUrl: trimTextField(newImgUrl),
      imdbUrl: trimTextField(newImdbUrl),
      imdbId: trimTextField(newImdbId),
    };

    onAdd(newMovie);
    setCount((prevCount) => prevCount + 1);
    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(newValue) => handleChange('newTitle', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(newValue) => handleChange('newDescription', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(newValue) => handleChange('newImgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(newValue) => handleChange('newImdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(newValue) => handleChange('newImdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {canUseButton()
            ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled
              >
                Add
              </button>
            )}
        </div>
      </div>
    </form>
  );
};
