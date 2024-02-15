import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitleField] = useState('');
  const [description, setDescriptionField] = useState('');
  const [imgUrl, setImgUrlField] = useState('');
  const [imdbUrl, setImdbUrlField] = useState('');
  const [imdbId, setImdbIdField] = useState('');

  const reset = () => {
    setTitleField('');
    setDescriptionField('');
    setImgUrlField('');
    setImdbUrlField('');
    setImdbIdField('');
  };

  const canSubmit = !title
    || !imgUrl
    || !imdbUrl
    || !imdbId;

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handelSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitleField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescriptionField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrlField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrlField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbIdField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
