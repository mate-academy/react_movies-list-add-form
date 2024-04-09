import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (post: Movie) => void;
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

  const handleTitleChange = (event: string) => {
    setTitle(event);
  };

  const handleDescriptionChange = (event: string) => {
    setDescription(event);
  };

  const handleImgUrlChange = (event: string) => {
    setImgUrl(event);
  };

  const handleImdbUrlChange = (event: string) => {
    setImdbUrl(event);
  };

  const handleImdbIdChange = (event: string) => {
    setImdbId(event);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required={true}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required={true}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required={true}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required={true}
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
