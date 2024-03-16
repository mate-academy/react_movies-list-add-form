import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  // #region TextField's
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // #endregion

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const validateForm = () => {
    const EmptyField =
      title.trim() === '' ||
      imgUrl.trim() === '' ||
      imdbUrl.trim() === '' ||
      imdbId.trim() === '';

    if (EmptyField) {
      return false;
    }

    return true;
  };

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    resetForm();
  };

  const getTextFields = () => {
    if (!validateForm()) {
      return true;
    }

    if (title && imgUrl && imdbUrl && imdbId) {
      return false;
    }

    return true;
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={title}
        label="Title"
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        value={description}
        label="Description"
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        value={imgUrl}
        label="Image URL"
        onChange={value => setimgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        onChange={value => setImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        value={imdbId}
        label="Imdb ID"
        onChange={value => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={getTextFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
