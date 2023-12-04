import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdlValue, setImdbIdValue] = useState('');

  const isAddButtonDisabled = (): boolean => {
    return (
      titleValue.trim() !== ''
      && imgUrlValue.trim() !== ''
      && imdbUrlValue.trim() !== ''
      && imdbIdlValue.trim() !== ''
    );
  };

  const resetFormFields = (): void => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdlValue,
    });

    resetFormFields();
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
        value={titleValue}
        onChange={value => setTitleValue(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={value => setDescriptionValue(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={value => setImgUrlValue(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={value => setImdbUrlValue(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdlValue}
        onChange={value => setImdbIdValue(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
