import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const handleTitleChange = (value: string) => {
    setTitleValue(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionValue(value);
  };

  const handleImgUrlChange = (value: string) => {
    setImgUrlValue(value);
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrlValue(value);
  };

  const handleImdbIdChange = (value: string) => {
    setImdbIdValue(value);
  };

  const clearForm = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    onAdd(newMovie);
    clearForm();
    setCount(currentCount => currentCount + 1);
  };

  const isButtonAddActive = titleValue.trim()
    && imgUrlValue.trim()
    && imdbUrlValue.trim()
    && imdbIdValue.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonAddActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
