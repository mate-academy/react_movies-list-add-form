import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddMovie = {
  onAdd: (prop: Movie) => void;
};

export const NewMovie = ({ onAdd }: AddMovie) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');
  const [count, setCount] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: titleValue.trim(),
      description: descriptionValue.trim(),
      imgUrl: imgUrlValue.trim(),
      imdbUrl: imdbUrlValue.trim(),
      imdbId: imdbIdValue.trim(),
    };

    onAdd(newMovie);

    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');

    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={newValue => setTitleValue(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={newValue => setDescriptionValue(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        required
        onChange={newValue => setImgUrlValue(newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        required
        onChange={newValue => setImdbUrlValue(newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        required
        onChange={newValue => setImdbIdValue(newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              titleValue.trim() === '' ||
              imdbIdValue.trim() === '' ||
              imdbUrlValue.trim() === '' ||
              imgUrlValue.trim() === ''
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
