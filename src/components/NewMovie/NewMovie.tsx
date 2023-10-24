import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Props } from '../../types/Movie';

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const validForm = () => {
    return (
      title.trim() !== ''
      && imgUrl.trim() !== ''
      && imdbUrl.trim() !== ''
      && imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validForm()) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setCount(count + 1);
      setFormSubmitted(true);
      setDescription('');
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={
          (value) => setTitle(value)
        }
        required
        formSubmitted={formSubmitted}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={
          (value) => setDescription(value)
        }
        formSubmitted={formSubmitted}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={
          (value) => setImgUrl(value)
        }
        required
        formSubmitted={formSubmitted}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={
          (value) => setImdbUrl(value)
        }
        required
        formSubmitted={formSubmitted}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={
          (value) => setImdbId(value)
        }
        required
        formSubmitted={formSubmitted}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validForm()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
