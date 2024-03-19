import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  // Track field errors after blur
  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrors({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      setErrors({
        title: !title,
        imgUrl: !imgUrl,
        imdbUrl: !imdbUrl,
        imdbId: !imdbId,
      });

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

  const isBodyShown = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      action="../api/movies"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        onBlur={() => setErrors({ ...errors, title: true })}
        isErrorMessage={errors.title}
        required
        requiredErrorMessage="Title is required"
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
        onChange={setImgUrl}
        onBlur={() => setErrors({ ...errors, imgUrl: true })}
        isErrorMessage={errors.imgUrl}
        required
        requiredErrorMessage="Image URL is required"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => setErrors({ ...errors, imdbUrl: true })}
        isErrorMessage={errors.imdbUrl}
        required
        requiredErrorMessage="Imdb URL is required"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => setErrors({ ...errors, imdbId: true })}
        isErrorMessage={errors.imdbId}
        required
        requiredErrorMessage="Imdb ID is required"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isBodyShown}
            onSubmit={() => {
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
