import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (value: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');
  const [description, setDescription] = useState('');

  function reset() {
    setTitle('');
    setImageURL('');
    setImdbID('');
    setDescription('');
    setImdbURL('');
  }

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newMovie: Movie = {
      title: title,
      description: description,
      imgUrl: imageURL,
      imdbUrl: imdbURL,
      imdbId: imdbID,
    };

    onAdd(newMovie);
    setCount((prev: number) => prev + 1);
    reset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
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
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imageURL || !imdbURL || !imdbID}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
