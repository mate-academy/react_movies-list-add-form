import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitleValue] = useState('');
  const [description, setDescValue] = useState('');
  const [imgUrl, setImgUrlValue] = useState('');
  const [imdbUrl, setImdbUrlValue] = useState('');
  const [imdbId, setImdbIdValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.length > 0) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setCount(currentCount => currentCount + 1);

      setTitleValue('');
      setDescValue('');
      setImgUrlValue('');
      setImdbUrlValue('');
      setImdbIdValue('');
    } else {
      return;
    }
  };

  function checkForErrors(): boolean {
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrlValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrlValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkForErrors()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
