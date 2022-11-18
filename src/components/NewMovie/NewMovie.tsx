import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const requiredFields = [title, imgUrl, imdbId, imdbUrl];

  const enableAddButton = requiredFields.every(field => field.length > 0);

  const addMovie = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imdbId,
      imgUrl,
      imdbUrl,
    });
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setCount((prevState) => (prevState + 1));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        wasMovieAdded={count > 0}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        wasMovieAdded={count > 0}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        wasMovieAdded={count > 0}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        wasMovieAdded={count > 0}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        wasMovieAdded={count > 0}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!enableAddButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
