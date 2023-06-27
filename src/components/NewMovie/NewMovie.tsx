import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movieToAdd: Movie) => void;
}

const initialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC <Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovieInfo, setNewMovieInfo] = useState(initialFormState);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
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

  const isAllRequiredFieldsFilled = () => {
    return (
      trimTextField(title)
      && trimTextField(imgUrl)
      && trimTextField(imdbUrl)
      && trimTextField(imdbId)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovieInfo);
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
        value={title}
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {isAllRequiredFieldsFilled()
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
