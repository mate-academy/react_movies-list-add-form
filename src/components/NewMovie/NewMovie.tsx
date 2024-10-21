import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (m: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [imgUrlError, setImgUrlError] = useState(true);
  const [imdbUrlError, setImdbUrlError] = useState(true);
  const [imdbIdError, setImdbIdError] = useState(true);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setTitleError(false);
    setDescriptionError(false);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);
  };

  const submit = () => {
    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => {
          setTitle(newValue);
          setTitleError(true);
        }}
        required
        error={titleError}
        setError={setTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => {
          setDescription(newValue);
          setDescriptionError(true);
        }}
        required
        error={descriptionError}
        setError={setDescriptionError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => {
          setImgUrl(newValue);
          setImgUrlError(true);
        }}
        required
        error={imgUrlError}
        setError={setImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setImdbUrl(newValue);
          setImdbUrlError(true);
        }}
        required
        error={imdbUrlError}
        setError={setImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => {
          setImdbId(newValue);
          setImdbIdError(true);
        }}
        required
        error={imdbIdError}
        setError={setImdbIdError}
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
