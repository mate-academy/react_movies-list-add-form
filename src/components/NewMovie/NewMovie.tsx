import React, { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie: React.FC = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={event => setTitle(event.target.value)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => setImgUrl(event.target.value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => setImdbUrl(event.target.value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => setImdbId(event.target.value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={e => {
              e.preventDefault();
              setCount(count + 1);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
