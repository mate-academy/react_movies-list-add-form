import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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

  const handleAddMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setCount(count + 1);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAddMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={enteredTitle => setTitle(enteredTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={enteredDescription => setDescription(enteredDescription)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={enteredImgUrl => setImgUrl(enteredImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={enteredImdbUrl => setImdbUrl(enteredImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={enteredImdbId => setImdbId(enteredImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
