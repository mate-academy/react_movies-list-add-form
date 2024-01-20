import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSubmitDisabled(
      !value.trim() || !value.trim() || !imdbUrl.trim() || !imdbId.trim(),
    );
  };

  const handleImgUrlChange = (value: string) => {
    setImgUrl(value);
    setSubmitDisabled(
      !title.trim() || !value.trim() || !imdbUrl.trim() || !imdbId.trim(),
    );
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);
    setSubmitDisabled(
      !title.trim() || !imgUrl.trim() || !value.trim() || !imdbId.trim(),
    );
  };

  const handleImdbIdChange = (value: string) => {
    setImdbId(value);
    setSubmitDisabled(
      !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !value.trim(),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setSubmitDisabled(true);
  };

  return (
    <form
      key={count}
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        required
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        required
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
      />

      <TextField
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
      />

      <TextField
        required
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
