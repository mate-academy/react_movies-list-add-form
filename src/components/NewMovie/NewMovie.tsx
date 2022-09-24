import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgURL] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');

  const hasValue = title && imgUrl && imdbUrl && imdbId;

  const clearForm = () => {
    setDescription('');
    setImgURL('');
    setImdbURL('');
    setImdbId('');
    setTitle('');
  };

  const newFilm: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleOnChange = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasValue) {
      setCount(state => state + 1);
      clearForm();
    }
  };

  return (
    <form
      onSubmit={event => handleOnChange(event)}
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setImgURL(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setImdbURL(value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setImdbId(value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!hasValue}
            onClick={() => onAdd(newFilm)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
