import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const reset = () => {
    setTitleField('');
    setDescriptionField('');
    setImgUrl('');
    setimdbId('');
    setimdbUrl('');
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sendedObject = {
      title: titleField,
      description: descriptionField,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(sendedObject);
    setCount((previous) => (previous + 1));
    reset();
  };

  const disabled = !titleField.trim()
  || !imgUrl.trim()
  || !imdbUrl.trim()
  || !imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleField}
        onChange={(value) => setTitleField(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionField}
        onChange={(value) => setDescriptionField(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => setImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => setimdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => setimdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
