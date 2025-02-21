/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

type Errors = {
  hasTitleError: boolean;
  hasDescriptionError: boolean;
  hasImgUrlError: boolean;
  hasImdbUrlError: boolean;
  hasImdbIdError: boolean;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState<Errors>({
    hasTitleError: false,
    hasDescriptionError: false,
    hasImgUrlError: false,
    hasImdbUrlError: false,
    hasImdbIdError: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = !!(title && imgUrl && imdbUrl && +imdbId !== 0);

    setIsFormValid(isValid);
  }, [title, imgUrl, imdbUrl, imdbId]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrors({
      hasTitleError: false,
      hasDescriptionError: false,
      hasImgUrlError: false,
      hasImdbUrlError: false,
      hasImdbIdError: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: Errors = {
      hasTitleError: !title,
      hasDescriptionError: !description,
      hasImgUrlError: !imgUrl,
      hasImdbUrlError: !imdbUrl,
      hasImdbIdError: !imdbId,
    };

    setErrors(newErrors);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
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
        onChange={setTitle}
        required
      />
      {errors.hasTitleError && <p className="error">Title is required</p>}

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        required
      />
      {errors.hasDescriptionError && (
        <p className="error">Description is required</p>
      )}

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />
      {errors.hasImgUrlError && <p className="error">Image URL is required</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      {errors.hasImdbUrlError && <p className="error">Imdb URL is required</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />
      {errors.hasImdbIdError && <p className="error">Imdb ID is required</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
