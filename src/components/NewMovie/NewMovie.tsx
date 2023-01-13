import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setimgUrlValue] = useState('');
  const [imdbUrlValue, setimdbUrlValue] = useState('');
  const [imdbIdValue, setimdbIdValue] = useState('');

  const displaySubmitButton = titleValue.trim()
    && imgUrlValue.trim()
    && imdbUrlValue.trim()
    && imdbIdValue.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    onAdd(newMovie);

    setTitleValue('');
    setDescriptionValue('');
    setimgUrlValue('');
    setimdbUrlValue('');
    setimdbIdValue('');

    setCount(prev => prev + 1);
  };

  const handleTittleChange = (input: string) => (
    setTitleValue(input)
  );

  const handleDescriptionChange = (input: string) => (
    setDescriptionValue(input)
  );

  const handleimgUrlChange = (input: string) => (
    setimgUrlValue(input)
  );

  const handleimdbUrlChange = (input: string) => (
    setimdbUrlValue(input)
  );

  const handleimdbIdChange = (input: string) => (
    setimdbIdValue(input)
  );

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
        value={titleValue}
        onChange={handleTittleChange}
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
        onChange={handleimgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={handleimdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={handleimdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!displaySubmitButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
