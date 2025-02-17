import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Props } from '../../types/NewMovies';
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImage] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return
    }
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prevCount => prevCount + 1);

    reset()
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setImdbUrl('');
    setImdbId('');




  };
  const button_disabled = !title ||  !imgUrl || !imdbUrl || !imdbId

  return (
    <form className="NewMovie"
          key={count}
          onSubmit={handleSubmit}
          onReset={reset}
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
        onChange={setImage}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link "
            disabled={button_disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
