import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form  submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDescription(value);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImgUrl(value);
  };

  const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbUrl(value);
  };

  const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setImdbId(value);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const submitHandler = () => {
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    resetForm();

    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
