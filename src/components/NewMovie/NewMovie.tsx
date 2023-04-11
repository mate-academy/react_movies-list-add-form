import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie:Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, increaseCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    clearForm();
    increaseCount(prevCount => prevCount + 1);
  };

  const isAddButtonEnabled = (
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim()
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setimdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddButtonEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
