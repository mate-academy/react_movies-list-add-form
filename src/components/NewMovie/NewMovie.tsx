import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrl, setImageURL] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbID] = useState('');

  const valueCheck = () => {
    if (
      !titleValue.trim() ||
      !imgUrl.trim() ||
      !imdbUrl.trim() ||
      !imdbId.trim()
    ) {
      return true;
    }

    return false;
  };

  const handdleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitleValue('');
    setDescriptionValue('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handdleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={newValue => {
          setTitleValue(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={newValue => {
          setDescriptionValue(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={newValue => {
          setImageURL(newValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={newValue => {
          setImdbURL(newValue);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={newValue => {
          setImdbID(newValue);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={valueCheck()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
