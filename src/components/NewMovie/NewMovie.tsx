import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitleField] = useState('');
  const [description, setDescriptionField] = useState('');
  const [imgUrl, setImageUrlField] = useState('');
  const [imdbUrl, setImdbUrlField] = useState('');
  const [imdbId, setImdbIdField] = useState('');

  const btnDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const reset = () => {
    setTitleField('');
    setDescriptionField('');
    setImageUrlField('');
    setImdbUrlField('');
    setImdbIdField('');
  };

  const handleSubmit = (event: React.FormEvent) => {
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
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        onChange={setImageUrlField}
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
            disabled={btnDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
